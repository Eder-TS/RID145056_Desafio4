import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

// PAGES
import Tasks from './pages/Tasks'
import Organization from './pages/Organization'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Organization />} />
        <Route path="/tarefas" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
