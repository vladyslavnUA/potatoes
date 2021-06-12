const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    title: String,
    content: String,
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review' },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;