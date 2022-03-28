const { Schema, model } = require('mongoose');

// Create Schema for User
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

// Create a Virtual called 'friendCount' that retrieves the length of the user's 'friends' array field on query.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema)

module.exports = User