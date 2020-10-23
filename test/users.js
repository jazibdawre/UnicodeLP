import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

let credentials = {
	username: 'admin',
	password: 'password',
};
let token;

describe('Users', () => {
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
		it('should get list of all users', (done) => {
			chai.request(app)
				.get('/users')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.get(`/users/signup`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.get(`/users/login`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should get a single user record', (done) => {
			const userid = 5; //Get from demo
			chai.request(app)
				.get(`/users/${userid}`)
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
		it('should return not found', (done) => {
			chai.request(app)
				.put('/users')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.put(`/users/signup`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.put(`/users/login`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should update a single user record', (done) => {
			const userid = 5; //Get from demo
			chai.request(app)
				.put(`/users/${userid}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});

	describe('POST /', () => {
		it('should return not found', (done) => {
			chai.request(app)
				.post('/users')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return jwt', (done) => {
			chai.request(app)
				.post(`/users/signup`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
		it('should return jwt', (done) => {
			chai.request(app)
				.post(`/users/login`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
		it('should return forbidden', (done) => {
			const userid = 5; //Get from demo
			chai.request(app)
				.post(`/users/${userid}`)
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
				.delete('/users')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.delete(`/users/signup`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.delete(`/users/login`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should delete a single user record', (done) => {
			const userid = 5; //Get from demo
			chai.request(app)
				.delete(`/users/${userid}`)
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