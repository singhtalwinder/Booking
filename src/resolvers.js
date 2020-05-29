import {
	Query as UserQuery,
	Mutation as UserMutation,
	User,
} from "./types/user/resolvers";

import {
	Query as EventQuery,
	Mutation as EventMutation,
	Event,
} from "./types/event/resolvers";

import {
	Query as BookingQuery,
	Mutation as BookingMutation,
	Booking,
} from "./types/booking/resolvers";

export default {
	Query: Object.assign({}, UserQuery, EventQuery, BookingQuery),
	Mutation: Object.assign({}, UserMutation, EventMutation, BookingMutation),
	User,
	Event,
	Booking,
};
