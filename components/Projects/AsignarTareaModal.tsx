import React, { SyntheticEvent, useEffect, useState } from "react";

export default function CrearTicketModal(){

    return (
        <div className="modal fade" id="asignarTareaModal" tabIndex={-1} aria-labelledby="asignarTareaModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="asignarTareaModalLabel">Asignar Tarea</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="row">
                            <div className="col-6 justify-content-center d-flex">
                                <label htmlFor="escenario" className="col-form-label">id</label>
                            </div>
                            <div className="col-6 justify-content-center d-flex">
                                <label htmlFor="escenario" className="col-form-label">Nombre</label>
                            </div>
                        </div>


                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Asignar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )





}