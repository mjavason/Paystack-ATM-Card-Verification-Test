import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  isNotEmpty,
  IsString,
} from 'class-validator';

export class InitializeBankmentDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class VerifyBankDetailsDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  account_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bank_code: number;
}
