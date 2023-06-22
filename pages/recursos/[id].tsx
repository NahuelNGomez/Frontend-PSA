import { useRouter } from "next/router"
import Breadcrumbs from "../../components/Breadcrumbs"
import TaskModal from "../../components/TaskModal"
import { useEffect, useState } from "react"
import TrabajadorTable from "../../components/TrabajadorTable"
import CargarHorasModal from "../../components/CargarHorasModal"
import ReporteHorasModal from "../../components/ReporteHorasModal"

export default function Recurso() {
    const router = useRouter()
    const legajo_recurso = router.query.id;

    const breadcrumbItems = [
        {
            title: 'Recursos',
            url: '/recursos'
        },
        {
            title: 'Gestion R' + legajo_recurso, // Obtenerlo de API
            url: '/soporte' + legajo_recurso
        }
    ]

    const [items, setItems] = useState([])
    // const items = [{
    //     legajo: "1",
    //     Nombre: "Mario",
    //     Apellido: "Mendoza"
    //     }]
    
    /*useEffect(() => {
        fetch("https://rrhh-squad6-1c2023.onrender.com/recursos/{(proyectos en los que aporto)}")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItems(data)
            })
      }, [])
    */

    useEffect(() => {
    fetch("https://rrhh-squad6-1c2023.onrender.com/recursos/"+ legajo_recurso )
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
                
                
                <div className="row">
                    <div className="col-md-10">
                        <h3 className="fw-light">Gestion R{legajo_recurso}</h3>


                    <div className="col-md-2">
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#cargarHorasModal">Cargar horas</button>
                            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#reporteHorasModal">Reporte de horas por proyecto</button>
                        </div>
                    </div>
                    </div>
                </div>

                <TrabajadorTable item={items}/>
            </div>

            <CargarHorasModal />
            <ReporteHorasModal />
        </section>
    )
}
