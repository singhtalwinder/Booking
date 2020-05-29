export const Types = `
    type Booking {
        bookingId: ID!
        event: Event!
        user: User!
        bookedAt: String!
    }
`;

export const Queries = `
    bookings: [Booking!]
`;

export const Mutations = `
    bookEvent(eventId: ID!): Booking!
    cancleBooking(eventId: ID!): Event!
`;
