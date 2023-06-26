import { useEffect, useState } from "react"
import RegistrosTable from "./RegistrosTable"

export default function ReporteHorasModal({ id }: any) {

    let legajo = id;
    console.log(legajo);

    const [registros, setRegistros] = useState([])
    const [dateInicio, setDateInicio] = useState('')
    const [dateFin, setDateFin] = useState('')
    const [cargando, setCargando] = useState('')

    let maxDate = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        let fecha = new Date();
        fecha.setDate(fecha.getDate() - 7);
        setDateInicio(fecha.toISOString().slice(0, 10));
        setDateFin(maxDate);
    }, [])

    async function completarRegistro(registro: any) {
        return fetch(`https://api-proyectos.onrender.com/projects/${registro.id_proyecto}`)
            .then(response => {
                if (response.ok)
                    return response.json().then(proyecto => {
                        registro.nombre_proyecto = proyecto.name;
                        let tarea = proyecto.tasks.find((task: any) => task.id == registro.id_tarea)
                        registro.titulo_tarea = tarea? tarea.title : "Tarea sin titulo";
                        setCargando("");
                        return registro;
                    });
            })
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setCargando("Cargando datos...");
        fetch(`https://rrhh-squad6-1c2023.onrender.com/recursos/${legajo}/registros?fechaInicio=${dateInicio}&fechaFin=${dateFin}`)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => { throw err })
                }
                return res.json()
            })
            .then(data => Promise.all(data.map(completarRegistro)))
            .then((registros: any) => setRegistros(registros))
            .catch(err => {
                console.error(err.detail)
            })

    }

    return (
        <div className="modal fade modal-lg" id="reporteHorasModal" tabIndex={-1} aria-labelledby="reporteHorasModalLabel" aria-hidden="true" style={{ width: "80%" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="projectModalLabel">Hacer reporte</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="start_date" className="col-form-label">Fecha: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="date" required value={dateInicio} max={maxDate} onChange={(e) => setDateInicio(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="start_date" className="col-form-label">Fecha: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="date" required value={dateFin} max={maxDate} min={dateInicio} onChange={(e) => setDateFin(e.target.value)} />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Buscar</button>
                        </div>
                    </form>
                    {cargando}
                    <RegistrosTable registros={registros} />
                </div>
            </div>
        </div>
    )
}