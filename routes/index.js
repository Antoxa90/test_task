let path = require('path');
let PDFDocument = require('pdfkit');
let db = require('../config/database');

module.exports = app => {
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + '/../index.html'));
	});

	app.post('/api/find', (req, res) => {
		let firstName = req.body.firstName;

		db.connection.query("SELECT * FROM test_task WHERE firstName = ?", firstName, (err, result) => { //find user by first name
			if (err)
				throw err;

			if(result.length > 0) {

				let doc = new PDFDocument(); // create pdf document
				doc.text(result[0].firstName + ' ' + result[0].lastName); // adding first name and last name
				doc.image(result[0].image); // adding image in pdf file

				let buffers = [];
				doc.on('data', buffers.push.bind(buffers));
				doc.on('end', () => {
					let pdfData = Buffer.concat(buffers); // pdf data in binary format
					db.connection.query("UPDATE test_task SET pdf = ? WHERE firstName = ?", [pdfData, firstName], (err, result) => { // save pdf file
						if (err)
							throw err;

						res.send({success: true});
					});

				});

				doc.end();
			}
			else
				res.send({success: false});

		});

	});
};