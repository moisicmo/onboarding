import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBeneficiaryDto {

  @IsString()
  @ApiProperty({
    example: '123456',
    description: 'documento de identidad',
  })
  ci: string;

  @IsString()
  @ApiProperty({
    example: '1L',
    description: 'complemento',
  })
  complement: string;

  @IsString()
  @ApiProperty({
    example: 'Juan',
    description: 'nombres',
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    example: 'PErez',
    description: 'apellidos',
  })
  lastName: string;

  @IsString()
  @ApiProperty({
    example: '+591 123465',
    description: 'teléfono',
  })
  phone: string;

  @IsString()
  @ApiProperty({
    example: 'juanperez@gmail.com',
    description: 'correo',
  })
  email: string;

}
