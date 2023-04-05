const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId(),
		},

		reactionBody: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 280,
		},

		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => formateDate(timestamp),
		},
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

function formateDate(timestamp) {
	return new Date(timestamp).toLocaleString();
}

module.exports = reactionSchema;
