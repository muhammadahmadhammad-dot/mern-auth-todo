import { useEffect, useState } from "react";
import { TextInput } from "./components/Auth/TextInput";
import { toast } from "react-toastify";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const sending = await fetch("http://localhost:3000/api/store-todo", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      });
      if (!sending.ok) {
        toast.error("Something wrong!");
        return;
      }
      const data = await sending.json()
      if (data.todo) {
        setTodos((prev) => [...(prev || []), data.todo]); 
      }

      
      setTodo("");
      toast.success("Todo created successfully");
    } catch (error) {
      console.log("error : ", error);
    }
  };
  async function fetchData() {
    try {
      const sending = await fetch("http://localhost:3000/api/all-todos", {
        method: "GET",
        credentials: "include",
      });
      if (!sending.ok) {
        console.log("Something wrong!", sending);
        return;
      }
      const data = await sending.json();
      if (!data || !Array.isArray(data.todos)) {
        setTodos([]); 
      } else {
        setTodos(data.todos);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }
  const handelChecked = async (id)=>{
    const sending = await fetch("http://localhost:3000/api/todo-complete/"+id, {
      method: "POST",
      credentials: "include",
    });
    if (!sending.ok) {
      toast.error("Something wrong!");
      return;
    }
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );

  }
  const deleteTodo = async (id)=>{
    const sending = await fetch("http://localhost:3000/api/todo-delete/"+id, {
      method: "POST",
      credentials: "include",
    });
    if (!sending.ok) {
      toast.error("Something wrong!");
      return;
    }
    setTodos((prevTodos) =>
      prevTodos.filter((todo) =>
        todo._id !== id 
      )
    );
    toast.success("Todo Delete Successfully")
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-9/12 mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Your Todos
        </h5>
        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <form onSubmit={handelSubmit}>
            <TextInput
              label="Todo"
              name="todo"
              onChanage={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button
              type="submit"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="w-9/12 mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        { todos.length  > 0 ? (
         todos.map((item)=>
           <div key={item._id} className=" flex border-b-2 mb-2 items-center justify-between font-normal text-gray-700 dark:text-gray-400">
         <div className="flex items-center">
           <input
             id="checked-checkbox"
             type="checkbox"
             onChange={()=>(handelChecked(item._id))}
             checked={item.isComplete}
             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
           />
           <label
             htmlFor="checked-checkbox"
             className={`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300  ${item.isComplete ? 'line-through' : '' }`}
           >
              { item.todo }
           </label>
         </div>
         <button
           type="button"
           onClick={()=>deleteTodo(item._id)}
           className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
         >
           Delete
         </button>
       </div>
        )):(<p className="text-red-400">NO FOUND!</p>)
          }
        
      </div>
    </>
  );
}

export default App;
