rm -rf prisma/migrations
cd prisma
npx prisma migrate dev --name first-migration
npx prisma migrate dev
npx prisma generate
npx prisma studio