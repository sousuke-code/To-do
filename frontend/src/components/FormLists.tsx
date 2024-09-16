import axios from 'axios';

const API_URL = "https://to-do-5jar.onrender.com/";

type TodoType = {
  id: number;
  todo: string;
  status: string;
};

type FormListsProps = {
  todos : TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const FormLists  = ({ todos , setTodos }: FormListsProps) => {


  const handleChange = async ( id: number, currentStatus: string ) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) =>todo.id === id);

    if (!todo) return;
    todo.status = currentStatus === "complete" ? "incomplete" : "complete";
    setTodos(newTodos);

    try {
      await axios.post(`${API_URL}/update-status`, {
        id,
        status: todo.status,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
     {todos.map( todo => (
      <div  className='bg-white rounded p-2 k text-lg border border-gray-200' key={todo.id}>
        <input type="checkbox" 
      checked = {todo.status === "complete"} onChange={()=>handleChange(todo.id, todo.status)}
      />{todo.todo}</div>
     ))}
    </>
  )
}

export default FormLists
