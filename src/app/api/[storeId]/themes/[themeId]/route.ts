import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { themeId: string } }
) {
    try {

        if (!params.themeId) {
            return new NextResponse("Theme id required", { status: 400 });
        }

        const theme = await prismadb.theme.findUnique({
            where: {
                id: params.themeId
            }
        })

        return NextResponse.json(theme);
    } catch (error) {
        console.log('[THEME_GET]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, themeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, value } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400 })
        }

        if (!params.themeId) {
            return new NextResponse("Theme Id required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const theme = await prismadb.theme.updateMany({
            where: {
                id: params.themeId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(theme);
    } catch (error) {
        console.log('[THEME_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, themeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!params.themeId) {
            return new NextResponse("Theme Id required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const theme = await prismadb.theme.deleteMany({
            where: {
                id: params.themeId
            }
        })

        return NextResponse.json(theme);
    } catch (error) {
        console.log('[THEME_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

