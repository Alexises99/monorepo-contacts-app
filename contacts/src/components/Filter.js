
export const Filter = ({ search, setNewSearch }) => {
  return (
    <div>
      <h3>Filter</h3>
      filter shown with
      <input onChange={(event) => setNewSearch(event.target.value)} value={search} />
    </div>
  )
}
