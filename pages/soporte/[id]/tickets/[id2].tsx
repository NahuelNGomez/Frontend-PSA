import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import ProductsTable from "../../../../components/ProductsTable"
import ProjectModal from "../../../../components/ProjectModal"
import { version } from "os"
import TareasAsignadasTable from "../../../../components/TareasAsignadasTable"

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

    //const[recurso, setRecurso] = useState<any>();

    const[tareasAsignadas, setTareasAsignadas] = useState([]);

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
        fetch("https://apisoporte.onrender.com/tareasAsignadas/"+ ticketID)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setTareasAsignadas(data)
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
                </div>
                <div className="row">
                    <div className="col-6 m-auto">
                        <h3 className="fw-normal">Ticket {ticket?.id} - {ticket?.Nombre}</h3>
                        <div className="modal-body">
                        <tbody>
                            <tr>
                            <h5 className="fw-light">{version?.NombreProducto ? version.NombreProducto : "Cargando..."} - Version {version?.CodigoVersion ? version.CodigoVersion : "Cargando..."}</h5>
                            </tr>
                        </tbody>
                        </div>
                    </div>

                    <div className="col-2 m-auto">
                        <p className="bd-callout bd-callout-light fw-light mb-8">
                            <span className="estado"><b>Severidad:</b> {ticket?.Severidad}</span><br />
                            <span className="severidad"><b>Estado:</b> {ticket?.Estado}</span>
                        </p>
                    </div>
                    <div className="col-2 mx-auto">
                        <p className="bd-callout bd-callout-light fw-light mb-8"><b>Recurso:</b> {ticket?.RecursoAsignado}.</p>
                    </div>
                    <div className="col-2 my-4">
                        <button className="btn btn-outline-secondary " type="button" id="search">
                                    <i className="bi bi-search"></i> Editar Ticket
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <p className="bd-callout bd-callout-light fw-light mb-8"><b>Descripcion:</b> {ticket?.Descripcion ? ticket.Descripcion : "Cargando..."}.</p>
                    </div>
                    <div className="col-6">
                        <p className="bd-callout bd-callout-light fw-light mb-8"><b>Escenario:</b> {ticket?.Escenario}.</p>
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
                    <div className="col-md-2">
                        <button className="btn btn-outline-secondary " type="button" id="search">
                            <i className="bi bi-search"></i> Asignar Tarea
                        </button>
                    </div>
                </div>
                <TareasAsignadasTable items={tareasAsignadas}/>
        </section>
    )
}

export default Ticket;
