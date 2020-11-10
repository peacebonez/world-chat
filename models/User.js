const {model, Schema} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true}
})

UserSchema.plugin(require('passport-local-mongoose'))

module.exports = model('user', UserSchema)