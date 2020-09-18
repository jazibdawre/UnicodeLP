var passport = require('passport');
var config = require('./config/authentication');
var LocalStrategy = require('passport-local').Strategy;
var Extractjwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var jwt = require('jsonwebtoken');

var User = require('./models/users');

//use passport-local-mongoose plugin in schema
passport.use(new LocalStrategy(User.authenticate()));

//JWT token to return to client
exports.getToken = (user) => {
	return jwt.sign(user, config.secretKey, {expiresIn: 3600});	//1 hour
}

//JWT config
var opts = {};
opts.jwtFromRequest = Extractjwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

//JWT with passport
exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	User.findOne({_id: jwt_payload._id}, (err, user) => {
		if(err){
			return done(err, false);
		}
		else if(user){
			return done(null, user);
		}
		else{
			return done(null, false);
		}
	});
}));

//Verify if JWT is valid
exports.verifyUser = passport.authenticate('jwt', {session: false});

//Actual verification in database before giving jwt
exports.verifyUserDB = passport.authenticate('local', {session: false});

//Verify if admin flag is set for super secure routes
exports.verifyAdmin = (req, res, next) => {
    if(req.user.admin){
        return next();
    }
    else if(!req.user.admin){
        err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
    else{
        return next(err);
    }
};