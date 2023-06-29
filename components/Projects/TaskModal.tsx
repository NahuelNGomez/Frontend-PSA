import { useEffect, useState } from "react"

{/*
    type: 1 -> Solamente se añade al proyecto (idTicket = null)
    type: 2 -> Se añade al proyecto y se vincula a un ticket
*/}

export default function TaskModal({projectId, type, idTicket, resources} : any) {

    const handleSubmit = async(event : any) => {
        let valid = 0;
        event.preventDefault()
        fetch('http://api-proyectos.onrender.com/projects/'+ projectId + '/tasks', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: event.target.title.value,
                description: event.target.description.value,
                estimated_time: parseFloat(event.target.estimated_time.value),
                employee_id: parseInt(event.target.employee_id.value),
                task_type: event.target.task_type.value,
                task_priority: event.target.task_priority.value,
                status: 'pending'
            })
        }).then((response) => {
            if(response.ok) {
                valid = 1;
            }
            if (type == 1 && response.ok){
                location.reload();
            }
            return response.json()
        }).catch((error) => {
        console.log('Error al cargar el proyecto:', error);
        }).then((data) => { 
            if(type == 2 && valid == 1) {
                fetch('https://apisoporte.onrender.com/tareasAsignadas', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        idTarea: data?.id,
                        id: idTicket
                })
            }).then((response) =>{
                if(response.ok) location.reload();
            }).catch((error) => {
                console.log('Error al asignar la tarea al ticket:', error);
                })
            }
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
                                <label htmlFor="estimated_time" className="col-form-label">Tiempo estimado: <small>(requerido)</small></label>
                                <input type="number" step="0.5" className="form-control" id="estimated_time" placeholder="Tiempo estimado" min={0} required />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="task_type" className="col-form-label">Tipo: <small>(requerido)</small></label>
                                    <select className="form-control" id="task_type" required>
                                        <option value="">Seleccionar Tipo</option>
                                        <option value="feature">Feature</option>
                                        <option value="bug">Bug</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="task_priority" className="col-form-label">Prioridad: <small>(requerido)</small></label>
                                    <select className="form-control" id="task_priority" required>
                                        <option value="">Seleccionar Prioridad</option>
                                        <option value="high">Alta</option>
                                        <option value="medium">Media</option>
                                        <option value="low">Baja</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employee_id" className="col-form-label">Empleado: <small>(requerido)</small></label>
                                <select className="form-control" id="employee_id" required>
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