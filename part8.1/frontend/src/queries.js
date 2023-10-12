import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query Query($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
    id
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int! , $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const FAVORITE_GENRE = gql` {
    me {
        favoriteGenre
    }
}`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

export const EDIT_AUTHOR = gql`
mutation Mutation($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name
    born
  }
}
`