const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');

chai.use(chaiHttp);

describe('Reviews', () => {

    // Test Index
    it('should index ALL reviews on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                // 200 -> good 404 -> template not found
              res.should.have.status(200);
              res.should.be.html;
              done();
            });
    });

    // TEST NEW
    it('should display posting new review form GET', (done) => {
        chai.request(server)
            .get('/reviews/new')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;

                // end the continous loop
                done();
            });
    });

    // SAMPLE REVIEW
    const sampleReview = {
        "title": "Another test",
        "movie-title": "La la land",
        "description": "A good movie",
        "author": "60c02752f72f666114574db5",
    }

    // TEST CREATE AND DETAIL PAGE
    // it('should create a review and show detail for it', async (done) => {
    //     // var review = Review.create(sampleReview);
    //     Review.create(sampleReview).then((err, data) => {
    //         chai.request(server)
    //             .get(`/reviews/${data._id}`)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.should.be.html
    //                 done();
    //             });
    //     });
    //     done();
    // });

    

    // TEST EDIT
    // it('should create a review and edit it', async (done) => {
    //     Review.create(sampleReview).then((err, data) => {
    //         chai.request(server)
    //             .get(`/reviews/${data._id}/edit`)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.should.be.html
    //                 done();
    //             });
    //     });
    //     done();
    // });

    // TEST CREATE
    // it('should create a review', (done) => {
    //     chai.request(server)
    //         .post(`/reviews`)
    //         .set('content-type', 'application/x-www-form-urlencoded')
    //         .send(sampleReview)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.should.be.html
    //             done();
    //         });
    //     });

    // TEST UPDATE
    it('should update a review', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            console.log(data);
            // console.log(data._id);
            
        }).then(data => {
            chai.request(server)
                .put(`/reviews/${data._id}?_method=PUT`)
                .set('content-type', 'application/json')
                .send({'title': 'Updating this title'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    data.title.should.equal('Updating this title');
                    done();
                });
        })
        done();
    });

    // TEST DELETE

    after(() => {
        Review.deleteMany({title: 'Another Good Review'});
        // Review.findOneAndRemove({title: 'Another Good Review'})
        //     .then((review) => {
        //         console.log(review);
        //     })
            // .exec((err, reviews) => {
            //     console.log(reviews);
                // reviews.remove();
        // })
    });

});