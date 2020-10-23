import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Frontend', () => {
	describe('GET /', () => {
		it('should return homepage', (done) => {
			chai.request(app)
				.get('/')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});
	});
});
