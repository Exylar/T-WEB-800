import React, { useEffect, useState } from "react";
import Nav from "./_nav";
import usePlanId from "hooks/usePlanId";
import useUser from "contexts/user";

import { CheckSquare, PlusCircle, Square, Trash } from "react-feather";
import Spinner from "components/Spinner";
import TextInput from "components/Form/TextInput";
import { useHistory } from "react-router-dom";
import useFirebaseTodo from "hooks/useTodo";

const TripTodo = () => {
  const [loading, setLoading] = useState(true);
  const planId = usePlanId();
  const [todoTitle, setTodoTitle] = useState("");
  const history = useHistory();
  const [error, setError] = useState({});

  const { getTodo, addTodo, updateTodo, deleteTodo, todos } = useFirebaseTodo();

  const _onSubmit = () => {
    if (todoTitle.length === 0) {
      setError({ todoTitle: "Todo title is required" });
    } else {
      addTodo(todoTitle, planId);
    }
  }

  const _onTodoStatusChange = (todo, status) => {
    updateTodo(todo, status, planId);
  }

  const _onTodoDelete = (todo) => {
    deleteTodo(todo, planId);
  }

  useEffect(async () => {
    getTodo(planId);
    setLoading(false)      
  }, [planId])

  if (loading) return (
    <Nav className="flex items-center justify-center">
      <Spinner size="lg" />
    </Nav>
  )
  return (
    <Nav>
      <div className="flex flex-col">
        <div>
          {todos.length === 0 ?
            <div className="flex items-center justify-center mb-3 mt-5 font-semibold" >
              <span className="text-xl text-blue-600">Aucune tâche enregistrée</span>
            </div>
            : <>
              {todos.map(todo => (
                <div key={todo.uid} className="flex justify-between items-center rounded-lg bg-gray-100 p-3 mb-3">
                  <div className="flex items-center">
                    {todo.status === "done" ?
                      <CheckSquare size={22} color="#2563EB" className="cursor-pointer" onClick={() => _onTodoStatusChange(todo, "todo")} />
                      :
                      <Square size={22} color="#2563EB" className="cursor-pointer" onClick={() => _onTodoStatusChange(todo, "done")} />
                    }
                    <span className="ml-2 select-none">{todo.title}</span>
                  </div>
                  <div className="flex items-center" style={{ columnGap: 5 }}>
                    <Trash color="red" className="cursor-pointer" onClick={() => _onTodoDelete(todo)} size={22} />
                  </div>
                </div>
              ))}
            </>}
        </div>
        <div className="flex items-stretch mt-4">
          <TextInput value={todoTitle}
            onChange={setTodoTitle}
            error={error.title}
            placeholder="Todo..."
            onEnterPressed={_onSubmit}
            className="flex-1" />
          <span className="cursor-pointer bg-blue-600 h-9 ml-3 px-4 rounded text-white flex items-center justify-center hover:bg-blue-800" onClick={_onSubmit}>
            <PlusCircle className="cursor-pointer" />
          </span>
        </div>
      </div>
    </Nav>
  )
}

export default TripTodo;