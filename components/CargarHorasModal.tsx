import HorasCargadasModal from "./HorasCargadasModal";

export default function CargarHorasModal() {
    return (
        <div className="modal fade" id="cargarHorasModal" tabIndex={-1} aria-labelledby="cargarHorasModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="cargarHorasModalLabel">Cargar Horas</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Proyecto: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="name" placeholder="Listar proyectos" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Tarea: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="name" placeholder="Listar tarea" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Cantidad de horas: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="name" placeholder="Horas de trabajo" required />
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
                            {/* <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button> */}
                            {/* <button className="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#horasCargadasModal">Aceptar</button> */}
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary">Aceptar</button>
        
                            <HorasCargadasModal />    
                        </div>
                        
                        
                        {/* <div className="modal fade" id="horasCargadasModal" tabIndex={-1} aria-labelledby="horasCargadasModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form>
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="horasCargadasModalLabel">Carga de horas</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <h3 className="fw-light mb-4">La carga fue realizada con exito</h3>
                        
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> */}



                    </form>
                </div>
            </div>
        </div>
        
    )
}