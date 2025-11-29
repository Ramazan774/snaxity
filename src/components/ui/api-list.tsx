"use client";

import { useParams, usePathname } from "next/navigation";

import { useOrigin } from "@/hooks/use-origin";
import { ApiAlert } from "@/components/ui/api-alert";

interface ApiListProps {
    entityName: string;
    entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
    entityName,
    entityIdName
}) => {
    const params = useParams();
    const pathname = usePathname();
    const pathId = pathname?.split('/')[1];
    const storeId = params.storeId || pathId;
    const origin = useOrigin();

    const baseUrl = `${origin}/api/${storeId}`;

    return (
        <div>
            <ApiAlert
                title="GET"
                variant="public"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title="GET"
                variant="public"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="POST"
                variant="admin"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title="PATCH"
                variant="admin"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="DELETE"
                variant="admin"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
        </div>
    )
}