import morgan from 'morgan';
import config from '../config';

const skip = () => {
    const env = config.NODE_ENV || 'development';
    return env !== config.NODE_ENV;
};

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
    skip
});

export default morganMiddleware;
