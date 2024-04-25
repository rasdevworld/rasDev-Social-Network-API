const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user by _id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user by _id
  async updateUser(req, res) {
    try {
          const user = await User.findOneAndUpdate(
            { _id:  req.params.userId },
            { $set: req.body },
            { runValidators:  true, new: true }
          );
            if(!user){
              return res.status(404).json({
                message: 'No user with this id!'
              })
            }
            res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },
// delete a user by _id
async deleteUser(req, res) {
  try{
    const user = await User.findOneAndDelete(
      { _id: req.params.userId }
      )

    const thought = await Thought.findOneAndDelete(
     { username: req.body.username },
     { new: true }
     )
    if(!user) {
      return res.status(404).json({
        message: 'No user with this id!'
      })
    }
    //res.status(200).json(user)
    res.json({ message: 'User successfully deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
},
// add a friend to the user's friend list
async addUserFriend(req, res) {
  try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body.friendId } },
          { runValidators: true, new: true }
        );
        if(!user) {
          return res.status(404).json({
            message: 'No user with this id!'
          });
        }
        res.status(200).json(user)
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
},
// delete a friend from a user's friend list
async removeUserFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators:  true, new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
};
