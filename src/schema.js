import {
	Types as UserTypes,
	Queries as UserQueries,
	Mutations as UserMutations,
} from "./types/user/schema";

import {
	Types as EventTypes,
	Queries as EventQueries,
	Mutations as EventMutations,
} from "./types/event/schema";

import {
	Types as BookingTypes,
	Queries as BookingQueries,
	Mutations as BookingMutations,
} from "./types/booking/schema";

export default `
    interface Error {
        message: String!
    }

    type InternalServerError implements Error {
        message: String!
    }

    type Unauthorized implements Error {
        message: String!
    }

    ${UserTypes}
    ${EventTypes}
    ${BookingTypes}

    type Query {
        ${UserQueries}
        ${EventQueries}
        ${BookingQueries}
    }

    type Mutation {
        ${UserMutations}
        ${EventMutations}
        ${BookingMutations}
    }
`;
