export default function ProjectModal() {

    const handleSubmit = async(event : any) => {
        event.preventDefault()
        fetch('https://api-proyectos.onrender.com/projects', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: event.target.name.value,
                description: event.target.description.value,
                startDate: event.target.start_date.value,
                endDate: event.target.end_date.value,
            })
        }).then((response) => {
            if(response.ok) location.reload();
        })
        .catch((error) => {
            console.error('Error al cargar el proyecto:', error);
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
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Nombre: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="name" placeholder="Nombre" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="col-form-label">Descripción: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="description" placeholder="Descripción" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="start_date" className="col-form-label">Fecha de inicio: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="start_date" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="end_date" className="col-form-label">Fecha de fin:</label>
                                <input type="date" className="form-control" id="end_date" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}