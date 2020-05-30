import bcrypt from "bcryptjs";
import query from "../../utils/mysqlQuery";

export const User = {};

export const Query = {};

export const Mutation = {
	createUser: async (_, args) => {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(args.password, salt);

			await query(`START TRANSACTION`);
			await query(
				`INSERT INTO user (email, password) VALUES ("${args.email}", "${hashedPassword}")`
			);
			let result = await query(`SELECT MAX(userId) AS userId FROM user`);
			await query(`COMMIT`);

			return {
				__typename: "User",
				userId: result[0].userId,
				email: args.email,
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
