cd prisma
rm -rf migrations

npx prisma migrate dev --name first-migration
npx prisma migrate dev
npx prisma generate
# npx prisma studio
# npx prisma db seed 
