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
                    <div className="modal-body py-1">
                        <div className="row">
                            <div className="col-6 border-bottom">
                                <label className="col-form-label px-5">Id</label>
                            </div>
                            <div className="col-6 border-bottom">
                                <label className="col-form-label justify-content-center d-flex">Nombre</label>
                            </div>
                        </div>
                        {Array.isArray(tareasDisponibles) && tareasDisponibles.map((item: any, index: number) => (
                            <div className="row px-3 m-2" key={item.id}>
                                <div className="col-6">
                                    <input type="radio" id={item.id} name="tarea" value={item.id} />
                                    <label htmlFor={item.id} className="form-check-label">{item.id}</label>
                                </div>
                                <div className="col-6">
                                    <label htmlFor={item.id} className="form-check-label ">{item.title}</label>
                                </div>
                            </div>
                        ))}
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