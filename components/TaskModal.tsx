export default function TaskModal() {
    return (
        <div className="modal fade" id="taskModal" tabIndex={-1} aria-labelledby="taskModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="taskModalLabel">Nueva Tarea</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Nombre: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="name" placeholder="Nombre" required />
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