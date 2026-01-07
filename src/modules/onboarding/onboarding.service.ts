import { Injectable } from '@nestjs/common';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { OnboardingSelect } from './entities/onboarding.entity';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto';
@Injectable()
export class OnboardingService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findOne(beneficiaryId: number) {
    try {
      const onboarding = await this.prisma.onboarding.findFirst({
        where: {
          beneficiaryId,
          status: {
            notIn: ['expired'],
          },
        },
        select: OnboardingSelect,
      });
      return onboarding;
    } catch (error) {
      console.log(error);
      throw new Error(`No se pudo recuperar el onboarding: ${error.message}`);
    }
  }

  async create(createOnboardingDto: CreateOnboardingDto) {
    try {
      const { ...onboardingDto } = createOnboardingDto;

      return await this.prisma.onboarding.create({
        data: {
          ...onboardingDto,
        },
        select: OnboardingSelect,
      });

    } catch (error) {
      console.log(error);
      throw new Error(`No se pudo crear el onboarding: ${error.message}`);
    }
  }

  async updateWithSessionId(sessionId: string, updateOnboardingDto: UpdateOnboardingDto) {
    try {
      const { ...onboardingDto } = updateOnboardingDto;
      return await this.prisma.onboarding.update({
        where: {
          sessionId,
        },
        data: {
          ...onboardingDto,
        },
        select: OnboardingSelect,
      });
    } catch (error) {
      console.log(error);
      throw new Error(`No se pudo modificar el onboarding: ${error.message}`);
    }

  }

}
