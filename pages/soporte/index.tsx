import { useEffect, useState } from "react"
import Breadcrumbs from "../../components/Breadcrumbs"
import ProductsTable from "../../components/Projects/ProductsTable"
import ProjectModal from "../../components/Projects/ProjectModal"

export default function Soporte() {

    const breadcrumbItems = [
        {
            title: 'Soporte',
            url: '/soporte'
        }
    ]

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("https://apisoporte.onrender.com/versiones")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setItems(data)
        })
      }, [])

      if(!items.length){
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
                
                <h3 className="fw-light mb-4">Listado de productos y versiones</h3>

                <div className="row">
                    <div className="col-md-10">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Buscar..." aria-label="Buscar..." aria-describedby="search" />
                            <button className="btn btn-dark" type="button" id="search">
                                <i className="bi bi-search"></i> Buscar
                            </button>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button" data-bs-toggle="modal" disabled={true}>Ver mis tareas</button>
                            <button className="btn btn-primary" type="button" data-bs-toggle="modal" disabled={true}>Ver mis tickets</button>
                        </div>
                    </div>
                </div>

                <ProductsTable items={items} />
            </div>
            <ProjectModal />
        </section>
    )
}
