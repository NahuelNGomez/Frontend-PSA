import { useRouter } from "next/router"
import Breadcrumbs from "../../components/Breadcrumbs"
import ProjectTable from "../../components/ProjectTable"
import TaskModal from "../../components/TaskModal"

export default function Proyecto() {
    const router = useRouter()

    const breadcrumbItems = [
        {
            title: 'Proyectos',
            url: '/proyectos'
        },
        {
            title: 'RappiYa',
            url: '/'
        }
    ]

    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />
                
                <h3 className="fw-light">Proyecto {router.query.id}</h3>
                <h6 className="fw-light">Version 2.0</h6>

                <div className="bd-callout bd-callout-light">
                    Desarrollar la nueva versión de la aplicación para iOS utilizando React Native y NodeJS.
                </div>

                <p>
                    <b>Detalles:</b> aqui van los detalles?.
                </p>

                <div className="row">
                    <div className="col-md-10">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Buscar..." aria-label="Buscar..." aria-describedby="search" />
                            <button className="btn btn-dark" type="button" id="search">
                                <i className="bi bi-search"></i> Buscar tarea
                            </button>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#taskModal">Nueva tarea</button>
                        </div>
                    </div>
                </div>

                <ProjectTable />
            </div>

            <TaskModal />
        </section>
    )
}
