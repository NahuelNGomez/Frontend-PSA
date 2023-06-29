import { useEffect, useState } from "react"
export default function ProjectModal() {

    const [notification, setNotification] = useState('')
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
        fetch('http://localhost:8080/projects', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: event.target.name.value,
                description: event.target.description.value,
                start_date: event.target.start_date.value,
                end_date: event.target.end_date.value,
                version_id: event.target.version_id.value,
                responsible_id: event.target.responsible_id.value
            })
        }).then((response) => {
            if(response.ok) location.reload();
            return response.json();
        }).then(data => {
            if(data.error == 'version_already_has_a_project'){
                setNotification('La versión seleccionada ya posee un proyecto asociado.');
            }
            else if(data.error == 'invalid_daterange'){
                setNotification('La fecha de finalización no puede ser anterior a la de inicio.');
            }else{
                setNotification('Ocurrió un error, intente más tarde.');
            }
        })
        .catch((error) => {
            console.error('Error al cargar el proyecto:', error);
            setNotification('Ocurrió un error, intente más tarde.');
        })
    }

    return (
        <div className="modal fade" id="projectModal" tabIndex={-1} aria-labelledby="projectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="projectModalLabel">Nuevo Proyecto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            { notification === '' ? '' : <div className="alert alert-danger" role="alert" dangerouslySetInnerHTML={{ __html: notification }} />}

                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Nombre: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="name" placeholder="Nombre" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="col-form-label">Descripción: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="description" placeholder="Descripción" required />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="start_date" className="col-form-label">Fecha de inicio: <small>(requerido)</small></label>
                                    <input type="date" className="form-control" id="start_date" required />
                                </div>
                                <div className="col">
                                    <label htmlFor="end_date" className="col-form-label">Fecha de fin:</label>
                                    <input type="date" className="form-control" id="end_date" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="version_id" className="col-form-label">Versión: <small>(requerido)</small></label>
                                    <select className="form-control" id="version_id" required>
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
                                    <select className="form-control" id="responsible_id" required>
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