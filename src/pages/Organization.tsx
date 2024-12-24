import { useEffect, useState } from "react"

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
    const memoryOrganizationKey = "organizations"
    const selectedOrganizationKey = 'selectedOrganization'

    const { theme, toggleTheme } = useTheme()
    const [organizations, setOrganizations] = useState<OrganizationItem[]>([])
    const [newOrganization, setNewOrganization] = useState<string>("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedOrganization, setSelectedOrganization] = useState('')

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
            // Atualizando contexto
            setSelectedOrganization(newOrganizationItem.name)
        }
    }

    // Prepara o nome da organização selecionada
    const selectOrganization = (name: string): void => {
        setSelectedOrganization(name)
    }

    const removeOrganization = (id: string): void => {
        const updateOrganizations = organizations.filter((organization) => organization.id !== id)
        setOrganizations(updateOrganizations)
    }

    // Carrega o array de organizações na memória após
    // a memória ser conferida na renderização da página ou
    // o array ser atualizado.
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(memoryOrganizationKey, JSON.stringify(organizations))
        }
    }, [organizations, isLoaded])

    // Na primeira renderização confere a memória local se
    // há alguma organização e carrega o array.
    useEffect(() => {
        const memoryOrganization = localStorage.getItem(memoryOrganizationKey)

        if (memoryOrganization) {
            setOrganizations(JSON.parse(memoryOrganization))
        }

        setIsLoaded(true)
    }, [])

    // Guarda na memória o nome da organização selecionada.
    useEffect(() => {
        if (selectedOrganization) {
            localStorage.setItem(selectedOrganizationKey, JSON.stringify(selectedOrganization))
        }
    }, [selectedOrganization])

    useEffect(() => {
        const memorySelectedOrganization = localStorage.getItem(selectedOrganization)
        if (memorySelectedOrganization) {
            setSelectedOrganization(memorySelectedOrganization)
        }
    }, [])

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
                                <input
                                    type="radio"
                                    name='organization'
                                    checked={selectedOrganization === organization.name ? true : false}
                                    onChange={() => selectOrganization(organization.name)}
                                />

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