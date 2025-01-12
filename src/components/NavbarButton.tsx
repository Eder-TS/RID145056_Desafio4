import { Link } from 'react-router-dom'

// THEME
import { useTheme } from '../contexts/ThemeContext'

// TYPES
import { NavbarButtonProps } from "../types"

export function NavbarButton(props: NavbarButtonProps) {
    const { href, linkText, isActive } = props

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { theme, toggleTheme } = useTheme()

    return (
        <Link
            className={`button ${theme} ${isActive}`}
            to={href}
        >
            {linkText}
        </Link>
    )
}