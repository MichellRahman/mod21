const {User} = require('../models');
const { signToken } = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).select('-password')
                return user
            }
            throw new AuthenticationError('Please Login!')
        }
    }, 
    Mutation: {
        signup: async (parent, args) => {
            console.log('signup', args);
            const userExists = await User.findOne({email: args.email})
            if (userExists) {
                throw new AuthenticationError('An account with this email already exists! Please Login!')
            } 
            const newUser = await User.create(args)
            const token = signToken(newUser)
            return {token, newUser}
        },
        login: async (parent, args) => {
            const userExists = await User.findOne({email: args.email})
            if (!userExists) {
                throw new AuthenticationError("You don't have an account, please signup!")
            } 
            const passwordMatches = await userExists.isCorrectPassword(args.password)
            if (!passwordMatches) {
                throw new AuthenticationError("Incorrect password!")
            }
            const token = signToken(userExists)
            return {token, userExists}
        },
        favoriteBook: async (parent, args, context) => {
            if (context.user){
                const updatedUser = await User.findByIdAndUpdate(context.user._id, {
                    $addToSet: {
                        savedBooks: args
                    }, 
                    
                }, {new: true})
                return updatedUser
            }
            throw new AuthenticationError("You must be logged in to do that!")
        },
        deleteBook: async (parents, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(context.user._id, {
                    $pull: {
                        savedBooks: {bookId: args.bookId}
                    }, 
                    
                }, {new: true})
                return updatedUser
            }
            throw new AuthenticationError("You must be logged in to do that!")
        }
    }
}

module.exports = resolvers