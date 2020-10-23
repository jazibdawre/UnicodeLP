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
	name: 'EmployeeZ',
	salary: '$500',
};

const employeeid = '5f4797efdfa4082bc0a17d7e';

describe('Employees', () => {
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
		it('should get list of all employees', (done) => {
			chai.request(app)
				.get('/employees')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
		it('should get a single employee record', (done) => {
			chai.request(app)
				.get(`/employees/${employeeid}`)
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
				.put('/employees')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should update a single employee record', (done) => {
			chai.request(app)
				.put(`/employees/${employeeid}`)
				.set({ Authorization: `Bearer ${token}` })
				.send({ name: 'EmployeeY' })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});

	describe('POST /', () => {
		it('should create and return a employee', (done) => {
			chai.request(app)
				.post('/employees')
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
				.post(`/employees/${employeeid}`)
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
				.delete('/employees')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should delete a single employee record', (done) => {
			chai.request(app)
				.delete(`/employees/${employeeid}`)
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
