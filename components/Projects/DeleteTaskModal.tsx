export default function DeleteTaskModal({taskId, redirectUrl} : any) {

    const handleSubmit = async(event : any) => {
        event.preventDefault()
        fetch('https://api-proyectos.onrender.com/projects/tasks/' + taskId, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
        }).then((response) => {
            if(response.ok){
                if(redirectUrl == undefined){
                    location.reload();
                }else{
                    location.href = redirectUrl;
                }
            }
        })
    }

    return (
        <div className="modal fade" id="deleteTaskModal" tabIndex={-1} aria-labelledby="deleteTaskModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteTaskModalLabel">Eliminar Tarea</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Está seguro que desea eliminar la tarea?<br />Esta acción no se podrá deshacer.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-danger">Eliminar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}