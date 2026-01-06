import { Prisma } from "@/generated/prisma/client";

export type BeneficiaryType = Prisma.BeneficiaryGetPayload<{
  select: typeof BeneficiarySelect;
}>;

export const BeneficiarySelect = {
  id: true,
  ci: true,
  complement: true,
  birthDate: true,
  firstName: true,
  lastName: true,
  phone: true,
  email: true,
};