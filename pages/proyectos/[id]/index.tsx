import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Breadcrumbs from "../../../components/Breadcrumbs"
import TasksTable from "../../../components/Projects/TasksTable"
import TaskModal from "../../../components/Projects/TaskModal"
import EditProjectModal from "../../../components/Projects/EditProjectModal"
import AlertStatusModal from "../../../components/Projects/AlertStatusModal"

function formatDate(timestamp: string){
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export default function Proyecto() {
    const router = useRouter()

    const [item, setItem] = useState<any>(null)
    const [version, setVersion] = useState<any>(null)
    const [resources, setResources] = useState([])
    const [breadcrumbItems, setBreadcrumbItems] = useState<Array<{ title: string; url: string; }>>([]);
    const [tasks, setTasks] = useState<any>([])
    var [searchText, setSearchText] = useState('')
    var resource : any = {
        legajo: '',
        Nombre: '',
        Apellido: ''
    };

    useEffect(() => {
        if(router.query.id){
            fetch("https://api-proyectos.onrender.com/projects/" + router.query.id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItem(data)
                
                fetch("https://apisoporte.onrender.com/versiones/" + data.version_id)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setVersion(data)
                })

                const breadcrumb = [
                    {
                        title: 'Proyectos',
                        url: '/proyectos'
                    },
                    {
                        title: data.name,
                        url: '/proyectos/' + data.id
                    }
                ];
                setBreadcrumbItems(breadcrumb);
            })

            fetch("https://api-proyectos.onrender.com/projects/" + router.query.id + "/tasks")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setTasks(data)
            })

            fetch("https://rrhh-squad6-1c2023.onrender.com/recursos")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setResources(data)
            })
        }
    }, [router.query.id])

    const searchForm = async () => {
        fetch("https://api-proyectos.onrender.com/projects/tasks/search?title=" + encodeURIComponent(searchText))
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setTasks(data)
        })
    }

    const handleStatusSubmit = async(event : any) => {
        event.preventDefault()
        fetch('https://api-proyectos.onrender.com/projects/' + router.query.id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                status: event.target.value
            })
        }).then((response) => {
            if(response.ok) location.reload();
            $('#alertStatusModal').modal('show');
        })
        .catch((error) => {
            console.error('Error al cargar el proyecto:', error);
        })
    }

    if(item == null || version == null || resources == null){
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

    resource = resources.find((r: any) => r.legajo == item.responsible_id);
    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />
                
                <div className="d-md-flex flex-md-row-reverse align-items-center justify-content-between">
                    <div className="mb-3 mb-md-0 d-flex text-nowrap">
                        <select id="status" name="status" className="form-select mx-1" onChange={(e) => handleStatusSubmit(e)} value={item.status || ''} disabled={item.status == 'finished'}>
                            <option value="starting">Inicio</option>
                            <option value="developing">En desarrollo</option>
                            <option value="implementation">En implementación</option>
                            <option value="finished">Finalizado</option>
                        </select>
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#editProjectModal">Editar proyecto</button>
                    </div>
                    <div>
                        <h3 className="fw-light">#{router.query.id} {item.name}</h3>
                        <h6 className="fw-light">{version.NombreProducto} - v{version.CodigoVersion}</h6>
                    </div>
                </div>

                <div className="row my-4">
                    <div className="col-md-6 mb-2">
                        Descripción: <div className="bd-callout bd-callout-light my-2">{item.description}</div>
                    </div>
                    <div className="col-md-6 mb-2">
                        Detalles: 
                        <div className="bd-callout bd-callout-light my-2">
                            Responsable: {resource.Nombre + ' ' + resource.Apellido}<br />
                            {item.hours_worked} horas trabajadas ({tasks.length} tareas)<br />
                            Inicio: {formatDate(item.start_date)} | Fin: {formatDate(item.end_date)}
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="input-group">
                            <input type="text" className="form-control" id="search" name="search" placeholder="Buscar..." aria-label="Buscar..." aria-describedby="searchButton" onChange={(e) => setSearchText(e.target.value)} />
                            <button className="btn btn-dark" type="button" id="searchButton" onClick={searchForm}>
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

                <TasksTable items={tasks} resources={resources} />
            </div>

            <TaskModal projectId={router.query.id} type={1} idTicket={null} resources={resources} />
            <EditProjectModal item={item} projectId={router.query.id} />
            <AlertStatusModal />
        </section>
    )
}
