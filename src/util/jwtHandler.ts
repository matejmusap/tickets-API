import { ITokenData } from '../interfaces';
import jwt from 'jsonwebtoken';
import { utilException } from '../exceptions';

const generateToken = async (data: ITokenData) => {
    try {
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign(
            {
                data: {
                    id: data.id
                }
            },
            secret as string,
            {
                expiresIn: 3600
            }
        );
        return token;
    } catch (err) {
        console.log(err);
        throw err as utilException;
    }
};

export { generateToken };
