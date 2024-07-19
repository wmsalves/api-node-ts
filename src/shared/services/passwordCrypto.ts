import { compare, genSalt, hash } from "bcryptjs";

const saltRandoms = 8;

const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(saltRandoms);
  return await hash(password, saltGenerated);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCryto = {
    hashPassword,
    verifyPassword
};
