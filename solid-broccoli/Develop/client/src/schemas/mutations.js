import { gql } from "@apollo/client";

export const Signup = gql`
mutation Signup($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      token
      user {
        _id
        username
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
        bookCount
        email
      }
    }
  }` 

  export const Login = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        bookCount
        email
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
        username
      }
    }
  }`

  export const Favorite_Book = gql`
  mutation FavoriteBook($bookId: String!, $description: String!, $title: String!) {
    favoriteBook(bookId: $bookId, description: $description, title: $title) {
      _id
      username
      savedBooks {
        description
        title
        bookId
      }
    }
  }`

  export const Delete_Book = gql`
  mutation DeleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      bookCount
      savedBooks {
        bookId
        description
        title
      }
    }
  }`