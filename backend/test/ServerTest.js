const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../bin/server');

//configure chai
chai.use(chaiHttp);
chai.should();

describe('Test server is available', () => {
    it('/GET', (done) => {
        chai.request(app)
            .get('/')
            .end((err, response) => {
                if(err)
                    done(Error(err));

                response.should.have.status(200);
                done();
            })
    });
});