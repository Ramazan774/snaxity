import { format } from "date-fns";

import prismadb from '@/lib/prismadb';

import { ThemeClient } from './components/client';
import { ThemeColumn } from './components/columns';

interface ThemesPageProps {
    params: {
        storeId: string;
    };
}

const ThemesPage = async ({ params }: ThemesPageProps) => {
    const themes = await prismadb.theme.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedThemes: ThemeColumn[] = themes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ThemeClient storeId={params.storeId} data={formattedThemes} />
            </div>
        </div>
    );
};

export default ThemesPage;
