import React, { SyntheticEvent, useEffect, useState } from "react";

export default function AsignarTareaModal({tareasDisponibles, idTicket} : any){
    const handleSubmit = async(event : any) => {
        event.preventDefault()
        fetch('https://apisoporte.onrender.com/tareasAsignadas', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                idTarea: event.target.tarea.value,
                id: parseInt(idTicket),
            })
        }).then((response) => {
            if(response.ok) location.reload();
        })
        .catch((error) => {
            console.error('Error al cargar la tarea:', error);
        })
    }

    return (
        <div className="modal fade" id="asignarTareaModal" tabIndex={-1} aria-labelledby="asignarTareaModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="asignarTareaModalLabel">Asignar Tarea</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="row">
                            <div className="col-6 justify-content-center d-flex">
                                <label className="col-form-label">id</label>
                            </div>
                            <div className="col-6 justify-content-center d-flex">
                                <label className="col-form-label">Nombre</label>
                            </div>
                        </div>
                                {
                                    Array.isArray(tareasDisponibles) && tareasDisponibles.map((item: any, index: number) => (
                                        <div className="col-12 m-5"><label htmlFor="tarea">
                                        <input type="radio" id={item.id} name="tarea" value={item.id} />{item.id}    {item.title}</label>
                                        </div>
                                    ))
                                }

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