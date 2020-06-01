export const Types = `
    type User {
        userId: ID!
        email: String!
        createdEvents: [Event!]
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type IncorrectCredentials implements Error {
        message: String!
    }

    type UserAlreadyExists implements Error {
        message: String!
    }

    union signupResult = User | IncorrectCredentials | UserAlreadyExists | InternalServerError
    union SigninResult = AuthData | IncorrectCredentials | InternalServerError
`;

export const Queries = `
    signin(email: String!, password: String!): SigninResult!
`;

export const Mutations = `
    signup(email: String!, password: String!): signupResult!
`;
