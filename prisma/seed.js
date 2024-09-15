const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Delete all users
  await prisma.lineItem.deleteMany();
  await prisma.income.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.user.deleteMany();
  // Create a user
  const user1 = await prisma.user.create({
    data: {
      clerkId: 'user1',
      budget: {
        create: {
          income: {
            create: {
              lineItems: {
                create: [
                  {
                    name: 'Salary',
                    amount: 1000,
                    category: 'Salary',
                    frequency: 'Monthly',
                    currency: 'USD',
                  },
                ],
              },
            },
          },
          expenses: {
            create: {
              lineItems: {
                create: [
                  {
                    name: 'Rent',
                    amount: 500,
                    category: 'Rent',
                    frequency: 'Monthly',
                    currency: 'USD',
                  },
                ],
              },
            },
          },
        },
      },
    },
  });

  console.log(`Created user: ${user1.clerkId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
