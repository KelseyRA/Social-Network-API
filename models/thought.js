const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');

// Thought Model

const thoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 280,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => formateDate(timestamp),
	},
	username: {
		type: String,
		required: true,
	},
	reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

function formateDate(timestamp) {
	return new Date(timestamp).toLocaleString();
}

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
