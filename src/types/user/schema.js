export const Types = `
    type User {
        userId: ID!
        email: String!
        createdEvents: [Event!]
    }
`;

export const Queries = `
`;

export const Mutations = `
    createUser(email: String!, password: String!): User!
`;
