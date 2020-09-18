var express = require('express');
const Employees = require('../models/employees');

var authenticate = require('../authenticate');

var employeeRouter = express.Router();

employeeRouter.route('/')
.get(authenticate.verifyUser, async (req, res, next) => {
	try {
		const employees = await Employees.find({}).populate('projects');
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(employees);
	} catch (error) {
		next(error);
	}
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /employees');
})
.post(authenticate.verifyUser, async (req, res, next) => {
	try {
		const employee = await Employees.create(req.body);
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(employee);
	} catch (error) {
		next(error);
	}
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /employees');
});

employeeRouter.route('/:employeeId')
.get(authenticate.verifyUser, async (req, res, next) => {
	try {
		const employee = await Employees.findById(req.params.employeeId).populate('projects');
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(employee);
	} catch (error) {
		next(error);
	}
})
.post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on /employees/'+ req.params.employeeId);
})
.put(authenticate.verifyUser, async (req, res, next) => {
	try {
		const employee = await Employees.findByIdAndUpdate(req.params.employeeId, { $set: req.body }, { new: true }); //new returns the modified employee data
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(employee);
	} catch (error) {
		next(error);
	}
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
	try {
		const resp = await Employees.findByIdAndRemove(req.params.employeeId);
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	} catch (error) {
		next(error);
	}
});

module.exports = employeeRouter;