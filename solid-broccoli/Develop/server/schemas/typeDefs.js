const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Book {
        bookId: ID!
        description: String
        title: String!
        authors: [String]
        image: String
        link: String
    }

    type BookData {
        bookId: String!
        description: String!
        title: String!
        authors: [String]
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User     
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        signup(email: String!, password: String!, username: String!): Auth
        favoriteBook(bookId: String!,
            description: String!,
            title: String!,
            authors: [String],
            image: String,
            link: String): User
        deleteBook(bookId: ID!): User 
    }
`

module.exports = typeDefs