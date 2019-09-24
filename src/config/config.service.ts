import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
  [key: string]: string;
}
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(
      fs.readFileSync(
        path.join(path.dirname(__dirname), '../env_variable/') + filePath,
      ),
    );
    this.validateInput(this.envConfig);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
      MYSQL_HOST: Joi.string().required(),
      MYSQL_PORT: Joi.number().required(),
      MYSQL_USERNAME: Joi.string().required(),
      MYSQL_PASSWORD: Joi.number().required(),
      MYSQL_DATABASE: Joi.string().required(),
      ACCESS_TOKEN_EXPIRES: Joi.string().required(),
      REFRESH_TOKEN_EXPIRES: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_SESSION: Joi.boolean().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    console.log('Configure Valiation check - ok');
    console.log("running on " + process.env.NODE_ENV);
    return validatedEnvConfig;
  }
}
