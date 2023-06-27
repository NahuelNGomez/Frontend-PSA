import { useEffect, useState } from "react"

export default function TaskModal({projectId} : any) {

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
        fetch('https://api-proyectos.onrender.com/projects/'+ projectId + '/tasks', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: event.target.title.value,
                description: event.target.description.value,
                estimated_time: parseFloat(event.target.estimatedTime.value),
                employee_id: parseInt(event.target.employeeId.value),
                task_type: event.target.taskType.value,
                task_priority: event.target.taskPriority.value,
                status: 'pending'
            })
        }).then((response) => {
            if(response.ok) location.reload();
        })
        .catch((error) => {
            console.error('Error al cargar el proyecto:', error);
        })
    }

    return (
        <div className="modal fade" id="taskModal" tabIndex={-1} aria-labelledby="taskModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="taskModalLabel">Nueva Tarea</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="col-form-label">Título: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="title" placeholder="Título" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="col-form-label">Descripción: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="description" placeholder="Descripción" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="estimatedTime" className="col-form-label">Tiempo estimado: <small>(requerido)</small></label>
                                <input type="number" step="0.5" className="form-control" id="estimatedTime" placeholder="Tiempo estimado" min={0} required />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="taskType" className="col-form-label">Tipo: <small>(requerido)</small></label>
                                    <select className="form-control" id="taskType" required>
                                        <option value="">Seleccionar Tipo</option>
                                        <option value="feature">Feature</option>
                                        <option value="bug">Bug</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="taskPriority" className="col-form-label">Prioridad: <small>(requerido)</small></label>
                                    <select className="form-control" id="taskPriority" required>
                                        <option value="">Seleccionar Prioridad</option>
                                        <option value="high">Alta</option>
                                        <option value="medium">Media</option>
                                        <option value="low">Baja</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employeeId" className="col-form-label">Empleado: <small>(requerido)</small></label>
                                <select className="form-control" id="employeeId" required>
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