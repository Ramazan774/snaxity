import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
};

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { productIds } = await req.json();

        if (!productIds || productIds.length === 0) {
            return new NextResponse("Product ids are required", { status: 400 })
        }

        const products = await prismadb.product.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        });

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        products.forEach((product) => {
            const quantity = productIds.filter((id: string) => id === product.id).length;

            line_items.push({
                quantity: quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: Math.round(product.price.toNumber() * 100)
                }
            })
        });

        const validProductIds = productIds.filter((id: string) =>
            products.find((product) => product.id === id)
        );

        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                isPaid: false,
                orderItems: {
                    create: validProductIds.map((productId: string) => ({
                        product: {
                            connect: {
                                id: productId
                            }
                        }
                    }))
                }
            }
        });

        const frontendUrl = process.env.FRONTEND_STORE_URL?.startsWith("http")
            ? process.env.FRONTEND_STORE_URL
            : `https://${process.env.FRONTEND_STORE_URL}`;

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true
            },
            success_url: `${frontendUrl}/cart?success=1`,
            cancel_url: `${frontendUrl}/cart?canceled=1`,
            metadata: {
                orderId: order.id
            }
        })

        return NextResponse.json({ url: session.url }, {
            headers: corsHeaders
        });
    } catch (error: any) {
        console.log('[CHECKOUT_POST]', error);
        return new NextResponse(`Internal error: ${error.message}`, { status: 500 })
    }
};
