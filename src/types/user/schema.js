export const Types = `
    type User {
        userId: ID!
        email: String!
        createdEvents: [Event!]
    }

    union CreateUserResult = User | InternalServerError
`;

export const Queries = `
`;

export const Mutations = `
    createUser(email: String!, password: String!): CreateUserResult!
`;
