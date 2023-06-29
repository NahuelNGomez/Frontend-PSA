import { useEffect, useState } from "react"
import Breadcrumbs from "../../components/Breadcrumbs"
import ProjectsTable from "../../components/Projects/ProjectsTable"
import ProjectModal from "../../components/Projects/ProjectModal"

export default function Proyectos() {

    const breadcrumbItems = [
        {
            title: 'Proyectos',
            url: '/proyectos'
        }
    ]

    const [items, setItems] = useState(null)
    var [searchText, setSearchText] = useState('')

    useEffect(() => {
        fetch("https://api-proyectos.onrender.com/projects")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setItems(data)
        })
    }, [])

    const searchForm = async () => {
        fetch("https://api-proyectos.onrender.com/projects/search?name=" + encodeURIComponent(searchText))
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setItems(data)
        })
    }

    if(items == null){
        return (<div className="container text-center">
            <div className="row align-items-center">
                <div className="col my-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>)
    }

    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />
                
                <h3 className="fw-light mb-4">Listado de Proyectos</h3>

                <div className="row">
                    <div className="col-md-10">
                        <div className="input-group">
                            <input type="text" className="form-control" id="search" name="search" placeholder="Buscar..." aria-label="Buscar..." aria-describedby="searchButton" onChange={(e) => setSearchText(e.target.value)} />
                            <button className="btn btn-dark" type="button" id="searchButton" onClick={searchForm}>
                                <i className="bi bi-search"></i> Buscar proyecto
                            </button>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#projectModal">Nuevo proyecto</button>
                        </div>
                    </div>
                </div>

                <ProjectsTable items={items} />

            </div>

            <ProjectModal />
        </section>
    )
}
