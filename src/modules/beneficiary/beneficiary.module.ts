import { Module } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { BeneficiaryController } from './beneficiary.controller';
import { DiditModule } from '@/lib/didit/didit.module';
import { OnboardingService } from '@/modules/onboarding/onboarding.service';

@Module({
  controllers: [BeneficiaryController],
  providers: [BeneficiaryService,OnboardingService],
  imports: [DiditModule],
})
export class BeneficiaryModule {}
