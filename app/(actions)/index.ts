'use server';

import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getOrCreateUser = async () => {
  const { userId } = auth();
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId!,
      },
    });
    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          clerkId: userId!,
        },
      });
      console.log(`User ${user.id} created with clerkId ${userId}`);
      return user;
    }
    return existingUser;
  } catch (error: any) {
    console.error(`Failed to create user: ${error.message}`);
    return null;
  }
};

export const getUserBudgets = async () => {
  const { userId } = auth();
  try {
    if (userId) {
      const budget = await prisma.budget.findFirst({
        where: {
          ownerId: userId,
        },
        include: {
          income: {
            include: {
              lineItems: true,
            },
          },
          expenses: {
            include: {
              lineItems: true,
            },
          },
        },
      });
      if (budget) {
        console.log(`Found budget for user ${userId}`);
        return budget;
      } else {
        console.log(`No budget found for user ${userId}`);
        return null;
      }
    } else {
      console.error(`No userId found`);
      return null;
    }
  } catch (error: any) {
    console.error(`Failed to get user budget: ${error.message}`);
    return null;
  }
};

export const createBudget = async ({
  incomeTransactions,
  expenseTransactions,
}: {
  incomeTransactions: {
    name: string;
    amount: number;
    category: string;
    frequency: string;
    currency: string;
  }[];
  expenseTransactions: {
    name: string;
    amount: number;
    category: string;
    frequency: string;
    currency: string;
  }[];
}) => {
  const { userId } = auth();
  try {
    if (userId) {
      const budget = await prisma.budget.create({
        data: {
          ownerId: userId,
          income: {
            create: {
              lineItems: {
                create: [...incomeTransactions],
              },
            },
          },
          expenses: {
            create: {
              lineItems: {
                create: [...expenseTransactions],
              },
            },
          },
        },
      });
      console.log('created budget', budget);
      return budget;
    } else {
      console.error(`No userId found`);
      return null;
    }
  } catch (error: any) {
    console.error(`Failed to create budget: ${error.message}`);
    return null;
  }
};

export const createLineItem = async ({
  type,
  parentId,
  name,
  amount,
  category,
  frequency,
  currency,
}: {
  type: 'income' | 'expense';
  parentId: string;
  name: string;
  amount: number;
  category: string;
  frequency: string;
  currency: string;
}) => {
  try {
    const lineItem = await prisma.lineItem.create({
      data: {
        name,
        amount,
        category,
        frequency,
        currency,
        [type]: {
          connect: {
            id: parentId,
          },
        },
      },
    });
    console.log(`Line item ${lineItem.id} created`);
    return lineItem;
  } catch (error: any) {
    console.error(`Failed to create line item: ${error.message}`);
    return null;
  }
};

export const updateLineItem = async ({
  id,
  name,
  amount,
  category,
  frequency,
  currency,
}: {
  id: string;
  name: string;
  amount: number;
  category: string;
  frequency: string;
  currency: string;
}) => {
  try {
    const updatedLineItem = await prisma.lineItem.update({
      where: {
        id,
      },
      data: {
        name,
        amount,
        category,
        frequency,
        currency,
      },
    });
    console.log(`Line item ${updatedLineItem.id} updated`);
    return updatedLineItem;
  } catch (error: any) {
    console.error(`Failed to update line item: ${error.message}`);
    return null;
  }
};

export const deleteLineItem = async (id: string) => {
  try {
    const deletedLineItem = await prisma.lineItem.delete({
      where: {
        id,
      },
    });
    console.log(`Line item ${deletedLineItem.id} deleted`);
    return deletedLineItem;
  } catch (error: any) {
    console.error(`Failed to delete line item: ${error.message}`);
    return null;
  }
};
