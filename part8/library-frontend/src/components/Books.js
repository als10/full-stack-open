import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BooksDisplay from './BooksDisplay'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks
  const filteredBooks = genre === 'all genres'
    ? books
    : books.filter(b => b.genres.includes(genre))
  const uniqueGenres = books.reduce(
    (prev, curr) => prev.concat(
      curr.genres.filter(g => !prev.includes(g)) //only add genres that are not already present in the uniqueGenres list
    ), 
    []
  ).concat('all genres')

  return (
    <BooksDisplay
      books={filteredBooks}
      genres={uniqueGenres}
      genre={genre}
      setGenre={setGenre} />
  )
}

export default Books