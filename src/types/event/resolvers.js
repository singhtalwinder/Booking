import query from "../../utils/mysqlQuery";
import { getUserWithCreatedEvents } from "../../commonResolvers/getUserWithCreatedEvents";

export const Event = {
	eventId: async (event) => {
		if (event.hasOwnProperty("eventId")) return event.eventId;
		try {
			let result = await query(
				`SELECT * FROM event WHERE eventId = 
				(SELECT MAX(eventId) FROM event);`
			);
			return result[0].eventId;
		} catch (err) {
			throw err;
		}
	},

	registerDate: async (event) => {
		if (event.hasOwnProperty("registerDate")) return Date(event.registerDate);
		let result;
		try {
			result = await query(
				`SELECT * FROM event WHERE eventId = 
            (SELECT MAX(eventId) FROM event);`
			);
		} catch (err) {
			throw err;
		}
		return Date(result[0].registerDate);
	},

	creator: () => {
		return getUserWithCreatedEvents(1);
	},
};

export const Query = {
	events: async (_, args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			let result = await query(
				`SELECT * FROM event WHERE userId=${req.userId}`
			);
			return result;
		} catch (err) {
			throw new Error("InternalServerError");
		}
	},
};

export const Mutation = {
	createEvent: async (_, args, req) => {
		if (!req.isAuth) {
			return {
				__typename: "Unauthorized",
				message: "You are not allowed to create events.",
			};
		}
		let event = [
			[
				req.userId,
				args.eventInput.title,
				args.eventInput.description,
				args.eventInput.price,
			],
		];
		try {
			await query(
				`INSERT INTO event
                        (userId, title, description, price)
                 VALUES ?`,
				[event]
			);

			return {
				__typename: "Event",
				title: args.eventInput.title,
				description: args.eventInput.description,
				price: args.eventInput.price,
			};
		} catch (err) {
			console.log(err);
			return {
				__typename: "InternalServerError",
				message: "A server error has occurred.",
			};
		}
	},
};
