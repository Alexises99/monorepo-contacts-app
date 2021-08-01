
export const Contact = ({ name, number, handleDelete }) => {
  return (
    <div>
      <span>
        Name:
      </span>
      {name}
      <span>
        Number:
      </span>
      {number}
      <button
        className='delete'
        onClick={handleDelete({ name, number })}
      >
        Delete
      </button>

    </div>
  )
}
