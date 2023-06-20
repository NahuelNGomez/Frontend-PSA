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

    //const [items, setItems] = useState([])
    type Ticket = {
        id: number;
        Nombre: string;
        Descripcion: string;
        Escenario: string;
        Estado: string;
        Severidad: string;
        idVersion: number;
        CUIT: string;
      };
      
      const [items, setItems] = useState<Ticket[]>([]);

    useEffect(() => {
        fetch("https://apisoporte.onrender.com/productos/"+ product_id + "/tickets" )
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
                <div className="modal-body">
                <tbody>
                {items.length > 0 && (
                    <tr key={items[0].id}>
                        <td>
                            ID version: {items[0].idVersion}
                            <br />
                            <span> Nombre Producto: {items[0].Nombre}</span>
                        </td>
                    </tr>
                )}
        </tbody>
                    </div>

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
