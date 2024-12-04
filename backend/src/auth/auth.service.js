const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";
import createHttpError from "http-errors";

const findUserByEmail = (email) => {
  const findUser = prisma.userAuth.findUnique({
    where: {
      email: email,
    },
  });

  return findUser;
};

export const login = async (email, password) => {
  const find = await findUserByEmail(email);

  if (!find) {
    throw createHttpError(400, "User Not Found");
  }

  if (password !== find.password) {
    throw createHttpError(400, "Password Not Collect");
  }

  delete find?.password;

  return find;
};
