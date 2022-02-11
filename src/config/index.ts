import path from 'path';
import dotenv from 'dotenv';
import { IENV, IConfig } from '../interfaces';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const getConfig = (): IENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined
    };
};

const getSanitzedConfig = (config: IENV): IConfig => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config as IConfig;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
