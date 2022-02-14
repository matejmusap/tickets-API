import * as queries from '../database';
import { utilException } from '../exceptions';

const getUniqueCode = async (): Promise<string> => {
    try {
        const code: string = Math.random().toString(36).slice(2);
        const checkHash = await queries.transactionsQueries.checkIfCode(code);
        if (checkHash === 1) {
            return await getUniqueCode();
        } else {
            return code;
        }
    } catch (err) {
        console.log(err);
        throw err as utilException;
    }
};

export default getUniqueCode;
