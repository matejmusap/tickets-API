import { ITokenData } from '../../src/interfaces';

declare global {
    namespace Express {
        interface Request {
            user: ITokenData;
        }
    }
}
