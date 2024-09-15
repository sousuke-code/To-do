import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./components/FormInput";
import FormLists from "./components/FormLists";

type TodoType = {
  id: number;
  todo: string;
  done:false;
};

type AddTodoType = {
  todo: string;
};

export default function Home() {
  const  [todos, setTodos] = useState<TodoType[]>([]);


  const addTodo = async (data: AddTodoType) => {
    const { todo } = data;
    await axios
    .post("http://localhost:8000/add", { todo })
    .then((response) => {
      const newTodo = response.data;
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const Clickhandler = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.done != !todo?.done;
    setTodos(newTodos);
  }

  
  useEffect(() =>{
    axios
     .get("http://localhost:8000")
     .then((response) => {
       const { todos } = response.data;
      console.log(response.data.todos);
      setTodos(todos);
     })
  }, []);

  return(
    <div className="bg-gray-200 m-40 broder border-white-200 rounded shadow p-20 ">
      <h1 className="flex justify-center text-3xl font-bold mb-10">TodList</h1>
     <FormInput todos={todos} setTodos = {setTodos}/>

     <FormLists todos = {todos} clickhandler= {Clickhandler}/>
    </div>
  );
}
