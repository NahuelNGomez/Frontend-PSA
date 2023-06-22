import { useRouter } from "next/router"
import Breadcrumbs from "../../../components/Breadcrumbs"
import TicketsTable from "../../../components/TicketsTable"
import TicketModal from "../../../components/TaskModal"
import { useEffect, useState } from "react"

export default function Tickets() {
    const router = useRouter()
    const version_id = router.query.id;


    

    interface Version {
        idVersion: number;
        CodigoVersion: string;
        CodigoProducto: 0;
        NombreProducto: string;
        Estado: string;
      }
      
      const [version, setVersion] = useState<Version>();
    type Ticket = {
        id: number;
        Nombre: string;
        Descripcion: string;
        Escenario: string;
        Estado: string;
        Severidad: string;
        idVersion: number;
        nombreProducto: string;
        CUIT: string;
      };
      
    const [items, setItems] = useState<Ticket[]>([]);

    useEffect(() => {
        fetch("https://apisoporte.onrender.com/versiones/"+ version_id + "/tickets" )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItems(data)
            })
        fetch("https://apisoporte.onrender.com/versiones/"+ version_id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setVersion(data)
            })    
      }, [])
      
      const breadcrumbItems = [
        {
            title: 'Soporte',
            url: '/soporte'
        },
        {
            title: version?.NombreProducto,
            url: '/soporte'
        },
        {
            title: 'Tickets',
            url: '/soporte/' + version_id + '/tickets'
        }
    ]
    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />
                
                <h3 className="fw-light">Listado de tickets</h3>
                <div className="modal-body">
                <tbody>
                    <tr>
                    <h5 className="fw-light">Version: {version?.CodigoVersion ? version.CodigoVersion : "Cargando..."}</h5>
                    <h5 className="fw-light">Nombre De producto: {version?.NombreProducto ? version.NombreProducto : "Cargando..."}</h5>
                    </tr>

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
