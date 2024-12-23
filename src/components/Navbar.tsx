// THEME
import { useTheme } from '../ThemeContext'

// COMPONENTS
import { NavbarButton } from './NavbarButton'

export const Navbar = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { theme, toggleTheme } = useTheme()

    return (
        <nav className={`navbar ${theme}`}>
            <NavbarButton
                href='/organization'
                linkText='Organização'
            />

            <NavbarButton
                href='/tarefas'
                linkText='Tarefas'
            />
        </nav>
    )
}