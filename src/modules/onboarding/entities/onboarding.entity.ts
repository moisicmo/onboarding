import { Prisma } from "@/generated/prisma/client";

export type OnboardingType = Prisma.OnboardingGetPayload<{
  select: typeof OnboardingSelect;
}>;

export const OnboardingSelect = {
  id: true,
  sessionId: true,
  sessionToken: true,
  status: true,
  features: true,
  ipAnalysis: true,
  idVerification: true,
  beneficiary: true,
};