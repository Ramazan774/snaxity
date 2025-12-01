import prismadb from "@/lib/prismadb"

import { ThemeForm } from "./components/theme-form"

const ThemePage = async ({
    params
}: {
    params: { themeId: string }
}) => {
    const theme = await prismadb.theme.findUnique({
        where: {
            id: params.themeId
        }
    })


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ThemeForm initialData={theme} />
            </div>
        </div>
    )
}

export default ThemePage