import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(
      fs.readFileSync(path.join(path.dirname(__dirname), '../env_variable/') + filePath),
    );
    console.log(process.env.NODE_ENV);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
