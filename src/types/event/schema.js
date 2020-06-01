export const Types = `
    type Event {
        eventId: ID!
        title: String!
        description: String!
        price: Float!
        registerDate: String!
        creator: User
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
    }

    union CreateEventResult = Event | Unauthorized | InternalServerError
`;

export const Queries = `
    events: [Event!]
`;

export const Mutations = `
    createEvent(eventInput: EventInput): CreateEventResult!
`;
