import React, { SyntheticEvent, useEffect, useState } from "react";

export default function CrearTicketModal({version_id, recursos, clientes} : any){


    const handleSubmit = async(event : any) => {
        event.preventDefault()
        fetch('https://apisoporte.onrender.com/tickets', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                FechaDeCreacion: event.target.fechaInicio.value,
                Nombre: event.target.titulo.value,
                Descripcion: event.target.descripcion.value,
                Escenario: event.target.escenario.value,
                Estado: event.target.estado.value,
                Severidad: event.target.severidad.value,
                idVersion: parseInt(version_id),
                CUIT: event.target.cuit.value,
                RecursoAsignado: parseInt(event.target.recursos.value),
            })
        }).then((response) => {
            if(response.ok) location.reload();
        })
        .catch((error) => {
            console.error('Error al cargar el ticket:', error);
        })
    }
    
    return (
        <div className="modal fade" id="crearTicketModal" tabIndex={-1} aria-labelledby="crearTicketModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="crearTicketModalLabel">Crear un nuevo ticket</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3 row">
                                <div className="mb-3">
                                    <label htmlFor="titulo" className="col-form-label">Titulo: <small>(requerido)</small></label>
                                    <input type="text" className="form-control" id="titulo" placeholder="Titulo" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cuit" className="col-form-label">CUIT Cliente: <small>(requerido)</small></label>
                                    <select className="form-control" id="cuit">
                                {
                                    Array.isArray(clientes) && clientes.map((item: any, index: number) => (
                                        <option value={item?.CUIT}>{item?.CUIT} - {item?.Nombre}</option>
                                    ))
                                }
                                </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="col-form-label">Descripción: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="descripcion" placeholder="Descripcion" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="escenario" className="col-form-label">Escenario: <small>(requerido)</small></label>
                                <input type="text" className="form-control" id="escenario" placeholder="Escenario" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="estado" className="col-form-label">Estado: <small>(requerido)</small></label>
                                <select className="form-control" id="estado">
                                    <option value="Nuevo">Nuevo</option>
                                    <option value="En progreso">En progreso</option>
                                    <option value="Cerrado">Cerrado</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fechaInicio" className="col-form-label">Fecha de inicio: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="fechaInicio" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cuit" className="col-form-label">Recurso a asignar:</label>
                                <select className="form-control" id="recursos">
                                {
                                    Array.isArray(recursos) && recursos.map((item: any, index: number) => (
                                        <option value={item?.legajo}>{item?.legajo} - {item?.Nombre} {item?.Apellido}</option>
                                    ))
                                }
                                </select>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="severidad" className="col-form-label">Severidad: <small>(requerido)</small></label>
                                <div className="col-3 "><label htmlFor="severidad">
                                    <input type="radio" id="a1" name="severidad" value="S1" />S1</label>
                                </div>
                                <div className="col-3 "><label htmlFor="severidad">
                                    <input type="radio" id="a2" name="severidad" value="S2" />S2</label>
                                </div>
                                <div className="col-3 "><label htmlFor="severidad">
                                    <input type="radio" id="a3" name="severidad" value="S3" />S3</label>
                                </div>
                                <div className="col-3 "><label htmlFor="severidad">
                                    <input type="radio" id="a4" name="severidad" value="S4" />S4</label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}