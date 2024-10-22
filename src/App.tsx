import { useState } from 'react'
import './App.css'

interface TodoItem {
  id: string,
  text: string,
  done: boolean
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)

  const addTask = (): void => {
    
    // Tendo algum conteúdo no campo, segue com a criação da tarefa.
    if(newTodo !== "") {
      const newId = crypto.randomUUID()

      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        done: false
      }

      // Salvando no array de tarefas.
      setTodos([...todos, newTodoItem])
      // Limpando o campo de entrada.
      setNewTodo("")
    }
  }

  const markTask = (id: string): void => {
    const updateTodos = todos.map((todo) => {
      if(todo.id === id) {
        return {...todo, done: !todo.done}
      }

      return todo
    })

    setTodos(updateTodos)
  }

  const removeTask = (id: string): void => {
    const updateTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updateTodos)
  }

  const getDoneTasks = (): TodoItem[] => {
    return todos.filter((todo) => todo.done)
  }

  return (
    <div className='app'>
      <div className='container'>
        <h1>Lista de Tarefas - {getDoneTasks().length} / {todos.length}</h1>

        <div className='input-container'>
          <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
          <button onClick={addTask}>Adicionar tarefa</button>
        </div>

        <ol>
          {
            todos.map((todo) => (
              <li key={todo.id}>
                <input type="checkbox" checked= {todo.done} onChange={() => markTask(todo.id)}/>

                <span style={{textDecoration: todo.done ? 'line-through' : 'none'}}>
                  {todo.text}
                </span>

                <button onClick={() => removeTask(todo.id)}>REMOVER</button>
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

export default App
