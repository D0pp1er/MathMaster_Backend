const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function add_user() {
    const user = await prisma.user.createMany({
        data: [{
            email: 'sharifulislam.9876@gmail.com',
            password: '123456',
            name: 'Shariful Islam',
            DOB: new Date('1998-12-12').toISOString(),
            picture : 'https://i.ibb.co/0jZQY7F/IMG-20201212-123456.jpg',
        },
        {
            email: 'asibrahmanbarbie.233@gmail.com',
            password: '123456',
            name: 'Asib Rahman',
            DOB: new Date('1998-12-12').toISOString(),
            picture : 'https://i.ibb.co/0jZQY7F/IMG-20201212-123456.jpg',
        }]
    })

}

add_user()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })