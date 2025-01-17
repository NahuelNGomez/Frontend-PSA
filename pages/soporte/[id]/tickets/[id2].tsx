import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import { version } from "os"
import TareasAsignadasTable from "../../../../components/Projects/TareasAsignadasTable"
import TaskModal from "../../../../components/Projects/TaskModal"
import AsignarTareaModal from "../../../../components/Projects/AsignarTareaModal"
import EditTicketModal from "../../../../components/Soporte/EditTicketModal"

const Ticket = () => {
    const router = useRouter()
    
    /*const versionID = router.query.id;
    const ticketID = router.query.id2;*/

    interface Version {
        idVersion: number;
        idProyecto: number;
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

    const[tareasAsignadas, setTareasAsignadas] = useState([]);
    const[tareasDisponibles, setTareasDisponibles] = useState([]);
    const[recursos, setRecursos] = useState([]);

    useEffect(() => {
        if(router.query.id != null || router.query.id2 != null){ 
            fetch("https://apisoporte.onrender.com/tickets/" + router.query.id2)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setTicket(data)
                })
            fetch("https://apisoporte.onrender.com/versiones/"+ router.query.id)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setVersion(data)
                })
            fetch("https://apisoporte.onrender.com/tareasAsignadas/"+ router.query.id2)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setTareasAsignadas(data)
                })
            fetch("https://rrhh-squad6-1c2023.onrender.com/recursos")
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setRecursos(data)
                })
        }
      }, [router.query.id, router.query.id2])
      const [condicion, setCondicion] = useState(false);

    useEffect(() => {
        if (version) {
        fetch("https://api-proyectos.onrender.com/projects/" + version?.idProyecto + "/tasks")
            .then((res) => {
            return res.json();
            })
            .then((data) => {
            setTareasDisponibles(data);
            });

        if (version?.idProyecto === null) {
            setCondicion(true); // Actualizar el estado de 'condicion'
        } else {
            setCondicion(false); // Actualizar el estado de 'condicion'
        }
        }
    }, [version]);

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

    if(version == null || ticket == null){
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
                </div>
                <div className="row">
                    <div className="col-6 m-auto">
                        <h3 className="fw-normal">Ticket {ticket?.id} - {ticket?.Nombre}</h3>
                        <div className="modal-body">
                            <h5 className="fw-light">{version?.NombreProducto ? version.NombreProducto : "Cargando..."} - Version {version?.CodigoVersion ? version.CodigoVersion : "Cargando..."}</h5>
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
                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#editTicketModal">Editar ticket</button>
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
                    <div className="col-md-8">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Buscar..." aria-label="Buscar..." aria-describedby="search" />
                            <button className="btn btn-dark" type="button" id="search">
                                <i className="bi bi-search"></i> Buscar
                            </button>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-outline-secondary " type="button" data-bs-toggle="modal" data-bs-target="#asignarTareaModal" disabled={condicion}> Asignar Tarea
                        </button>
                    </div>
                    <div className="col-md-2 ">
                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#taskModal" disabled={condicion}>Crear tarea</button>
                    </div>
                </div>
                <TareasAsignadasTable items={tareasAsignadas}/>
                {tareasDisponibles && (
                    <AsignarTareaModal tareasDisponibles={tareasDisponibles} idTicket={ticket?.id} />
                )}
                <EditTicketModal ticket={ticket} recursos={recursos}/> 
                <TaskModal projectId={version?.idProyecto} type={2} idTicket={ticket?.id} resources={recursos}/>
        </section>
    )
}

export default Ticket;