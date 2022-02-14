import * as queries from '../database';

const getUniqueCode = async (): Promise<string> => {
    const code: string = Math.random().toString(36).slice(2);
    const checkHash = await queries.transactionsQueries.checkIfCode(code);
    if (checkHash === 1) {
        return await getUniqueCode();
    } else {
        return code;
    }
};

export default getUniqueCode;
