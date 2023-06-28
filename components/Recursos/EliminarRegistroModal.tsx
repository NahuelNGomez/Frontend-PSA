import { useRouter } from "next/router";

export default function EliminarRegistroModal({ eliminarRegistro }: any) {

    const router = useRouter()
    const legajo = router.query.id;

    const handleClick = () => {
        eliminarRegistro();
        // Te direcciona a la pagina de generar reporte pero no se genera solo
        // window.location.href = 'http://localhost:3000/recursos/' + legajo + '/reporte';
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
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleClick()}>Eliminar</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>

                </div>
            </div>
        </div>
    )
}