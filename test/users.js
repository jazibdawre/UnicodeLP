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
			.post('/users/signup')
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
				.get('/')
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
				.get(`/signup`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.get(`/login`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should get a single user record', (done) => {
			const userid = 5; //Get from demo
			chai.request(app)
				.get(`/${userid}`)
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
				.put('/')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.put(`/signup`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.put(`/login`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should update a single user record', (done) => {
			const userid = 5; //Get from demo
			chai.request(app)
				.put(`/${userid}`)
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
				.post('/')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return jwt', (done) => {
			chai.request(app)
				.post(`/signup`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
		it('should return jwt', (done) => {
			chai.request(app)
				.post(`/login`)
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
				.post(`/${userid}`)
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
				.delete('/')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.delete(`/signup`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should return not found', (done) => {
			chai.request(app)
				.delete(`/login`)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
		it('should delete a single user record', (done) => {
			const userid = 5; //Get from demo
			chai.request(app)
				.delete(`/${userid}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(404);
					done();
				});
		});
	});
});
