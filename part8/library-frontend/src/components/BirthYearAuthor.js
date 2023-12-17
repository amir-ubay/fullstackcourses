import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthYearAuthor = ({authors}) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS}]
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: parseInt(year) } })
    // setName('')
    setYear('')
  }

  return (
    <>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          {/* name <input type="text" value={name} onChange={(event) => setName(event.target.value)} /> */}
          <select name='author' value={name} onChange={(e) => setName(e.target.value)}>
        {authors.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
      </select>
        </div>
        <div>
          born <input type="number" value={year} onChange={({target}) => setYear(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default BirthYearAuthor