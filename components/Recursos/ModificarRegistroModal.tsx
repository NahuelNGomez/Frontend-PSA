import { useState } from "react";


export default function ModificarRegistroModal(registro: any, legajo: number) {
    let idRegistro = registro.id //    
    let maxDate = new Date().toISOString().slice(0, 10);

    const [hours, setHours] = useState('')
    const [date, setDate] = useState('')

    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])

    const [proyect, setProyect] = useState("")
    const [task, setTask] = useState("")

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const registro = {
            id_proyecto: proyect,
            id_tarea: task,
            fecha_de_registro: date,
            cantidad: hours
        }

        fetch(`https://rrhh-squad6-1c2023.onrender.com/recursos/${legajo}/registros/${idRegistro}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(registro)
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => { throw err })
            }
            return res.json()
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.error(err.detail)
        })

    }
    
    let anyEmpty = !proyect || !task || !hours || !date;
    
    return (
        <div className="modal fade" id="cargarHorasModal" tabIndex={-1} aria-labelledby="cargarHorasModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="cargarHorasModalLabel">Cargar Horas</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Proyecto: <small>(requerido)</small></label>
                                {/* <input type="text" className="form-control" id="name" placeholder="Listar proyectos" required /> */}
                                <select value={proyect} onChange={(e) => setProyect(e.target.value)}>
                                    {projects.map((proyect, index) => (<option key={proyect["id"]} value={proyect["id"]}>{proyect["name"]}</option>))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Tarea: <small>(requerido)</small></label>
                                {/* <input type="text" className="form-control" id="name" placeholder="Listar tarea" required /> */}
                                <select value={task} disabled={tasks.length === 0} onChange={(e) => setTask(e.target.value)}>
                                    {tasks.map((task, index) => (<option key={task["id"]} value={task["id"]}>{task["title"]}</option>))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Cantidad de horas: <small>(requerido)</small></label>
                                <input type="number" className="form-control" id="horas" placeholder="Horas de trabajo" required min={1} max={12} value={hours} onChange={(e) => setHours(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="start_date" className="col-form-label">Fecha: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="date" required value={date} max={maxDate} onChange={(e) => setDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button> */}
                            {/* <button className="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#horasCargadasModal">Aceptar</button> */}
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary" disabled={anyEmpty}>Aceptar</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}