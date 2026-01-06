import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DiditModule } from './lib/didit/didit.module';

import { BeneficiaryModule } from '@/modules/beneficiary/beneficiary.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';


@Module({
  imports: [
    PrismaModule,
    DiditModule,
    BeneficiaryModule,
    OnboardingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
