import connection from "./DBConnection";

const query = (...args) => {
	return new Promise((resolve, reject) => {
		connection.query(...args, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

export default query;
