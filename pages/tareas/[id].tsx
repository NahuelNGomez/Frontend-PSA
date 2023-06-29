import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Breadcrumbs from "../../components/Breadcrumbs"
import EditTaskModal from "../../components/Projects/EditTaskModal"
import DeleteTaskModal from "../../components/Projects/DeleteTaskModal";

function formatDate(timestamp: string){
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export default function Tarea() {
    const router = useRouter()

    const [item, setItem] = useState<any>(null)
    const [breadcrumbItems, setBreadcrumbItems] = useState<Array<{ title: string; url: string; }>>([]);

    useEffect(() => {
        if(router.query.id){
            fetch("https://api-proyectos.onrender.com/projects/tasks/" + router.query.id)
            .then((res) => res.json())
            .then((data) => {
                setItem(data)

                const breadcrumb = [
                    {
                        title: 'Proyectos',
                        url: '/proyectos'
                    },
                    {
                        title: data.project.name,
                        url: '/proyectos/' + data.project.id
                    },
                    {
                        title: data.title,
                        url: '/tareas/' + router.query.id
                    }
                ];
                setBreadcrumbItems(breadcrumb);
            })
        }
    }, [router.query.id])

    const handleStatusSubmit = async(event : any) => {
        event.preventDefault()
        fetch('https://api-proyectos.onrender.com/projects/tasks/' + router.query.id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                status: event.target.value
            })
        }).then((response) => {
            if(response.ok) location.reload();
        })
        .catch((error) => {
            console.error('Error al cargar el proyecto:', error);
        })
    }

    if(item == null){
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

                <div className="d-md-flex flex-md-row-reverse align-items-center justify-content-between">
                    <div className="mb-3 mb-md-0 d-flex text-nowrap">
                        <select id="status" name="status" className="form-select mx-1" onChange={(e) => handleStatusSubmit(e)} value={item.status || ''} disabled={item.status == 'finished'}>
                            <option>Seleccionar estado</option>
                            <option value="pending">Pendiente</option>
                            <option value="working">En curso</option>
                            <option value="reviewing">En revisión</option>
                            <option value="finished">Finalizada</option>
                        </select>
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#editTaskModal">Editar tarea</button>
                    </div>
                    <div>
                        <span className="badge text-bg-dark ms-1">{item.task_type}</span>
                        <span className="badge text-bg-warning ms-1">{item.task_priority}</span>
                        <h3 className="fw-light mb-0">#{router.query.id} {item.title}</h3>
                        <h6 className="fw-light">{item.project.name}</h6>
                    </div>
                </div>

                <div className="row my-4">
                    <div className="col-md-12 mb-2">
                        Descripción: <div className="bd-callout bd-callout-light my-2">{item.description}</div>
                    </div>
                    <div className="col-md-12 mb-2">
                        Detalles: 
                        <div className="bd-callout bd-callout-light my-2">
                            Responsable: {item.employee_info.name + ' ' + item.employee_info.last_name}<br />
                            Fecha de inicio: {item.start_date == undefined ? '-' : formatDate(item.start_date)}<br />
                            {
                                item.end_date === undefined
                                ? ''
                                : <div dangerouslySetInnerHTML={{ __html: 'Fecha de finalización: ' + formatDate(item.end_date) + '<br />' }} />
                            }

                            Tiempo estimado: {item.estimated_time} horas<br />
                            Tiempo trabajado: {item.time_worked} horas<br />
                        </div>
                    </div>
                </div>
            </div>

            <EditTaskModal item={item} taskId={router.query.id} />

        </section>
    )
}

/*
<div>
    <button className="btn btn-danger btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteTaskModal">Borrar tarea</button>
</div>
<DeleteTaskModal taskId={item.id} redirectUrl={'/proyectos/' + item.project.id} />
 */