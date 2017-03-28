const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

const {BagItems} = require('./models');

const jsonParser = bodyParser.json();










app.get('/my-bag', (req, res) => {
	res.json(BagItems());
});

app.post('/my-bag', jsonParser, (req, res) => {
	const requiredFields = ['name', 'budget'];
	for(let i = 0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
		  const message = `Missing \`${field}\` in request body`
		  console.error(message);
		  return res.status(400).send(message);
		}
	}

	const item = BagItems.create(req.body.name, req.body.budget);
	res.status(201).json(item);
})

app.use(express.static('public'));


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

exports.app = app;