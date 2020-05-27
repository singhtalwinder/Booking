import query from "../utils/mysqlQuery";
import { createdEvents, recentlyCreatedEvent } from "../utils/query";

export const Event = {
	eventId: async () => {
		let { eventId } = await recentlyCreatedEvent();
		return eventId;
	},

	registerDate: async () => {
		let { registerDate } = await recentlyCreatedEvent();
		return Date(registerDate);
	},

	creator: async () => {
		try {
			let result = await query(`SELECT * FROM user WHERE userId=${1}`);

			let user = {
				userId: result[0].userId,
				email: result[0].email,
			};

			result = await createdEvents(1);

			user.createdEvents = result;
			user.createdEvents.map((createEvent) => {
				createEvent.creator = user;
			});

			return user;
		} catch (err) {
			console.log(err);
			throw new Error("Internal server error");
		}
	},
};

export const Query = {};

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
				title: args.eventInput.title,
				description: args.eventInput.description,
				price: args.eventInput.price,
			};
		} catch (err) {
			console.log(err);
			throw new Error("Internal server error");
		}
	},
};
