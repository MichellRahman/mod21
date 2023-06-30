import { gql } from "@apollo/client";

export const Get_User = gql`
query Me {
    me {
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
  }`

  