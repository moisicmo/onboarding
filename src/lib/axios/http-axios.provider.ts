import { Provider } from '@nestjs/common';
import axios from 'axios';

export const AxiosProvider: Provider = {
  provide: 'AXIOS_INSTANCE',
  useFactory: () => {
    const instance = axios.create({
      timeout: 20000,
    });

    // Interceptor global para errores
    instance.interceptors.response.use(
      (res) => res,
      (err) => {
        console.error('Axios Error:', err.response?.data || err.message);
        return Promise.reject(err);
      }
    );

    return instance;
  },
};
