import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import ProductsTable from "../../../../components/ProductsTable"
import ProjectModal from "../../../../components/ProjectModal"
import { version } from "os"

const Ticket = () => {
    const router = useRouter()
    const versionID = router.query.id;
    const ticketID = router.query.id2;
    

    

    interface Version {
        idVersion: number;
        CodigoVersion: string;
        CodigoProducto: 0;
        NombreProducto: string;
        Estado: string;
      }
      
      const [version, setVersion] = useState<Version>();
    interface Ticket {
        id: number;
        FechaDeCreacion: String;
        Nombre: string;
        Descripcion: string;
        Escenario: string;
        Estado: string;
        Severidad: string;
        idVersion: number;
        CUIT: string;
        RecursoAsignado: number;
      };
      
    const [ticket, setTicket] = useState<Ticket>();

    useEffect(() => {
        fetch("https://apisoporte.onrender.com/tickets/" + ticketID)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setTicket(data)
            })
        fetch("https://apisoporte.onrender.com/versiones/"+ versionID)
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
            title: version?.NombreProducto + " " + version?.CodigoVersion,
            url: '/soporte'
        },
        {
            title: 'Tickets',
            url: '/soporte/' + version?.idVersion + '/tickets'
        },
        {
            title: 'ticket ' + ticket?.id,
            url: '/soporte/' + version?.idVersion + '/tickets/' + ticket?.id
        }
    ]

    return (
        <section className="row py-lg-12">
                <div className="col-lg-12">
                    <Breadcrumbs items={breadcrumbItems} />
                    <h3 className="fw-light">Ticket {ticket?.id} - {ticket?.Nombre}</h3>
                    <div className="modal-body">
                    <tbody>
                        <tr>
                        <h5 className="fw-light">{version?.NombreProducto ? version.NombreProducto : "Cargando..."} - Version {version?.CodigoVersion ? version.CodigoVersion : "Cargando..."}</h5>
                        </tr>

                    </tbody>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="bd-callout bd-callout-light fw-light mb-8">Descripcion: {ticket?.Descripcion ? ticket.Descripcion : "Cargando..."}.</p>
                    </div>
                    <div className="col">
                        <p className="bd-callout bd-callout-light fw-light mb-8">Escenario: {ticket?.Escenario}.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Buscar..." aria-label="Buscar..." aria-describedby="search" />
                            <button className="btn btn-dark" type="button" id="search">
                                <i className="bi bi-search"></i> Buscar
                            </button>
                        </div>
                    </div>
                </div>
               <p>TABLA TAREAS</p>
            </div>
        </section>
    )
}

export default Ticket;
