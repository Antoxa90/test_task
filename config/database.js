let mysql = require('mysql');
let path = require('path');
let fs = require('fs');

let dbname = 'test_task';

let con = mysql.createConnection({ // create connection
	host: "localhost",
	user: "root",
	password: "root"
});

con.connect((err) => {
	if (err) throw err;
	console.log("Connected!");
	initDatabase();
});

function initDatabase() {
	con.query("CREATE DATABASE IF NOT EXISTS test_task", function (err, result) { // create database
		if (err)
			throw err;
		console.log("Database created!");
	});

	con.changeUser({database: dbname}, (err) => { // use database
		if (err)
			throw err;

		con.query("DROP TABLE IF EXISTS ??", dbname, (err, result) => { // drop table
			if (err)
				throw err;

			let sql = "CREATE TABLE ?? (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, image BLOB, pdf BLOB)";
			con.query(sql, dbname, (err, result) => { // create table
				if (err) throw err;
				console.log("Table created");

				fs.readFile(path.join(__dirname + '/../public/images/test1.jpg'), function(err, data) { // read test file
					if (err)
						throw err;

					con.query("INSERT INTO ?? (firstName, lastName, image) VALUES ('firstname1', 'lastname1', ?)", [dbname, new Buffer(data, 'binary')], (err, result) => { // insert values into table
						if (err)
							throw err;
						console.log("insert 1");
					});
				});

				fs.readFile(path.join(__dirname + '/../public/images/test2.jpg'), function(err, data) {
					if (err)
						throw err;

					con.query("INSERT INTO ?? (firstName, lastName, image) VALUES ('firstname2', 'lastname2', ?)", [dbname, new Buffer(data, 'binary')], (err, result) => {
						if (err)
							throw err;
						console.log("insert 2");
					});
				});

				fs.readFile(path.join(__dirname + '/../public/images/test3.jpg'), function(err, data) {
					if (err)
						throw err;

					con.query("INSERT INTO ?? (firstName, lastName, image) VALUES ('firstname3', 'lastname3', ?)", [dbname, new Buffer(data, 'binary')], (err, result) => {
						if (err)
							throw err;
						console.log("insert 3");
					});
				});
			});

		});
	});
}

module.exports = {
	connection: con,
	dbname: dbname
};