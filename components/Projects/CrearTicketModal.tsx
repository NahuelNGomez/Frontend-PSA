import React, { SyntheticEvent, useEffect, useState } from "react";

export default function CrearTicketModal(){
    return (
        <div className="modal fade" id="crearTicketModal" tabIndex={-1} aria-labelledby="crearTicketModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form id="crearTicketForm">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="crearTicketModalLabel">Crear una nueva Tarea</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 row">
                                <div className="col-2 "><label htmlFor="titulo" className="col-form-label">Titulo:</label></div>
                                <div className="col-4"><input type="text" className="form-control" id="titulo" placeholder="Titulo de ticket" required /></div>
                                <div className="col-1 "><label htmlFor="CUIT" className="col-form-label">CUIT:</label></div>
                                <div className="col-5"><input type="text" className="form-control" id="CUIT" placeholder="CUIT cliente" required /></div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-3"><label htmlFor="descripcion" className="col-form-label">Descripicion:</label></div>
                                <div className="col-12"><input type="text" className="form-control" id="descripcion" placeholder="Descripcion" required /></div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-3"><label htmlFor="escenario" className="col-form-label">Escenario:</label></div>
                                <div className="col-12"><input type="text" className="form-control" id="escenario" placeholder="Escenario" required /></div>
                            </div>
                            <div className="mb-3 row">
                                <div className="form-group">
                                    <label htmlFor="estado">Estado</label>
                                    <select className="form-control" id="estado">
                                    <option>Nuevo</option>
                                    <option>En progreso</option>
                                    <option>Cerrado</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fechaInicio" className="col-form-label">Fecha de inicio: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="fechaInicio" required />
                            </div>
                            <div className="mb-3 row">
                                <div className="form-group">
                                    <label htmlFor="Recurso">DEBERIA SER UN LIST DE RECURSOS</label>
                                    <select className="form-control" id="Recurso">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-12 "><label htmlFor="severidad" className="col-form-label">Severidad:</label></div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-3 "><label htmlFor="a1">
                                    <input type="radio" id="a1" name="severidad" value="S1" />S1</label>
                                </div>
                                <div className="col-3 "><label htmlFor="a2">
                                    <input type="radio" id="a2" name="severidad" value="S2" />S2</label>
                                </div>
                                <div className="col-3 "><label htmlFor="a3">
                                    <input type="radio" id="a3" name="severidad" value="S3" />S3</label>
                                </div>
                                <div className="col-3 "><label htmlFor="a4">
                                    <input type="radio" id="a4" name="severidad" value="S4" />S4</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Aceptar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}