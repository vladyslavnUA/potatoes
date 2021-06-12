const Comment = require('../models/comment');

module.exports = (app) => {
    
    // Submit a new comment
    app.post('/reviews/comments', (req, res) => {
        // if (req.user) {
        //     const userId = req.user._id;
        //     const comment = new Comment(req.body);
        //     comment.author = userId;
        
        //     comment
        //         .save()
        //         .then(() => Post.findById(userId))
        //         .then((user) => {
        //         user.reviews.unshift(review);
        //         user.save();
        //         // REDIRECT TO THE NEW review
        //         return res.redirect(`/reviews/${review._id}`);
        //         })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });
        // } else {
        //     return res.status(401); // UNAUTHORIZED
        // }

        Comment.create(req.body)
            .then((comment) => {
                comment.author = req.user;
                comment.save()
            console.log(comment)
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        });
    });

    app.delete('/reviews/comments/:id', (req, res) => {
        console.log('Deleting Comment: ', req.params.id)
        Comment.findByIdAndRemove(req.params.id).then(comment => {
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

}