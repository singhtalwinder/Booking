import query from "../utils/mysqlQuery";

export const getUserWithCreatedEvents = async (userId) => {
	try {
		let result = await query(`SELECT * FROM user WHERE userId=${userId}`);

		let user = {
			userId: result[0].userId,
			email: result[0].email,
			createdEvents: null,
		};

		result = await query(`SELECT *FROM event WHERE userId=${userId}`);

		if (!result.length) return user;

		user.createdEvents = result;
		user.createdEvents.map((createEvent) => {
			createEvent.creator = user;
		});

		return user;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
