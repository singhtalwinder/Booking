import {
	Query as UserQuery,
	Mutation as UserMutation,
	User,
} from "./user/resolvers";

export default {
	Query: Object.assign({}, UserQuery),
	Mutation: Object.assign({}, UserMutation),
	User,
};
