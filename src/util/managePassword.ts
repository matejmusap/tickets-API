import bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process.env.SALT_ROUND);

const comparePassword = async (password: string, userPassword: string) => {
    const match = await bcrypt.compare(password, userPassword);
    return match;
};

const hashPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
            if (err) reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) reject(err);
                else resolve(hash);
            });
        });
    });
};

export { comparePassword, hashPassword };
