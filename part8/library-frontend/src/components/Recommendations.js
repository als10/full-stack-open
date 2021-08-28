import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE, FAVORITE_GENRE } from '../queries'
import BooksDisplay from './BooksDisplay'

const Recommendations = (props) => {
  const [genre, setGenre] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS_BY_GENRE)
  const resultGenre = useQuery(FAVORITE_GENRE)

  useEffect(() => {
    if (resultGenre.data && resultGenre.data.me) {
      const genre = resultGenre.data.me.favoriteGenre
      setGenre(genre)
      getBooks({ variables: { genre: genre } })
    }
  }, [resultGenre.data]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  if (resultGenre.loading || result.loading) return <div>loading...</div>

  const books = result.data.allBooks

  return (
    <BooksDisplay
      books={books}
      genre={genre}
      recommend={true} />
  )
}

export default Recommendations