// THEME
import { useTheme } from '../ThemeContext'

// COMPONENTS
import { NavbarButton } from './NavbarButton'

export const Navbar = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { theme, toggleTheme } = useTheme()
    const organization = ''
    const tasks = ''

    return (
        <nav className={`navbar ${theme}`}>
            <NavbarButton
                href='/organization'
                linkText='Organização'
                isActive={organization}
            />

            <NavbarButton
                href='/tarefas'
                linkText='Tarefas'
                isActive={tasks}
            />
        </nav>
    )
}