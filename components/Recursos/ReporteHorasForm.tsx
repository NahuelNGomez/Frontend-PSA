import React from "react";

export default function ReporteHorasForm(
    {
        handleSubmit,
        project,
        projects,
        setProject,
        dateInicio,
        setDateInicio,
        dateFin,
        setDateFin,
        maxDate,
        anyEmpty
    }: any
) {
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="modal-title fs-5">Hacer reporte</h1>
            <div className="mb-3">
                <label htmlFor="name" className="col-form-label">
                    Proyecto: <small>(requerido)</small>
                </label>
                <select className="form-select" value={project} onChange={(e) => setProject(e.target.value)}>
                    {projects.map((proyect: any) => (
                        <option key={proyect["id"]} value={proyect["id"]}>
                            {proyect["name"]}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="start_date" className="col-form-label">
                    Fecha de inicio: <small>(requerido)</small>
                </label>
                <input type="date" className="form-control" id="date" required value={dateInicio} max={maxDate} onChange={(e) => setDateInicio(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="start_date" className="col-form-label">
                    Fecha de finalizacion: <small>(requerido)</small>
                </label>
                <input type="date" className="form-control" id="date" required value={dateFin} max={maxDate} min={dateInicio} onChange={(e) => setDateFin(e.target.value)} />
            </div>
            <div className="text-center">
                <button type="submit" disabled={anyEmpty} className="btn btn-primary">
                    Generar
                </button>
            </div>
        </form>
    );
}