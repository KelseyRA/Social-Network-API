const router = require("express").Router();
const { ObjectId } = require("mongoose").Types;
const { User, Thought, reactionSchema } = require("../../models");

router.post("/:thoughtId/reactions", async (req, res) => {
	try {
		const { thoughtId } = req.params;
		const { reactionBody, username } = req.body;

		const newReaction = await reactionSchema.create({ reactionBody, username });

		const updateThought = await Thought.findOneAndUpdate(
			{ _id: thoughtId },
			{ $push: { reaction: newReaction._id } },
			{ new: true }
		);

		if (!updateThought) {
			return res.status(404).json({ message: "No thought with this ID" });
		}

		return res.json(newReaction);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

module.exports = router;
