import { CanBeUndefined } from '../types';

export interface IENV {
    NODE_ENV: CanBeUndefined<string>;
    PORT: CanBeUndefined<number>;
}
export interface IConfig {
    NODE_ENV: string;
    PORT: number;
}
export interface ITokenData {
    id: number;
}
