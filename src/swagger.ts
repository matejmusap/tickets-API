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
    },
    '/tickets/getTickets': {
        get: {
            summary: 'Get all ticekts that did not depart',
            tags: ['Tickets'],
            parameters: [],
            responses: {
                '200': {
                    schema: {
                        $ref: '#/responses/getTickets'
                    }
                }
            },
            produces: ['application/json']
        }
    },
    '/transactions/buyTicket/{ticketID}': {
        post: {
            summary: 'Buy ticket',
            tags: ['Transaction'],
            parameters: [
                {
                    name: 'Card number in body',
                    in: 'body',
                    description: 'Card number in body',
                    required: true,
                    schema: {
                        $ref: '#/definitions/buyTicket'
                    }
                },
                {
                    name: 'ticketID',
                    in: 'path',
                    description: 'Unique ticketID',
                    required: true,
                    example: 10
                },
                {
                    name: 'authorization',
                    in: 'header',
                    description: 'Bearer token',
                    required: true,
                    example: 'Bearer sdlighsghvdshvghku'
                }
            ],
            responses: {
                '200': {
                    schema: {
                        $ref: '#/responses/buyTicket'
                    }
                }
            },
            produces: ['application/json']
        }
    },
    '/transactions/getTicketsForUser': {
        get: {
            summary: 'Get aquired tickets for user',
            tags: ['Transaction'],
            parameters: [
                {
                    name: 'authorization',
                    in: 'header',
                    description: 'Bearer token',
                    required: true,
                    example: 'Bearer sdlighsghvdshvghku'
                }
            ],
            responses: {
                '200': {
                    schema: {
                        $ref: '#/responses/getTicketsForUser'
                    }
                }
            },
            produces: ['application/json']
        }
    },
    '/transactions/cancelTicket/{transactionID}': {
        put: {
            summary: 'Cancel ticket',
            tags: ['Transaction'],
            parameters: [
                {
                    name: 'transactionID',
                    in: 'path',
                    description: 'Unique transactionID',
                    required: true,
                    example: 10
                },
                {
                    name: 'authorization',
                    in: 'header',
                    description: 'Bearer token',
                    required: true,
                    example: 'Bearer sdlighsghvdshvghku'
                }
            ],
            responses: {
                '200': {
                    schema: {
                        $ref: '#/responses/cancelTicket'
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
            username: 'user123',
            password: 'password',
            card_number: '123456789123'
        }
    },
    login: {
        example: {
            email: 'email@email.com',
            password: 'password'
        }
    },
    buyTicket: {
        example: {
            card_number: '123456789087'
        }
    }
};

const responses = {
    register: {
        example: {
            data: {
                user: {
                    email: 'email@email.com',
                    username: 'user123'
                }
            },
            code: 200,
            message: 'You are Registred in by Email!'
        }
    },
    login: {
        example: {
            data: {
                user: {
                    email: 'email@email.com',
                    username: 'user123'
                }
            },
            code: 200,
            message: 'You are Logged in!'
        }
    },
    getTickets: {
        example: {
            data: {},
            code: 200,
            message: 'List of tickets!'
        }
    },
    buyTicket: {
        example: {
            data: {
                data: {
                    tickets: [
                        {
                            company: 'Puntamika Line d.o.o.',
                            point_of_departure: 'Zadar',
                            destination: 'Zagreb',
                            departure: '2022-02-07 08:00:00',
                            arrival: '2022-02-07 11:30:00',
                            availability: 'available'
                        },
                        {
                            company: 'Velebit Tours d.o.o.',
                            point_of_departure: 'Zadar',
                            destination: 'Zagreb',
                            departure: '2022-02-07 09:30:00',
                            arrival: '2022-02-07 13:00:00',
                            availability: 'available'
                        },
                        {
                            company: 'Puntamika Line d.o.o.',
                            point_of_departure: 'Zadar',
                            destination: 'Split',
                            departure: '2022-02-08 17:25:00',
                            arrival: '2022-02-08 20:00:00',
                            availability: 'available'
                        },
                        {
                            company: 'Velebit Tours d.o.o.',
                            point_of_departure: 'Zadar',
                            destination: 'Perušić',
                            departure: '2022-02-08 18:00:00',
                            arrival: '2022-02-08 19:30:00',
                            availability: 'available'
                        }
                    ]
                },
                code: 200,
                message: 'List of tickets!'
            },
            code: 200,
            message: 'Ticket is bought!'
        }
    },
    getTicketsForUser: {
        example: {
            data: {},
            code: 200,
            message: 'Tickets bought by one user!'
        }
    },
    cancelTicket: {
        example: {
            data: {},
            code: 200,
            message: 'Ticket is canceled!'
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
