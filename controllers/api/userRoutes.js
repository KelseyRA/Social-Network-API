const router = require("express").Router();
const { ObjectId } = require("mongoose").Types;
const { User, Thought, reactionSchema } = require("../../models");

// Route gets all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find(req.body);
		return res.json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Route gets a user by their ID
router.get("/:usernameId", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.usernameId });
		// .select('-__v');

		if (!user) {
			return res.status(404).json({ message: "No user with this ID" });
		}

		return res.json({
			user,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Route creates a new user
router.post("/", async (req, res) => {
	try {
		const newUser = await User.create(req.body);
		return res.json(newUser);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// Route updates a user
router.put("/:usernameId", async (req, res) => {
	try {
		const updateUser = await User.findByIdAndUpdate(
			{ _id: req.params.usernameId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		);

		if (!updateUser) {
			return res
				.status(404)
				.json({ message: "No username found with this ID" });
		}

		res.json(updateUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route deletes user by ID
router.delete("/:usernameId", async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete({
			_id: req.params.usernameId,
		});

		if (!deletedUser) {
			return res.status(404).json({ message: "No user found with this ID" });
		}
		res.json(deletedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route adds a new friend to a user
router.post("/:usernameId/friends/:friendId", async (req, res) => {
	try {
		await User.findByIdAndUpdate(
			{ _id: req.params.usernameId },
			{
				$addToSet: { friends: req.params.friendId },
			}
		);
		return res.json({ message: "Friend added" });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

router.delete("/:usernameId/friends/:friendId", async (req, res) => {
	try {
		await User.findOneAndUpdate(
			{ _id: req.params.usernameId },
			{
				$pull: { friends: req.params.friendId },
				new: true,
			}
		);
		res.status(200).json({ message: "Friend removed" });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
