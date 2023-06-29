import { useEffect, useState } from "react"
export default function EditProjectModal({item, projectId} : any) {

    const [versions, setVersions] = useState([])
    const [responsibles, setResponsibles] = useState([])

    useEffect(() => {
        fetch("https://apisoporte.onrender.com/versiones")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setVersions(data)
        })

        fetch("https://rrhh-squad6-1c2023.onrender.com/recursos")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setResponsibles(data)
        })
    }, [])

    const handleSubmit = async(event : any) => {
        event.preventDefault()
        fetch('https://api-proyectos.onrender.com/projects/' + projectId, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: event.target.name.value,
                description: event.target.description.value,
                start_date: event.target.start_date.value,
                end_date: event.target.end_date.value,
                responsible_id: event.target.responsible_id.value
            })
        }).then((response) => {
            if(response.ok) location.reload();
        })
        .catch((error) => {
            console.error('Error al cargar el proyecto:', error);
        })
    }

    return (
        <div className="modal fade" id="editProjectModal" tabIndex={-1} aria-labelledby="editProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editProjectModalLabel">Editar Proyecto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Nombre: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="name" placeholder="Nombre" defaultValue={item.name || ''} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="col-form-label">Descripción: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="description" placeholder="Descripción" defaultValue={item.description || ''} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="start_date" className="col-form-label">Fecha de inicio: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="start_date" defaultValue={item.start_date || ''} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="end_date" className="col-form-label">Fecha de fin:</label>
                                <input type="date" className="form-control" id="end_date" defaultValue={item.end_date || ''} required />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="version_id" className="col-form-label">Versión: <small>(requerido)</small></label>
                                    <select className="form-control" id="version_id" value={item.version_id || ''} disabled>
                                        <option value="">Seleccionar Versión</option>
                                        {
                                        versions.map((item: any, index: number) => (
                                            <option key={index} value={item.idVersion}>{item.NombreProducto + ' (v' + item.CodigoVersion + ')'}</option>
                                        ))
                                        }
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="responsible_id" className="col-form-label">Responsable: <small>(requerido)</small></label>
                                    <select className="form-control" id="responsible_id" value={item.responsible_id || ''} required>
                                        <option value="">Seleccionar Responsable</option>
                                        {
                                        responsibles.map((item: any, index: number) => (
                                            <option key={index} value={item.legajo}>{item.Nombre + ' '+ item.Apellido}</option>
                                        ))
                                        }
                                    </select>
                                </div>
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