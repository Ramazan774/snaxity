import { format } from "date-fns";

import prismadb from '@/lib/prismadb';

import { CategoryClient } from './components/client';
import { CategoryColumn } from './components/columns';

interface CategoriesPageProps {
    params: {
        storeId: string;
    };
}

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient storeId={params.storeId} data={formattedCategories} />
            </div>
        </div>
    );
};

export default CategoriesPage;
