import axios from 'axios';
import { useForm } from 'react-hook-form';

const API_URL = "https://to-do-5jar.onrender.com/";

type TodoType = {
  id: number;
  todo: string;
  status: string;
};

type AddTodo = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

type AddTodoType = {
  todo: string;
};

const FormInput = ({ setTodos} : AddTodo ) => {
  const {register, handleSubmit, reset } = useForm<AddTodoType>();

  const addTodo = async (data: AddTodoType) => {
    const { todo } = data;
    const status = "incomplete";
    await axios
    .post(`${API_URL}add`, { todo,status })
    .then((response) => {
      const newTodo = response.data;
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    })
    .catch((error) => {
      console.log(error);
    });

    reset();
  }
  return (


    <>
         <form className="max-w-md mx-auto mb-2" onSubmit={handleSubmit(addTodo)}>   
         
         <div className="relative">
             <input  {...register("todo")} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Todoを入力" required />
             <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">追加する</button>
         </div>
     </form>
      
    </>
  )
}

export default FormInput
