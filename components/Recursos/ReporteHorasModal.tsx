import { useEffect, useState } from "react"
import RegistrosTable from "./RegistrosTable"

// interface ProyectProps {
//     id: number,
//     name: string,
//     tasks: []
// }

// export default function ReporteHorasModal({ id }: any) {

//     let legajo = id;

//     const [registros, setRegistros] = useState([])
//     const [dateInicio, setDateInicio] = useState('')
//     const [dateFin, setDateFin] = useState('')
//     const [cargando, setCargando] = useState('')

//     const [projects, setProjects] = useState([])
//     const [project, setProject] = useState('')
//     const [hours, setHours] = useState(0)

//     let maxDate = new Date().toISOString().slice(0, 10);


//     useEffect(() => {
//         let fecha = new Date();
//         fecha.setDate(fecha.getDate() - 7);
//         setDateInicio(fecha.toISOString().slice(0, 10));
//         setDateFin(maxDate);

//         fetch("https://api-proyectos.onrender.com/projects/")
//             .then((res) => {
//                 return res.json()
//             })
//             .then((data) => {
//                 setProjects(data)
//                 setProject(data[0]['id'])
//             })
//     }, [])

//     const handleSubmit = (e: { preventDefault: () => void }) => {
//         e.preventDefault();
//         setCargando("Cargando datos...");
//         fetch(`https://rrhh-squad6-1c2023.onrender.com/recursos/${legajo}/registros?fechaInicio=${dateInicio}&fechaFin=${dateFin}&idProyecto=${project}`)
//             .then(res => {
//                 if (!res.ok) {
//                     return res.json().then(err => { throw err })
//                 }
//                 return res.json()
//             })
//             .then(data => {
//                 let registros = data.map((registro: any) => {
//                     let proyecto = projects.find(p => p['id'] == project);
//                     if (proyecto) {
//                         registro.nombre_proyecto = proyecto["name"];
//                         let tasks: [] = proyecto['tasks'] || [];
//                         let tarea = tasks.find((task: any) => task.id == registro.id_tarea)
//                         registro.titulo_tarea = tarea ? tarea['title'] : "Tarea sin titulo";
//                     }
//                     return registro
//                 })

//                 setRegistros(registros);
//                 let hoursSum = registros.reduce((acc: number, actual: any) => acc += actual["cantidad"], 0);
//                 setHours(hoursSum)
//                 setCargando("");
//             })
//             .catch(err => {
//                 setCargando("");
//                 console.error(err.detail)
//             })

//     }

//     return (
//         <div className="modal fade modal-lg" id="reporteHorasModal" tabIndex={-1} aria-labelledby="reporteHorasModalLabel" aria-hidden="true" style={{ width: "80%" }}>
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <form onSubmit={handleSubmit}>
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="projectModalLabel">Hacer reporte</h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <div className="mb-3">
//                                 <label htmlFor="name" className="col-form-label">Proyecto: <small>(requerido)</small></label>
//                                 <select value={project} onChange={(e) => setProject(e.target.value)}> {projects.map((proyect, index) => (<option key={proyect["id"]} value={proyect["id"]}>{proyect["name"]}</option>))}</select>
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="start_date" className="col-form-label">Fecha: <small>(requerido)</small></label>
//                                 <input type="date" className="form-control" id="date" required value={dateInicio} max={maxDate} onChange={(e) => setDateInicio(e.target.value)} />
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="start_date" className="col-form-label">Fecha: <small>(requerido)</small></label>
//                                 <input type="date" className="form-control" id="date" required value={dateFin} max={maxDate} min={dateInicio} onChange={(e) => setDateFin(e.target.value)} />
//                             </div>

//                         </div>
//                         <div className="modal-footer">
//                             <button type="submit" className="btn btn-primary">Buscar</button>
//                         </div>
//                     </form>
//                     {cargando}
//                     <RegistrosTable registros={registros} />

//                     <div className="mb-4">
//                         <label htmlFor="name" className="col-form-label" style={{ padding: "10px" }}><b>Subtotal de horas: {hours} </b></label>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }