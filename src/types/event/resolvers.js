import query from "../../utils/mysqlQuery";
import { getUserWithCreatedEvents } from "../../commonResolvers/getUserWithCreatedEvents";

export const Event = {
	eventId: async (event) => {
		if (event.eventId) return event.eventId;
		let result = await query(
			`SELECT * FROM event WHERE eventId = 
            (SELECT MAX(eventId) FROM event);`
		);
		return result[0].eventId;
	},

	registerDate: async (event) => {
		if (!event.registerDate) return Date(event.registerDate);
		let result = await query(
			`SELECT * FROM event WHERE eventId = 
            (SELECT MAX(eventId) FROM event);`
		);
		return Date(result[0].registerDate);
	},

	creator: () => {
		return getUserWithCreatedEvents(1);
	},
};

export const Query = {
	events: async () => {
		let result = await query(`SELECT * FROM event WHERE userId=${1}`);
		return result;
	},
};

export const Mutation = {
	createEvent: async (_, args) => {
		let event = [
			[
				1,
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
				eventId: 0,
				title: args.eventInput.title,
				description: args.eventInput.description,
				price: args.eventInput.price,
				registerDate: 0,
			};
		} catch (err) {
			console.log(err);
			throw new Error("Internal server error");
		}
	},
};
