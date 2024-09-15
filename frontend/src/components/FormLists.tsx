import React from 'react'

const FormLists = ({ todos }) => {
  return (
    <div>
     {todos.map( todo => (
      <li key={todo.id} className='text-lg '>○{todo.todo}</li>
     ))}
    </div>
  )
}

export default FormLists
