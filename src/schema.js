import {
	Types as UserTypes,
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
    ${UserTypes}
    ${EventTypes}
    ${BookingTypes}

    type Query {
        ${EventQueries}
        ${BookingQueries}
    }

    type Mutation {
        ${UserMutations}
        ${EventMutations}
        ${BookingMutations}
    }
`;
