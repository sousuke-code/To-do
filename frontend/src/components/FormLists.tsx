import React from 'react'

const FormLists = ({ todos, clickhandler }) => {



  return (
    <>
     {todos.map( todo => (
      <div  className='bg-white rounded p-2 k text-lg border border-gray-200' key={todo.id}><input type="checkbox" onChange={()=> clickhandler(todo.id)} />{todo.todo}</div>
     ))}
    </>
  )
}

export default FormLists
