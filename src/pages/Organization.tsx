import { useState } from "react"

// THEME
import { useTheme } from "../ThemeContext"

// COMPONENTS
import { Navbar } from "../components"

interface OrganizationItem {
    id: string,
    name: string,
    done: boolean
}

function Organization() {
    const { theme, toggleTheme } = useTheme()
    const [organizations, setOrganizations] = useState<OrganizationItem[]>([])
    const [newOrganization, setNewOrganization] = useState<string>("")

    const addOrganization = (): void => {

        // Tendo algum conteúdo no campo, segue com a criação da organização.
        if (newOrganization !== "") {
            const newId = crypto.randomUUID()

            const newOrganizationItem: OrganizationItem = {
                id: newId,
                name: newOrganization,
                done: false
            }

            // Salvando no array de organizações.
            setOrganizations([...organizations, newOrganizationItem])
            // Limpando o campo de entrada.
            setNewOrganization("")
        }
    }

    const selectOrganization = (id: string): void => {
        const updateOrganizations = organizations.map((organization) => {
            if (organization.id === id) {
                return { ...organization, done: !organization.done }
            }

            return organization
        })

        setOrganizations(updateOrganizations)
    }

    const removeOrganization = (id: string): void => {
        const updateOrganizations = organizations.filter((organization) => organization.id !== id)
        setOrganizations(updateOrganizations)
    }

    return (
        <div className={`app ${theme}`}>

            <Navbar />

            <div className={`container ${theme}`}>

                <h1>Lista de Organizações</h1>

                <div className='input-container'>
                    <input type="text" value={newOrganization} onChange={(e) => setNewOrganization(e.target.value)} />
                    <button onClick={addOrganization}>Adicionar organização</button>
                </div>

                <ol>
                    {
                        organizations.map((organization) => (
                            <li key={organization.id}>
                                <input type="radio" checked={organization.done} onChange={() => selectOrganization(organization.id)} />

                                <span style={{ textDecoration: organization.done ? 'line-through' : 'none' }}>
                                    {organization.name}
                                </span>

                                <button onClick={() => removeOrganization(organization.id)}>REMOVER</button>
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

export default Organization