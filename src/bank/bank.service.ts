import { Injectable } from '@nestjs/common';

import { PAYSTACK_TEST_SECRET_KEY } from 'src/general/constants';
import ApiService from 'src/general/helpers/api.service';

@Injectable()
export class BankService {
  private apiService: ApiService = new ApiService('https://api.paystack.co');
  // const postData = {
  //   title: 'New Post',
  //   body: 'This is the content of the new post.',
  // };

  async initializePayment(paymentInfo: { amount: number; email: string }) {
    try {
      // POST request with bearer token in headers
      const headers = { Authorization: `Bearer ${PAYSTACK_TEST_SECRET_KEY}` };
      const responseData = await this.apiService.post<any>(
        '/transaction/initialize',
        { ...paymentInfo },
        { headers },
      );

      return responseData;
    } catch (error) {
      console.error('API Error:', error.message);

      return;
    }
  }

  async verifyBankDetails(bankDetails: {
    account_number: string;
    bank_code: number;
  }) {
    try {
      // GET request with bearer token in headers
      const headers = { Authorization: `Bearer ${PAYSTACK_TEST_SECRET_KEY}` };
      const responseData = await this.apiService.get<any>(
        `bank/resolve?account_number=${bankDetails.account_number}&bank_code=${bankDetails.bank_code}`,
        { headers },
      );

      return responseData;
    } catch (error) {
      console.error('API Error:', error.message);
      return;
    }
  }

  async verifyATMDetails(cardPAN: number) {
    try {
      // GET request with bearer token in headers
      const headers = { Authorization: `Bearer ${PAYSTACK_TEST_SECRET_KEY}` };
      const responseData = await this.apiService.get<any>(
        `/decision/bin/${cardPAN}`,
        { headers },
      );

      return responseData;
    } catch (error) {
      console.error('API Error:', error.message);
      return;
    }
  }
}
