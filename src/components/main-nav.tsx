"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
    storeId?: string;
}

export function MainNav({
    className,
    storeId,
    ...props
}: MainNavProps) {
    const pathname = usePathname();
    const params = useParams();
    // Fallback: try to get ID from pathname if params fail (e.g. /storeId/routes)
    const pathId = pathname?.split('/')[1];
    const id = storeId || params.storeId || pathId;

    console.log("MainNav storeId prop:", storeId);
    console.log("MainNav params:", params);
    console.log("MainNav resolved id:", id);

    const routes = [
        {
            href: `/${id}`,
            label: 'Overview',
            active: pathname === `/${id}`
        },
        {
            href: `/${id}/billboards`,
            label: 'Billboards',
            active: pathname === `/${id}/billboards`
        },
        {
            href: `/${id}/categories`,
            label: 'Categories',
            active: pathname === `/${id}/categories`
        },
        {
            href: `/${id}/sizes`,
            label: 'Sizes',
            active: pathname === `/${id}/sizes`
        },
        {
            href: `/${id}/colors`,
            label: 'Colors',
            active: pathname === `/${id}/colors`
        },
        {
            href: `/${id}/products`,
            label: 'Products',
            active: pathname === `/${id}/products`
        },
        {
            href: `/${id}/orders`,
            label: 'Orders',
            active: pathname === `/${id}/orders`
        },
        {
            href: `/${id}/settings`,
            label: 'Settings',
            active: pathname === `/${id}/settings`
        }
    ];

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
};