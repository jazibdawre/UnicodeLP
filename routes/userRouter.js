var express = require('express');
var passport = require('passport');
var User = require('../models/users');
var authenticate = require('../authenticate');

var userRouter = express.Router();

userRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
  try {
		const users = await User.find({});
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(users);
	} catch (error) {
		next(error);
  }
});

//Authentication routes
//Signup
userRouter.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), req.body.password, async(err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.name){
        user.name = req.body.name;
      }
      //Add other properties here if needed
      try {
        const resp = await user.save();
        authenticate.verifyUserDB(req, res, () => {
          var token = authenticate.getToken({_id: req.user._id}); //get jwt token
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, token: token, status: 'You are successfully registered!'});
        })
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: error});
        return;
      }
    }
  });
});

//Login
userRouter.post('/login', authenticate.verifyUserDB, (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

//Logout
userRouter.get("/logout", function(req, res){
  // Invalidate/blacklist the jwt or something here
  res.redirect("/");
});

//User
userRouter.route('/:userId')
.get(authenticate.verifyUser, async (req, res, next) => {
	try {
		const user = await User.findById(req.params.userId);
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(user);
	} catch (error) {
		next(error);
	}
})
.post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on /users/'+ req.params.userId);
})
.put(authenticate.verifyUser, async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true }); //new returns the modified user data
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(user);
	} catch (error) {
		next(error);
	}
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
	try {
		const resp = await User.findByIdAndRemove(req.params.userId);
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	} catch (error) {
		next(error);
	}
});

module.exports = userRouter;