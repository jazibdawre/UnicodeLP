const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

let credentials = {
	username: 'jazib',
	password: 'jazib',
};

const filename = '.gitkeep';

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
		it('should return file for download', (done) => {
			chai.request(app)
				.get(`/uploads/getFile/${filename}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
		it('should return files list for viewing', (done) => {
			chai.request(app)
				.get('/uploads/viewFiles')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
		it('should return not permitted', (done) => {
			chai.request(app)
				.put('/uploads/uploadFile')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
	});

	describe('PUT /', () => {
		it('should return not permitted', (done) => {
			chai.request(app)
				.put(`/uploads/getFile/${filename}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should return not permitted', (done) => {
			chai.request(app)
				.put('/uploads/viewFiles')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should return not permitted', (done) => {
			chai.request(app)
				.put('/uploads/uploadFile')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
	});

	describe('POST /', () => {
		it('should return not permitted', (done) => {
			chai.request(app)
				.put(`/uploads/getFile/${filename}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should return not permitted', (done) => {
			chai.request(app)
				.put('/uploads/viewFiles')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should return details of uploaded file', (done) => {
			chai.request(app)
				.post('/uploads/uploadFile')
				.set({ Authorization: `Bearer ${token}` })
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.field('Content-Type', 'multipart/form-data')
				.attach('file', './index.js')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});

	describe('DELETE /', () => {
		it('should return not permitted', (done) => {
			chai.request(app)
				.put(`/uploads/getFile/${filename}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should return not permitted', (done) => {
			chai.request(app)
				.put('/uploads/viewFiles')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
		it('should return not permitted', (done) => {
			chai.request(app)
				.put('/uploads/uploadFile')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(403);
					done();
				});
		});
	});
});
