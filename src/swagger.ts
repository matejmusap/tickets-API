const paths = {
    '/auth/register': {
        post: {
            summary: 'Register new user',
            tags: ['Auth'],
            parameters: [
                {
                    name: 'Registration body',
                    in: 'body',
                    description: 'Data for Registration',
                    required: true,
                    schema: {
                        $ref: '#/definitions/register'
                    }
                }
            ],
            responses: {
                '200': {
                    schema: {
                        $ref: '#/responses/register'
                    }
                }
            },
            produces: ['application/json']
        }
    },
    '/auth/login': {
        post: {
            summary: 'Login existing user',
            tags: ['Auth'],
            parameters: [
                {
                    name: 'Login body',
                    in: 'body',
                    description: 'Login data',
                    required: true,
                    schema: {
                        $ref: '#/definitions/login'
                    }
                }
            ],
            responses: {
                '200': {
                    schema: {
                        $ref: '#/responses/login'
                    }
                }
            },
            produces: ['application/json']
        }
    }
};

const definitions = {
    register: {
        example: {
            email: 'email@email.com',
            password: 'password'
        }
    },
    login: {
        example: {
            email: 'email@email.com',
            password: 'password'
        }
    }
};

const responses = {
    register: {
        example: {
            data: {},
            code: 200,
            message: 'User succefully registred!'
        }
    },
    login: {
        example: {
            data: {},
            code: 200,
            message: 'User is logged in!'
        }
    }
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
