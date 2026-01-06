import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOnboardingDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Identificador del beneficiario',
  })
  beneficiaryId: number;

  @IsString()
  @ApiProperty({
    example: '123456',
    description: 'identificador de la sesión',
  })
  sessionId: string;

  @IsString()
  @ApiProperty({
    example: 'token_abc123',
    description: 'Token de la sesión',
  })
  sessionToken: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Not Started',
    description: 'estado del onboarding',
  })
  status?: string;

  @IsOptional()
  @IsJSON()
  @ApiProperty({
    example: '{}',
    description: 'características adicionales en formato JSON',
  })
  features?: string;

  @IsOptional()
  @IsJSON()
  @ApiProperty({
    example: '{}',
    description: 'análisis de IP en formato JSON',
  })
  ipAnalysis?: string;

  @IsOptional()
  @IsJSON()
  @ApiProperty({
    example: '{}',
    description: 'análisis de verificación de identidad en formato JSON',
  })
  idVerification?: string;

}
