import React from 'react'

const BooksDisplay = (props) => {
  return (
    <div>
      <h2>{props.recommend ? 'recommendations' : 'books'}</h2>

      <div>{props.recommend ? 'books in your favorite genre' : 'in genre'} <b>{props.genre}</b></div>

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
          {props.books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {!props.recommend &&
        <div>
          {props.genres.map(g =>
            <button key={g} onClick={() => props.setGenre(g)}>{g}</button>)}
        </div>}
    </div>
  )
}

export default BooksDisplay