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
	name: 'ProjectX',
	customer: '5f4798b2daefa420143313c9',
	employees: ['5f4797efdfa4082bc0a17d7e'],
	startdate: '2020-08-27T11:24:31.396+00:00',
};

const projectid = '5f930d7d6ce9d702a4376aea';

describe('Projects', () => {
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
		it('should get list of all projects', (done) => {
			chai.request(app)
				.get('/projects')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
		it('should get a single project record', (done) => {
			chai.request(app)
				.get(`/projects/${projectid}`)
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
				.put('/projects')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should update a single project record', (done) => {
			chai.request(app)
				.put(`/projects/${projectid}`)
				.set({ Authorization: `Bearer ${token}` })
				.send({ name: 'ProjectY' })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});

	describe('POST /', () => {
		it('should create and return a project', (done) => {
			chai.request(app)
				.post('/projects')
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
				.post(`/projects/${projectid}`)
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
				.delete('/projects')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should delete a single project record', (done) => {
			chai.request(app)
				.delete(`/projects/${projectid}`)
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
