let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require('path');
let sqlite3 = require('sqlite3');
let app = express();
let router = express.Router();
let port = process.env.PORT || 5000;
let db = new sqlite3.Database('database.db');

db.serialize(function(){
	// db.run("DROP TABLE attending");
	// db.run("DROP TABLE notAttending");
	db.run("CREATE TABLE if not exists attending(name BLOB, foodChoice TEXT, dietaryRestrictions TEXT)");
	db.run("CREATE TABLE if not exists notAttending(name BLOB, message TEXT)");
});

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
	let dietaryRestrictions = req.body.dietaryRestrictions || "";

	name = name.replace(" ", "''");
	dietaryRestrictions = dietaryRestrictions.replace(" ", "''");
	if(name && foodChoice){
		let stmt = `INSERT INTO attending(name, foodChoice, dietaryRestrictions) values ('${name}', '${foodChoice}', '${dietaryRestrictions}')`;
		db.run(stmt);
		res.status(200).json({message: "suc"});
	}else{
		res.status(400).json({message: "err"});
	}
});

router.route("/not-attending")
.post(function(req, res){
	console.log(req.body);
	let name = req.body.name;
	let message = req.body.message;
	name = name.replace(" ", "''");
	message = message.replace(" ", "''");
	if(name && message){
		let stmt = `INSERT INTO notAttending(name, message) values ('${name}', '${message}')`;
		db.run(stmt);
		res.status(200).json({message: "suc"});
	}else{
		res.status(400).json({message: "err"});
	}
});

router.route("/api/attending")
.get(function(req, res){
	db.all("SELECT * FROM attending", function(err, rows){
		if(err){
			res.send(err);
		}
		else{
			let csvText = "NAME,MEAL CHOICE,DIETARY RESTRICTIONS\n";
			for(var i = 0; i < rows.length; i++){
				csvText += `${rows[i].name.replace("'", " ")},${rows[i].foodChoice},${rows[i].dietaryRestrictions.replace("'", " ")}\n`;
			}
			res
			.set("Content-Type", "text/csv")
			.set("Content-Disposition", 'attachment; filename="attending.csv"')
			.send(csvText);
		}
	});
});

router.route("/api/not-attending")
.get(function(req, res){
	db.all("SELECT * FROM notAttending", function(err, rows){
		if(err){
			res.send(err);
		}
		else{
			let csvText = "NAME,MESSAGE\n";
			for(var i = 0; i < rows.length; i++){
				csvText += `${rows[i].name.replace("'", " ")},${rows[i].message.replace("'", " ")}\n`;
			}
			res
			.set("Content-Type", "text/csv")
			.set("Content-Disposition", 'attachment; filename="notAttending.csv"')
			.send(csvText);
		}
	});
});

app.use(express.static(path.join(__dirname, "static")));
app.use("/", router);

app.listen(port);
console.log(`Listening on port ${port}`);
