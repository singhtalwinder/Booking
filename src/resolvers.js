import {
	Query as UserQuery,
	Mutation as UserMutation,
	User,
} from "./user/resolvers";

import {
	Query as EventQuery,
	Mutation as EventMutation,
	Event,
} from "./event/resolvers";

export default {
	Query: Object.assign({}, UserQuery, EventQuery),
	Mutation: Object.assign({}, UserMutation, EventMutation),
	User,
	Event,
};
