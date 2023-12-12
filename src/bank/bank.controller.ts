import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { BankService } from './bank.service';
import {
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SuccessResponse } from 'src/general/helpers/response.helper';
import { IResponseData } from 'src/general/interfaces/response.interface';
import { InitializeBankmentDTO, VerifyBankDetailsDTO } from './bank.dto';
import { MESSAGES } from '../general/constants';
import { ResponseDto } from 'src/general/dto/response.dto';

@Controller('bank')
@ApiTags('Paystack')
@ApiResponse({
  status: HttpStatus.OK,
  type: ResponseDto,
  description: 'Successful response with data',
})
@ApiInternalServerErrorResponse({ description: MESSAGES.INTERNAL_ERROR })
@ApiBadRequestResponse({ description: MESSAGES.BAD_PARAMETERS })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
// @UseGuards(JwtAuthGuard)
export class BankController {
  constructor(private readonly service: BankService) {}

  @Post('test-payment-initialization')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Initialise a transaction' })
  @ApiBody({ type: InitializeBankmentDTO })
  async initialisePayment(
    @Body() body: InitializeBankmentDTO,
  ): Promise<IResponseData<any>> {
    const data = await this.service.initializePayment(body);

    if (!data) throw new InternalServerErrorException();

    // console.log(data);

    return SuccessResponse(data);
  }

  @Post('verify-bank-details')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary:
      'Verify if bank details truly exist before making transfers to them.',
  })
  @ApiBody({ type: VerifyBankDetailsDTO })
  async transfer(
    @Body() body: VerifyBankDetailsDTO,
  ): Promise<IResponseData<any>> {
    const data = await this.service.verifyBankDetails(body);

    if (!data) throw new InternalServerErrorException();

    // console.log(data);

    return SuccessResponse(data);
  }

  @Post('verify-atm/:cardPAN')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Verify if ATM card is valid',
  })
  async verifyATM(
    @Param('cardPAN') cardPAN: number, // Add this line to capture the cardPAN parameter
  ): Promise<IResponseData<any>> {
    const data = await this.service.verifyATMDetails(cardPAN);

    if (!data) {
      throw new InternalServerErrorException();
    }

    // console.log(data);

    return SuccessResponse(data);
  }
}
