import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import query from "../../utils/mysqlQuery";
import signinValidation from "../../validation/signin";
import signupValidation from "../../validation/signup";

export const User = {};

export const Query = {
	signin: async (_, args) => {
		try {
			const { error } = signinValidation({
				email: args.email,
				password: args.password,
			});

			if (error) {
				return {
					__typename: "IncorrectCredentials",
					message: error.details[0].message,
				};
			}

			let result = await query(`SELECT *FROM user WHERE email="${args.email}"`);

			if (!result.length) {
				return {
					__typename: "IncorrectCredentials",
					message: "Incorrect E-mail or password",
				};
			}

			const isEqual = await bcrypt.compare(args.password, result[0].password);
			if (!isEqual) {
				return {
					__typename: "IncorrectCredentials",
					message: "Incorrect E-mail or password",
				};
			}

			const token = jwt.sign(
				{ userId: result[0].userId, email: result[0].email },
				process.env.BEARER_TOKEN_SECRET,
				{
					expiresIn: "1h",
				}
			);

			return {
				__typename: "AuthData",
				userId: result[0].userId,
				token: token,
				tokenExpiration: 1,
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

export const Mutation = {
	signup: async (_, args) => {
		try {
			const { error } = signupValidation({
				email: args.email,
				password: args.password,
			});
			if (error) {
				return {
					__typename: "IncorrectCredentials",
					message: error.details[0].message,
				};
			}
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
			if (err.hasOwnProperty("errno") && err.errno === 1062) {
				return {
					__typename: "UserAlreadyExists",
					message: "User with same email alreay exists",
				};
			}
			console.log(err);
			return {
				__typename: "InternalServerError",
				message: "A server error has occurred.",
			};
		}
	},
};
