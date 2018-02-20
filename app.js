let express = require("express");
let path = require('path');
let bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));

require('./routes')(app);

const server = app.listen(3000, () => {
	console.log(`Server is up and running on port 3000`);
});
