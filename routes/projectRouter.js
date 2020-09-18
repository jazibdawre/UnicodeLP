var express = require('express');
const Projects = require('../models/projects');

var authenticate = require('../authenticate');

var projectRouter = express.Router();

projectRouter.route('/')
.get(authenticate.verifyUser, async (req, res, next) => {
	try {
		const projects = await Projects.find({}).populate('customer employees');
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(projects);
	} catch (error) {
		next(error);
	}
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /projects');
})
.post(authenticate.verifyUser, async (req, res, next) => {
	try {
		const project = await Projects.create(req.body);
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(project);
	} catch (error) {
		next(error);
	}
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /projects');
});

projectRouter.route('/:projectId')
.get(authenticate.verifyUser, async (req, res, next) => {
	try {
		const project = await Projects.findById(req.params.projectId).populate('customer employees');
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(project);
	} catch (error) {
		next(error);
	}
})
.post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on /projects/'+ req.params.projectId);
})
.put(authenticate.verifyUser, async (req, res, next) => {
	try {
		const project = await Projects.findByIdAndUpdate(req.params.projectId, { $set: req.body }, { new: true }); //new returns the modified project data
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(project);
	} catch (error) {
		next(error);
	}
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
	try {
		const resp = await Projects.findByIdAndRemove(req.params.projectId);
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	} catch (error) {
		next(error);
	}
});

module.exports = projectRouter;
