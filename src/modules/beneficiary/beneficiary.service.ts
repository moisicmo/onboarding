import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { BeneficiarySelect } from './entities/beneficiary.entity';
import { DiditService } from '@/lib/didit/didit.service';
import { OnboardingService } from '../onboarding/onboarding.service';
import { CreateOnboardingDto } from '../onboarding/dto/create-onboarding.dto';
import { envs } from '@/config';

@Injectable()
export class BeneficiaryService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly diditService: DiditService,
    private readonly onboardingService: OnboardingService,

  ) { }

  async create(createBeneficiaryDto: CreateBeneficiaryDto) {
    try {
      const { ci, ...rest } = createBeneficiaryDto;

      // Buscar beneficiario por clave única compuesta
      let beneficiary = await this.prisma.beneficiary.findUnique({
        where: {
          beneficiary_ci_complement_key: {
            ci,
            complement: rest.complement,
          },
        },
        select: BeneficiarySelect,
      });
      // si no existe, crear nuevo beneficiario
      if (!beneficiary) {
        beneficiary = await this.prisma.beneficiary.create({
          data: {
            ci,
            ...rest,
          },
          select: BeneficiarySelect,
        });
      } else {
        // si existe, actualizar datos de contacto
        beneficiary = await this.prisma.beneficiary.update({
          where: { id: beneficiary.id },
          data: {
            phone: rest.phone,
            email: rest.email,
          },
          select: BeneficiarySelect,
        });
      }

      // Verificar onboarding existente
      let onboarding = await this.onboardingService.findOne(beneficiary.id);
      if (onboarding) {
        try {
          // Intentar recuperar sesión DIDit
          const didditSession = await this.diditService.retrieveSession(onboarding.sessionId);
          console.log('Diddit Session Retrieved:', didditSession);
          // Si existe → actualizar onboarding
          onboarding = await this.onboardingService.updateWithSessionId(onboarding.sessionId,
            {
              status: didditSession.status,
              features: didditSession.features,
              ipAnalysis: didditSession.ip_analysis,
              idVerification: didditSession.id_verification,
            },
          );
          return onboarding;
        } catch (error) {
          console.error('Error:', error.response?.data || error.message);
          console.error('marcando onboarding viejo como inválido');
          await this.onboardingService.updateWithSessionId(
            onboarding.sessionId,
            { status: 'expired' },
          );
        }
      }
      // Crear sesión Diddit
      const didditSession = await this.diditService.createSession(envs.workflowInitIdDidit, ci);
      console.log('Diddit Session:', didditSession);
      // Crear onboarding
      const createOnboardingDto = new CreateOnboardingDto();
      createOnboardingDto.beneficiaryId = beneficiary.id;
      createOnboardingDto.sessionId = didditSession.session_id;
      createOnboardingDto.sessionToken = didditSession.session_token;
      onboarding = await this.onboardingService.create(createOnboardingDto);
      return onboarding;

    } catch (error) {
      console.error(error);
      throw new Error(`No se pudo crear el beneficiario: ${error.message}`);
    }
  }


  async findOne(id: number) {
    const beneficiary = await this.prisma.beneficiary.findUnique({
      where: { id },
      select: BeneficiarySelect,
    });

    if (!beneficiary) {
      throw new NotFoundException(`Beneficiary with id #${id} not found`);
    }

    return beneficiary;
  }
}
