var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, (err, db) => {
	if (err) throw err;
	var dbo = db.db("SinhVien");
	//insert
	/*var myObj = {hoten: "Van Tuan", diemtoan: 9, diemly: 9, diemhoa: 8, create_at: Date.now()};
	dbo.collection("BangDiem").insertOne(myObj, (err, res) => {
		if (err) throw err;
		console.log("1 document inserted!");
		db.close();
	});*/

	//findOne
	/*dbo.collection("BangDiem").findOne({}, (err, result) => {
		if (err) throw err;
		console.log(result);
		db.close();
	})*/

	//findAll
	/*dbo.collection("BangDiem").find({}).toArray((err, result) => {
		if (err) throw err;
		console.log(result);
		db.close();
	});*/

	//sort
	/*var mySort = {hoten: 1} //sap xep tang, -1 sap xep giam
	dbo.collection("BangDiem").find().sort(mySort).toArray((err, result) => {
		if (err) throw err;
		console.log(result);
		db.close();
	});*/

	//delete
	var myQuery = {diemtoan: 9};
	dbo.collection("BangDiem").deleteMany(myQuery, (err, obj) => {
		if (err) throw err;
		console.log(obj.result.n + "Deleted!");
		db.close();
	})
})

