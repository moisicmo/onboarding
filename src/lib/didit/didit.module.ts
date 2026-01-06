import { Module } from '@nestjs/common';
import { DiditService } from './didit.service';
import axios from 'axios';

export const AxiosProvider = {
  provide: 'AXIOS_INSTANCE',
  useFactory: () => {
    return axios.create({
      timeout: 10000,
    });
  },
};

@Module({
  providers: [DiditService, AxiosProvider],
  exports: [DiditService],
})
export class DiditModule {}
