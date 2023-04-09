const router = require("express").Router();
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../../models");
const reactionSchema = require("../../models/Reaction");

// Route gets all thoughts
router.get("/", async (req, res) => {
	try {
		const thoughts = await Thought.find();
		return res.json(thoughts);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Route gets thought by thoughtID
router.get("/:thoughtId", async (req, res) => {
	try {
		const thoughts = await Thought.findById(req.params.thoughtId);
		if (!thoughts) {
			return res.status(404).json({ message: "Thought not found" });
		}
		return res.json(thoughts);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Route creates a new thought
router.post("/:usernameId", async (req, res) => {
	try {
		const { usernameId } = req.params;
		const { thoughtText, username } = req.body;

		const newThought = await Thought.create({ thoughtText, username });

		const updateUser = await User.findOneAndUpdate(
			{ _id: usernameId },
			{ $push: { thoughts: newThought._id } },
			{ new: true }
		);

		if (!updateUser) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.json(newThought);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Route updates a thought by thoughtID
router.put("/:thoughtId", async (req, res) => {
	try {
		const updatedThought = await Thought.findByIdAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		);

		if (!updatedThought) {
			return res.status(404).json({ message: "No thought found with this ID" });
		}
		return res.json(updatedThought);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Route deletes thought by ID
router.delete("/:thoughtId", async (req, res) => {
	try {
		const deletedThought = await Thought.findByIdAndDelete({
			_id: req.params.thoughtId,
		});

		if (!deletedThought) {
			return res.status(404).json({ message: "No thought found with this ID" });
		}

		const updateUser = await User.findOneAndUpdate(
			{ username: deletedThought.username },
			{ $pull: { thoughts: deletedThought._id } },
			{ new: true }
		);

		if (!updateUser) {
			return res.status(404).json({ message: "No user found with this ID" });
		}
		res.json(deletedThought);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route adds a reaction to a thought
router.post("/:thoughtId/reactions", async (req, res) => {
	try {
		const { thoughtId } = req.params;
		const { reactionBody, username } = req.body;

		const newReaction = { reactionBody, username };

		const updatedThought = await Thought.findOneAndUpdate(
			{ _id: thoughtId },
			{ $push: { reactions: newReaction } },
			{ new: true }
		);

		if (!updatedThought) {
			return res.status(404).json({ message: "No thought with this ID" });
		}

		return res.json(updatedThought);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Route deletes reaction by ID
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
	try {
		const { thoughtId, reactionId } = req.params;

		const updatedThought = await Thought.findOneAndUpdate(
			{ _id: thoughtId },
			{ $pull: { reactions: { _id: reactionId } } },
			{ new: true }
		);

		if (!updatedThought) {
			return res.status(404).json({ message: "No thought with this ID" });
		}

		return res.json(updatedThought);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

module.exports = router;
