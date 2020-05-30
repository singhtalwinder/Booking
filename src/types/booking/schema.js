export const Types = `
    type Booking {
        bookingId: ID!
        event: Event!
        user: User!
        bookedAt: String!
    }

    type EventNotFound implements Error {
        message: String!
    }

    type AlreadyBooked implements Error {
        message: String!
    }

    type BookingNotFound implements Error {
        message: String!
    }

    union BookingResult = Booking | EventNotFound | AlreadyBooked | InternalServerError
    union CancleBookingResult = Booking | BookingNotFound | InternalServerError
`;

export const Queries = `
    bookings: [Booking!]
`;

export const Mutations = `
    bookEvent(eventId: ID!): BookingResult!
    cancleBooking(eventId: ID!): CancleBookingResult!
`;
