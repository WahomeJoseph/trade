import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },

         email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            unique: true,
        },

         isAdmin: {
            type: Boolean,
            required: true,
         default: false
        },
    },
    {timestamps: true}
)

const Users = mongoose.model('User', userSchema)
export default Users
