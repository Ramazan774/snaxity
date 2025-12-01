const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const products = await prisma.product.findMany({ take: 1 });
        console.log('Products:', products);
        const themes = await prisma.theme.findMany({ take: 1 });
        console.log('Themes:', themes);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
