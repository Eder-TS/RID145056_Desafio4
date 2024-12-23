import { useEffect, useState } from 'react'
import './App.css'
import { useTheme } from './ThemeContext'

// PAGES
import Tasks from './pages/Tasks'
import Organization from './pages/Organization'




function App() {
  <>
    <Tasks />
    <Organization />
  </>
}

export default App
