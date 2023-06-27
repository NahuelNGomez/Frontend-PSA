import { useRouter } from "next/router";

export default function EliminarRegistroModal({idRegistro}:any) {
    
    const router = useRouter()
    const legajo = router.query.id;
    
    // const id = idRegistro;
    console.log(idRegistro)
    // const legajo = registro.legajo

    

    const eliminarRegistro = () => {
        fetch(`https://rrhh-squad6-1c2023.onrender.com/recursos/${legajo}/registros/${idRegistro}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json", "Accept": "application/json" }
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => { throw err })
            }
            return res.json()
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.error(err.detail)
        })
    }

    return (
        <div className="modal fade" id="eliminarRegistroModal" tabIndex={-1} aria-labelledby="eliminarRegistroModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="eliminarRegistroModalLabel">Eliminacion de registro</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h3 className="fw-light mb-4">Seguro desea eliminar el registro?</h3>
                        
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => eliminarRegistro()}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>     
                        </div>
                    
                </div>
            </div>
        </div>
    )
}