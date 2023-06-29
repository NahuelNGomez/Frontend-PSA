import { useEffect, useState } from "react"

export default function TaskModal({item, taskId} : any) {

    const task = item;
    var [employee_id, setEmployeeId] = useState(task.employee_id)
    const [notification, setNotification] = useState('')
    const [resources, setResources] = useState([])

    useEffect(() => {
        fetch("https://rrhh-squad6-1c2023.onrender.com/recursos")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setResources(data)
        })
    }, [])

    const handleSubmit = async(event : any) => {
        event.preventDefault()
        fetch('https://api-proyectos.onrender.com/projects/tasks/' + taskId, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: event.target.title.value,
                description: event.target.description.value,
                estimated_time: parseFloat(event.target.estimated_time.value),
                employee_id: parseInt(event.target.employee_id.value),
                task_type: event.target.task_type.value,
                task_priority: event.target.task_priority.value
            })
        }).then((response) => {
            if(response.ok) location.reload();
            return response.json()
        }).then(data => {
            if(data.error == 'invalid_date_range'){
                setNotification('La fecha de finalización no puede ser anterior a la de inicio.');
            }else if(data.error == 'internal_server_error'){
                setNotification('Ocurrió un error, intente más tarde.');
            }
        })
        .catch((error) => {
            console.error('Error al cargar el proyecto:', error);
            setNotification('Ocurrió un error, intente más tarde.');
        })
    }

    return (
        <div className="modal fade" id="editTaskModal" tabIndex={-1} aria-labelledby="editTaskModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editTaskModalLabel">Editar Tarea</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            { notification === '' ? '' : <div className="alert alert-danger" role="alert" dangerouslySetInnerHTML={{ __html: notification }} />}

                            <div className="mb-3">
                                <label htmlFor="title" className="col-form-label">Título: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="title" placeholder="Título" defaultValue={task.title || ''} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="col-form-label">Descripción: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="description" placeholder="Descripción" defaultValue={task.description || ''} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="estimated_time" className="col-form-label">Tiempo estimado: <small>(requerido)</small></label>
                                <input type="number" step="0.5" className="form-control" id="estimated_time" placeholder="Tiempo estimado" min={0} defaultValue={task.estimated_time || ''} required />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="task_type" className="col-form-label">Tipo: <small>(requerido)</small></label>
                                    <select className="form-control" id="task_type" defaultValue={task.task_type || ''} required>
                                        <option value="">Seleccionar Tipo</option>
                                        <option value="feature">Feature</option>
                                        <option value="bug">Bug</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="task_priority" className="col-form-label">Prioridad: <small>(requerido)</small></label>
                                    <select className="form-control" id="task_priority" defaultValue={task.task_priority || ''} required>
                                        <option value="">Seleccionar Prioridad</option>
                                        <option value="high">Alta</option>
                                        <option value="medium">Media</option>
                                        <option value="low">Baja</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employee_id" className="col-form-label">Empleado: <small>(requerido)</small></label>
                                <select className="form-control" id="employee_id" value={employee_id || ''} onChange={(e) => setEmployeeId(e.target.value)} required>
                                    <option value="">Seleccionar Recurso</option>
                                    {
                                        resources.map((item: any, index: number) => (
                                            <option key={index} value={item.legajo}>{item.Nombre} {item.Apellido}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}