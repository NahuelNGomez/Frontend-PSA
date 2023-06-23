import { useEffect, useState } from "react"
import Breadcrumbs from "../../components/Breadcrumbs"
import ProjectModal from "../../components/ProjectModal"
import RecursosTable from "../../components/Recursos/RecursosTable"


export default function Recursos() {

    const breadcrumbItems = [
        {
            title: 'Recursos',
            url: '/recursos'
        }
    ]

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("https://rrhh-squad6-1c2023.onrender.com/recursos")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItems(data)
            })
      }, [])

    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />
                
                <h3 className="fw-light mb-4">Listado de Recursos</h3>
                <h5 className="bd-callout bd-callout-light fw-light mb-8">Seleccione “Gestionar” en un recurso para cargar horas trabajadas, o para ver su reporte.</h5>
                
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Buscar..." aria-label="Buscar..." aria-describedby="search" />
                            <button className="btn btn-dark" type="button" id="search">
                                <i className="bi bi-search"></i> Buscar recurso
                            </button>
                        </div>
                    </div>
                    
                </div>

                <RecursosTable
                items={items}
                />

            </div>

            <ProjectModal />
        </section>
    )
}