import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks  {
    genres
    title
    author {
      name
      born
    }
    published
    id
  }
}
`

export const ALL_BOOKS_BY_GENRE = gql`
query allBooksByGenre($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
      born
    }
    published
    id
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`

export const FAVORITE_GENRE = gql`
query {
  me {
    favoriteGenre
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: AuthorInput!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    id
    title
    author {
      id
      bookCount
      name
      born
    }
    published
    genres
  }
}
`

export const SET_BORN_TO = gql`
mutation setBornTo($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ) {
    id
    name
    born
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        id
        bookCount
        name
        born
      }
      published
      genres
    }
  }
`