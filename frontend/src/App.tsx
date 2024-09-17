import axios from "axios";
import { useEffect, useState } from "react";
import FormInput from "./components/FormInput";
import './src/index.css';
import FormLists from "./components/FormLists";

const API_URL = "https://to-do-5jar.onrender.com/";
type TodoType = {
  id: number;
  todo: string;
  status: string;
};


const App  = () => {
  const  [todos, setTodos] = useState<TodoType[]>([]);
  
  useEffect(() =>{
    axios
     .get(`${API_URL}`)
     .then((response) => {
       const { todos } = response.data;
      console.log(response.data.todos);
      setTodos(todos);
     })
  }, []);

  return(
    <div className="bg-gray-200 m-40 broder border-white-200 rounded shadow p-20 ">
      <h1 className="flex justify-center text-3xl font-bold mb-10">TodList</h1>
     <FormInput setTodos = {setTodos}/>

     <FormLists todos = {todos} setTodos = {setTodos} />
    </div>
  );
}

export default App;