const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,    
    required: true,    
    unique: true,
    // validate: {
    //   validator: function(value) {
    //     return value.length >= 3;
    //   },
    //   message: 'username has to be at least 3 characters long'
    // }
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User