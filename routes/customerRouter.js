var express = require('express');
const Customers = require('../models/customers');

var authenticate = require('../authenticate');

var customerRouter = express.Router();

customerRouter
	.route('/')
	.get(authenticate.verifyUser, async (req, res, next) => {
		try {
			const customers = await Customers.find({}).populate('projects');
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(customers);
		} catch (error) {
			next(error);
		}
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /customers');
	})
	.post(authenticate.verifyUser, async (req, res, next) => {
		try {
			const customer = await Customers.create(req.body);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(customer);
		} catch (error) {
			next(error);
		}
	})
	.delete((req, res, next) => {
		res.statusCode = 403;
		res.end('DELETE operation not supported on /customers');
	});

customerRouter
	.route('/:customerId')
	.get(authenticate.verifyUser, async (req, res, next) => {
		try {
			const customer = await Customers.findById(
				req.params.customerId
			).populate('projects');
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(customer);
		} catch (error) {
			next(error);
		}
	})
	.post((req, res, next) => {
		res.statusCode = 403;
		res.end(
			'POST operation not supported on /customers/' +
				req.params.customerId
		);
	})
	.put(authenticate.verifyUser, async (req, res, next) => {
		try {
			const customer = await Customers.findByIdAndUpdate(
				req.params.customerId,
				{ $set: req.body },
				{ new: true, useFindAndModify: true }
			); //new returns the modified customer data
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(customer);
		} catch (error) {
			next(error);
		}
	})
	.delete(
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		async (req, res, next) => {
			try {
				const resp = await Customers.findByIdAndRemove(
					req.params.customerId
				);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			} catch (error) {
				next(error);
			}
		}
	);

module.exports = customerRouter;
