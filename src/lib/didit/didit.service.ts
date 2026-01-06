import { envs } from '@/config';
import { Inject, Injectable } from '@nestjs/common';
import type { AxiosInstance } from 'axios';

@Injectable()
export class DiditService {
  private readonly baseUrl = 'https://verification.didit.me/v2';
  private readonly apiKey = envs.apiKeyDidit;
  constructor(
    @Inject('AXIOS_INSTANCE')
    private readonly axios: AxiosInstance,
  ) { }

  async createSession(workflow_id: string, identification_number: string) {
    try {
      const res = await this.axios.post(
        `${this.baseUrl}/session/`,
        {
          workflow_id,
          language: "es",
          expected_details: { identification_number },
        },
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-api-key': this.apiKey,
          },
        }
      );
      return res.data;

    } catch (error) {
      console.error('Error Diddit:', error.response?.data || error.message);
      throw new Error('No se pudo crear la sesión en Diddit');
    }
  }

  async retrieveSession(sessionId: string) {
    try {
      const res = await this.axios.get(
        `${this.baseUrl}/session/${sessionId}/decision/`,
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-api-key': this.apiKey,
          },
        }
      );
      return res.data;

    } catch (error) {
      console.error('Error Diddit:', error.response?.data || error.message);
      throw new Error('No se pudo obtener la sesión en Diddit');
    }
  }

}
