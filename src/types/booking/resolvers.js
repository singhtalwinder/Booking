import query from "../../utils/mysqlQuery";
import { getUserWithCreatedEvents } from "../../commonResolvers/getUserWithCreatedEvents";

export const Booking = {
	bookingId: (booking) => {
		return parseInt("" + booking.userId + booking.eventId);
	},

	event: async (booking) => {
		try {
			let result = await query(
				`SELECT *FROM EVENT WHERE eventId=${booking.eventId}`
			);
			result[0].creator = getUserWithCreatedEvents(result[0].userId);
			return result[0];
		} catch (err) {
			throw err;
		}
	},

	user: (booking) => {
		return getUserWithCreatedEvents(booking.userId);
	},

	bookedAt: async (booking) => {
		if (booking.hasOwnProperty("bookedAt")) return Date(booking.bookedAt);
		try {
			let result = await query(
				`SELECT bookedAt FROM booking WHERE 
			eventId=${booking.eventId} AND userId=${booking.userId}
		`
			);
			return Date(result[0]);
		} catch (err) {
			throw err;
		}
	},
};

export const Query = {
	bookings: async (_, args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			let result = await query(
				`SELECT *FROM booking WHERE userId=${req.userId}`
			);
			return result;
		} catch (err) {
			console.log(err);
			throw new Error("InternalServerError");
		}
	},
};

export const Mutation = {
	bookEvent: async (_, args, req) => {
		if (!req.isAuth) {
			return {
				__typename: "Unauthorized",
				message: "You are not allowed to book events.",
			};
		}
		try {
			await query(`START TRANSACTION`);

			let result = await query(
				`SELECT eventId from EVENT WHERE eventId=${args.eventId}`
			);

			if (!result.length) {
				return {
					__typename: "EventNotFound",
					message: "No such event exists!",
				};
			}

			await query(
				`INSERT INTO booking (userID, eventId) VALUES (${req.userId}, ${args.eventId})`
			);

			await query(`COMMIT`);

			return {
				__typename: "Booking",
				userId: req.userId,
				eventId: args.eventId,
			};
		} catch (err) {
			if (err.hasOwnProperty("errno") && err.errno === 1062) {
				return {
					__typename: "AlreadyBooked",
					message: "Event already been booked by you.",
				};
			}
			console.log(err);
			return {
				__typename: "InternalServerError",
				message: "A server error has occurred.",
			};
		}
	},

	cancleBooking: async (_, args, req) => {
		if (!req.isAuth) {
			return {
				__typename: "Unauthorized",
				message: "You are not allowed to create events.",
			};
		}
		try {
			await query(`START TRANSACTION`);
			let result = await query(
				`SELECT *FROM booking WHERE
				userId=${req.userId} AND eventId=${args.eventId}`
			);

			if (!result.length) {
				return {
					__typename: "BookingNotFound",
					message: "No such booking exists.",
				};
			}

			await query(
				`DELETE FROM booking WHERE
				userId=${req.userId} AND eventId=${args.eventId}`
			);

			await query(`COMMIT`);

			return {
				__typename: "Booking",
				userId: req.userId,
				eventId: result[0].eventId,
				bookedAt: result[0].bookedAt,
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
