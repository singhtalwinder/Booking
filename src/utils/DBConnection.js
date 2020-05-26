import mysql from "mysql";

const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB,
});

connection.connect((err) => {
	if (err) throw err;
	console.log(`Connected to database: ${process.env.DB}`);
});

export default connection;
