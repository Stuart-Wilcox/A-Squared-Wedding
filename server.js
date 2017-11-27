let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let router = express.Router();
let port = 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.route("/")
.get(function(req, res){
	res.set("Content-Type", "text/html").send("<h1>Hello World</h1>");
});

app.use("/", router);

app.listen(port);
console.log(`Listening on port ${port}`);
