import { useEffect, useState } from "react"
import HorasCargadasModal from "./HorasCargadasModal";
import { useRouter } from "next/router";

export default function CargarHorasModal({ id, registro, handleSubmit }: any) {
    const router = useRouter()
    const legajo = id > 0 || router.query.id;

    let maxDate = new Date().toISOString().slice(0, 10);

    const [isModification, setIsModification] = useState(false)
    const [hours, setHours] = useState('')
    const [date, setDate] = useState('')

    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])

    const [proyect, setProyect] = useState("")
    const [task, setTask] = useState("")

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        handleSubmit(proyect, task, date, hours)
            .then((data: any) => {
                console.log(data);
            }).catch((err: any) => {
                console.error(err.detail)
            })
    }

    useEffect(() => {
        console.log("Buscando proyectos...")
        fetch("https://api-proyectos.onrender.com/projects/")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setProjects(data)
                if (!proyect)
                    setProyect(data.at(0)["id"])
            })
    }, [])

    useEffect(() => {
        setIsModification(true)
        setProyect(registro["id_proyecto"])
        setTask(registro["id_tarea"])
        setDate(registro["fecha_de_registro"])
        setHours(registro["cantidad"])
    }, [registro, projects])

    useEffect(() => {
        let project = projects.find(p => p["id"] == proyect);
        let tasks = project ? project["tasks"] : [];
        setTasks(tasks)
        setTask(tasks.length === 0 ? "" : tasks[0]["id"])
    }, [proyect])

    let anyEmpty = !proyect || !task || !hours || !date;

    return (
        <div className="modal fade" id="cargarHorasModal" tabIndex={-1} aria-labelledby="cargarHorasModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="cargarHorasModalLabel">Cargar Horas</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <form onSubmit={submitHandler}>
                        <div className="modal-body">

                            <div className="mb-4" hidden={!isModification}>
                                <h1 className="fs-5"><b>Registro {registro ? registro["id"] : ""} </b></h1>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Proyecto: <small>(requerido)</small></label>
                                <select className="form-select" value={proyect || ""} required onChange={(e) => setProyect(e.target.value)}>
                                    {projects.map((proyect, index) => (<option key={proyect["id"]} value={proyect["id"]}>{proyect["name"]}</option>))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Tarea: <small>(requerido)</small></label>
                                <select className="form-select" value={task || ""} disabled={tasks.length === 0} required onChange={(e) => setTask(e.target.value)}>
                                    {tasks.map((task, index) => (<option key={task["id"]} value={task["id"]}>{task["title"]}</option>))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Cantidad de horas: <small>(requerido)</small></label>
                                <input type="number" className="form-control" id="horas" placeholder="Horas de trabajo" required min={1} max={12} value={hours || ""} onChange={(e) => setHours(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="start_date" className="col-form-label">Fecha: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="date" required value={date || ""} max={maxDate} onChange={(e) => setDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled={anyEmpty}>Aceptar</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}