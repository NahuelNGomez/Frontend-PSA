import { useRouter } from "next/router"
import Breadcrumbs from "../../../components/Breadcrumbs"
import TicketsTable from "../../../components/TicketsTable"
import TicketModal from "../../../components/TaskModal"
import { useEffect, useState } from "react"

export default function Tickets() {
    const router = useRouter()
    const product_id = router.query.id;

    const breadcrumbItems = [
        {
            title: 'Soporte',
            url: '/soporte'
        },
        {
            title: 'NOMBRE_PRODUCTO', // Obtenerlo de API
            url: '/soporte'
        },
        {
            title: 'Tickets',
            url: '/soporte/' + product_id + '/tickets'
        }
    ]

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("https://apisoporte.onrender.com/tickets")
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
                
                <h3 className="fw-light">Listado de tickets</h3>
                <h6 className="fw-light mb-4">Nombre_PRODUCTO - Version Version_PRODUCTO</h6>

                <div className="row">
                    <div className="col-md-10">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Buscar..." aria-label="Buscar..." aria-describedby="search" />
                            <button className="btn btn-dark" type="button" id="search">
                                <i className="bi bi-search"></i> Buscar ticket
                            </button>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#ticketModal">Nuevo ticket</button>
                        </div>
                    </div>
                </div>

                <TicketsTable items={items} />
            </div>

            <TicketModal />
        </section>
    )
}
