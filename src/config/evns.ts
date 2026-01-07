import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  API_KEY_DIDIT: string;
  WORKFLOW_INIT_ID_DIDIT: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    API_KEY_DIDIT: joi.string().required(),
    WORKFLOW_INIT_ID_DIDIT: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  apiKeyDidit: envVars.API_KEY_DIDIT,
  workflowInitIdDidit: envVars.WORKFLOW_INIT_ID_DIDIT,
};