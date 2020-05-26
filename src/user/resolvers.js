import bcrypt from "bcryptjs";
import connection from "../utils/DBConnection";

export const User = {};

export const Query = {};

export const Mutation = {
	createUser: async (_, args) => {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(args.password, salt);

		let user = [[args.email, hashedPassword]];

		await new Promise(async (resolve, reject) => {
			await new Promise((resolve, reject) => {
				connection.query(`START TRANSACTIO`, (err, result) => {
					if (err) return reject(err);
					resolve(result);
				});
			}).catch((err) => {
				return reject(err);
			});

			await new Promise((resolve, reject) => {
				connection.query(
					`INSERT INTO user (email, password) VALUES ?`,
					[user],
					(err, result) => {
						if (err) return reject(err);
						resolve(result);
					}
				);
			}).catch((err) => {
				return reject(err);
			});

			user = {
				email: args.email,
				userId: 0,
			};

			await new Promise((resolve, reject) => {
				connection.query(
					`SELECT MAX(userId) AS userId FROM user`,
					(err, result) => {
						if (err) return reject(err);
						resolve(result);
					}
				);
			})
				.then((result) => {
					user.userId = result[0].userId;
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				});
		})
			.then((result) => {
				connection.query(`COMMIT`, (err, result) => {
					if (err) throw err;
				});
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});

		return user;
	},
};
