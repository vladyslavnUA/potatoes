const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');

chai.use(chaiHttp);

describe('Reviews', () => {

    // Test Index
    it('should index ALL reviews on / GET', async (done) => {
        chai.request(server).get('/')
            .end((err, res) => {
                // 200 -> good 404 -> template not found
                res.should.have.status(200);
                res.should.be.html;
                // setTimeout(done, 15000);
                // console.log('test finned');
                done();
                // sleep(1);
            })
            // .timeout(15000)
            // .catch((err) => {
            //     console.log(err.message);
            // })
    });

    // TEST NEW
    // TEST CREATE
    // TEST SHOW
    // TEST EDIT
    // TEST UPDATE
    // TEST DELETE

})