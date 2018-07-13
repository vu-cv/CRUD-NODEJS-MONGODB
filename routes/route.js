var routes = (app) => {
	app.get('/', (req, res) => {
		var connect_db = require('../config/connect_db');
		var dbo = connect_db.getDb().db('CRUD');
		dbo.collection("Users").find({}).toArray((err, result) => {
			if (err) throw err;
			// console.log(result);
			res.render('index', {title: "CRUD", data: result});
		});
	});
	app.get('/:id/edit', (req, res) => {
		res.render('edit', {title: "Edit user"});
		// console.log(req.params.id);
	});
	app.post('/:id/edit', (req, res) => {
		var name = req.body.user.name;
		var age = req.body.user.age;
		var address = req.body.user.address;
		var id = req.params.id;
		// console.log(id);

		var connect_db = require('../config/connect_db');
		var dbo = connect_db.getDb().db('CRUD');
		var ObjectID = require('mongodb').ObjectID;

		var myquery = { _id: ObjectID("" + id) };
  		var newvalues = { $set: {name: name, age: age, address: address, create_at: Date.now() } };
		dbo.collection("Users").updateOne(myquery, newvalues, function(err, result) {
		    if (err) throw err;
		    console.log("1 document updated");
		    //chuyển hướng về trang chủ
			res.writeHead(302, { 
			  'Location': '/'
			});
			res.end();
		  });
	});


	app.get('/add', (req, res) => {
		res.render('add', {title: "Add user"});
	});
	app.post('/add', (req, res) => {
		var name = req.body.user.name;
		var age = req.body.user.age;
		var address = req.body.user.address;

		var connect_db = require('../config/connect_db');
		var dbo = connect_db.getDb().db('CRUD');
		// console.log(dbo);
		dbo.collection('Users').insertOne({name: name, age: age, address: address, create_at: Date.now()}, (err, result) => {
			if (err) throw err;
			console.log("1 inserted!");
			//chuyển hướng về trang chủ
			res.writeHead(302, { 
			  'Location': '/'
			});
			res.end();
		})
		
	});

	app.get('/:id/delete', (req, res) => {
		var connect_db = require('../config/connect_db');
		var dbo = connect_db.getDb().db('CRUD');
		var ObjectID = require('mongodb').ObjectID;
		var id = req.params.id;
		
		var myquery = { _id: ObjectID("" + id) };

		dbo.collection("Users").deleteOne(myquery, function(err, obj) {
		    if (err) throw err;
		    console.log("1 document deleted");
			//chuyển hướng về trang chủ
			res.writeHead(302, { 
			  'Location': '/'
			});
			res.end();
		  });
	});


}

module.exports = routes;