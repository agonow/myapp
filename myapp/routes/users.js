var express = require('express');
var router = express.Router();
var sql = require("./../tool/sql")
var md5 = require("md5")

/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.find("sh1811","users",{}).then(data => {
  	res.render("users",{
  		activeIndex:2,
  		data
  	});
  }).catch(err => {
  	console.log(err)
  })
  
  
 
});

router.get('/add', function(req, res, next) {
  res.render("users_add",{
  	activeIndex:2
  })
});

router.post("/addAction",function(req,res,next){
	let {tel, nickname ,password} = req.body;

	sql.find("sh1811" ,"users",{tel:tel}).then(data => {
		if(data.length == 0){
				password = md5(password)
				sql.insert("sh1811","users",{tel,nickname,password})
				.then(() => {
					res.redirect("/users")
				}).catch((err) => {
					res.redirect("/users/add")
				})
		}else{
			res.redirect("/users/add")
		}
	}).catch(err => {
		console.log(err)
	})
	
})


router.get("/remove",function(req, res, next){
	const {tel} = req.query
	sql.remove("sh1811", "users", {tel}).then(() => {
		res.redirect("/users");
	}).catch((err) =>{
		res.redirect("/users");
	})
});


router.post("/updateAction", function(req, res, next){
	const {tel, nickname} = req.body;
	sql.update("sh1811", "users", "updateOne", {tel}, {$set:{nickname}})
	.then(() => {
		res.redirect("/users")
	}).catch(err => {
		res.redirect("/users")
	})
});
module.exports = router;
