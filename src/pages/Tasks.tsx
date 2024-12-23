import { useEffect, useState } from "react"

// THEME
import { useTheme } from "../ThemeContext"

// COMPONENTS
import { Navbar } from "../components"

interface TodoItem {
    id: string,
    text: string,
    done: boolean
}

function Tasks() {
    const memoryTasksKey = "tasks"

    const { theme, toggleTheme } = useTheme()
    const [todos, setTodos] = useState<TodoItem[]>([])
    const [newTodo, setNewTodo] = useState<string>("")
    const [isLoaded, setIsLoaded] = useState(false)

    const addTask = (): void => {

        // Tendo algum conteúdo no campo, segue com a criação da tarefa.
        if (newTodo !== "") {
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
            if (todo.id === id) {
                return { ...todo, done: !todo.done }
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

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(memoryTasksKey, JSON.stringify(todos))
        }
    }, [todos, isLoaded])

    useEffect(() => {
        const memoryTasks = localStorage.getItem(memoryTasksKey)

        if (memoryTasks) {
            setTodos(JSON.parse(memoryTasks))
        }

        setIsLoaded(true)
    }, [])

    return (
        <div className={`app ${theme}`}>

            <Navbar />

            <div className={`container ${theme}`}>

                <h1>Lista de Tarefas - {getDoneTasks().length} / {todos.length}</h1>

                <div className='input-container'>
                    <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                    <button onClick={addTask}>Adicionar tarefa</button>
                </div>

                <ol>
                    {
                        todos.map((todo) => (
                            <li key={todo.id}>
                                <input type="checkbox" checked={todo.done} onChange={() => markTask(todo.id)} />

                                <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                                    {todo.text}
                                </span>

                                <button onClick={() => removeTask(todo.id)}>REMOVER</button>
                            </li>
                        ))
                    }
                </ol>

                <button onClick={toggleTheme}>
                    Alterar para o tema {theme === "dark" ? "claro." : "escuro."}
                </button>
            </div>
        </div>
    )
}

export default Tasks