import { Module } from '@nestjs/common';
import { AxiosProvider } from './http-axios.provider';

@Module({
  providers: [AxiosProvider],
  exports: [AxiosProvider],
})
export class HttpAxiosModule {}
