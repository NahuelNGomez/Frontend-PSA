import { useState } from "react"
export default function DeleteProjectModal({projectId, redirectUrl} : any) {
    const [notification, setNotification] = useState('')
    const handleSubmit = async(event : any) => {
        event.preventDefault()
        fetch('https://api-proyectos.onrender.com/projects/' + projectId, {
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
            return response.json();
        }).then(data => {
            if(data.error == 'internal_server_error'){
                setNotification('Ocurrió un error, intente más tarde.');
            }
        })
    }

    return (
        <div className="modal fade" id="deleteProjectModal" tabIndex={-1} aria-labelledby="deleteProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteProjectModalLabel">Eliminar proyecto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { notification === '' ? '' : <div className="alert alert-danger" role="alert" dangerouslySetInnerHTML={{ __html: notification }} />}
                            <p>¿Está seguro que desea eliminar el proyecto?<br />Esta acción no se podrá deshacer.</p>
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