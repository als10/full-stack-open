import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

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
    <div>
      <h2>books</h2>

      <div>in genre <b>{genre}</b></div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map(g =>
          <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      </div>
    </div>
  )
}

export default Books