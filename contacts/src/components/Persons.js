import { Contact } from './Contact'

export const Persons = ({ persons, search, setPersons }) => {
  const handleDelete = ({ name, number }) => {
    const newPersons = persons.filter(person => person.name !== name && person.number !== number)
    return () => setPersons(newPersons)
  }

  return (
    <div>
      {persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((person, i) => <Contact key={i} name={person.name} number={person.number} handleDelete={handleDelete} />)}
    </div>
  )
}
