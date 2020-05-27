import query from "./mysqlQuery";

export const createdEvents = async (userId = 1) => {
	try {
		let result = await query(`SELECT *FROM event WHERE userId=${userId}`);

		if (!result.length) return null;

		return result;
	} catch (err) {
		console.log(err);
		throw new Error("Internal server error");
	}
};

export const recentlyCreatedEvent = async () => {
	try {
		let result = await query(
			`SELECT * FROM event WHERE eventId = 
            (SELECT MAX(eventId) FROM event);`
		);
		return result[0];
	} catch (err) {
		console.log(err);
		throw new Error("Internal server error");
	}
};
