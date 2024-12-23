// THEME
import { useTheme } from '../ThemeContext'

// TYPES
import { NavbarButtonProps } from "../types"

export function NavbarButton(props: NavbarButtonProps) {
    const { href, linkText, isActive } = props

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { theme, toggleTheme } = useTheme()

    return (
        <a
            className={`button ${theme} ${isActive}`}
            href={href}
        >
            {linkText}
        </a>
    )
}