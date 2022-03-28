const { User } = require('../models');

const userController = {
    // the functions will go in here as methods
    // GET ALL USERS
    getAllUsers(req, res) {
        User.find({})
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err))
    },

    // GET USER BY ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({ path: 'friends', select: '-__v' })
        .populate({ path: 'thoughts', select: '-__v', populate: { path: 'reactions' }})
        .select('-__v')
        .then(dbUserData => dbUserData ? res.json(dbUserData) : res.status(404).json({ message: user404Message(params.id) }))
        .catch(err => res.status(404).json(err))
    },

    
};

module.exports = userController;