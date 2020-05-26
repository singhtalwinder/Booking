import { Types as UserTypes, Mutations as UserMutations } from "./user/schema";
import {
	Types as EventTypes,
	Queries as EventQueries,
	Mutations as EventMutations,
} from "./event/schema";

export default `
    ${UserTypes}
    ${EventTypes}

    type Query {
        ${EventQueries}
    }

    type Mutation {
        ${UserMutations}
        ${EventMutations}
    }
`;
