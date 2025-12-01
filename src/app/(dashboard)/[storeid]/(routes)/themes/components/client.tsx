"use client";

import { Plus } from "lucide-react";
import { useRouter, useParams, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { ThemeColumn, columns } from "./columns";

interface ThemeClientProps {
    storeId: string;
    data: ThemeColumn[];
}

export const ThemeClient: React.FC<ThemeClientProps> = ({ storeId, data }) => {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const pathId = pathname?.split('/')[1];
    const id = storeId || params.storeId || pathId;

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Themes (${data.length})`}
                    description="Manage themes for your store"
                />
                <Button onClick={() => router.push(`/${id}/themes/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading
                title="API"
                description="API calls for Themes"
            />
            <Separator />
            <ApiList entityName="themes" entityIdName="themeId" />
        </>
    );
};
