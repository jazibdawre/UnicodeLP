const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

let credentials = {
	username: 'jazib',
	password: 'jazib',
};

let dummy = {
	name: 'CustomerZ',
};

const customerid = '5f4798b2daefa420143313c9';

describe('Customers', () => {
	before((done) => {
		chai.request(app)
			.post('/users/login')
			.send(credentials)
			.end((err, res) => {
				if (err) done(err);
				token = res.body.token;
				done();
			});
	});

	describe('GET /', () => {
		it('should get list of all customers', (done) => {
			chai.request(app)
				.get('/customers')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
		it('should get a single customer record', (done) => {
			chai.request(app)
				.get(`/customers/${customerid}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});

	describe('PUT /', () => {
		it('should return not permitted', (done) => {
			chai.request(app)
				.put('/customers')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should update a single customer record', (done) => {
			chai.request(app)
				.put(`/customers/${customerid}`)
				.set({ Authorization: `Bearer ${token}` })
				.send({ name: 'CustomerY' })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});

	describe('POST /', () => {
		it('should create and return a customer', (done) => {
			chai.request(app)
				.post('/customers')
				.set({ Authorization: `Bearer ${token}` })
				.send(dummy)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
		it('should return forbidden', (done) => {
			chai.request(app)
				.post(`/customers/${customerid}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
	});

	describe('DELETE /', () => {
		it('should return not found', (done) => {
			chai.request(app)
				.delete('/customers')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should delete a single customer record', (done) => {
			chai.request(app)
				.delete(`/customers/${customerid}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});
});
