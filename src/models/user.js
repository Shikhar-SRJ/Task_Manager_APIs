const mongoose =  require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Use a valid email address!')
            }
        }
    },
    password : {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("You cannot use 'password' in password")
            }
        }
    },
    avatar : {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

// setting up the relationship bw user and tasks
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner' 
})


// for limiting the data we return to a specific user
userSchema.methods.toJSON = function () {
    const userObject = this.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// for generating the auth token for a specific user
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id:this.id.toString()}, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

// to find a user by email and check in records
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('No user exists with this email id!')
    }

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
        throw new Error('Incorrect Password!')
    }
    return user
}

// Hash the plain text password
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next() 
})

// delete user tasks with the user
userSchema.pre('remove', async function(next) {
    await Task.deleteMany( {owner: this._id} )
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User