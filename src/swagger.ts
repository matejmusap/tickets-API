const paths = {

};

const definitions = {

};

const responses = {

};

const host = `${process.env.SWAGGER_HOST}`;
const swaggerProtocol = process.env.SWAGGER_PROTOCOL;
export function generateDocumentation() {
    return {
        _swagger: '2.0',
        get swagger() {
            return this['_swagger'];
        },
        set swagger(value) {
            this['_swagger'] = value;
        },
        schemes: [`${swaggerProtocol}`],
        info: {
            contact: {
                name: 'Matej Musap',
                email: 'matej.musap@gmail.com'
            }
        },
        host: `${host}`,
        basePath: '/api',
        paths,
        definitions,
        responses,
        parameters: {}
    };
}
