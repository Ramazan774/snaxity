import { format } from "date-fns";

import prismadb from '@/lib/prismadb';

import { BillboardClient } from './components/client';
import { BillBoardColumn } from './components/columns';

interface BillboardsPageProps {
    params: {
        storeId: string;
    };
}

const BillboardsPage = async ({ params }: BillboardsPageProps) => {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedBillboards: BillBoardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient storeId={params.storeId} data={formattedBillboards} />
            </div>
        </div>
    );
};

export default BillboardsPage;
