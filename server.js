let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require('path');
let app = express();
let router = express.Router();
let port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.route("/")
.get(function(req, res){
	fs.readFile(path.join(__dirname, "static/landing.html"), 'utf-8', function(err, data){
		if(err){
			res.send(err);
		}else{
			res.set("Content-Type", "text/html")
			.send(data);
		}
	});
});

router.route("/attending")
.post(function(req, res){
	let name = req.body.name;
	let foodChoice = req.body.foodChoice;
	let dietaryRestrictions = req.body.dietaryRestrictions;
	if(name && foodChoice){
		//TODO: save data in DB
		res.status(204).send();
	}else{
		res.status(400).send();
	}
});

router.route("/not-attending")
.post(function(req, res){
	let name = req.body.name;
	let message = req.body.message;
	if(name && message){
		//TODO: save this information in the DB
		res.status(204).send();
	}else{
		res.status(400).send();
	}
});

app.use(express.static(path.join(__dirname, "static")));
app.use("/", router);

app.listen(port);
console.log(`Listening on port ${port}`);
