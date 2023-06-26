import { useEffect, useState } from "react"
import HorasCargadasModal from "./HorasCargadasModal";

interface ProyectProps {
    id: number,
    name: string,
    tasks: []
}

interface TaskProps {
    id: number,
    title: string
}

export default function CargarHorasModal({id}: any) {
    let legajo = id;
    let maxDate = new Date().toISOString().slice(0,10);
    console.log(legajo);
    const [proyect, setProyect] = useState<ProyectProps>()
    const [task, setTask] = useState<TaskProps>()
    const [hours, setHours] = useState('')
    const [date, setDate] = useState('')
    const [projects, setProjects] = useState<ProyectProps[]>([])
    const [tasks, setTasks] = useState<TaskProps[]>([])

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (!proyect || !task) {
            // mostrar cartel
            console.error("Seleccionar proyecto y tarea");
            return;
        }

        const registro = {
            id_proyecto: proyect.id,
            id_tarea: task.id,
            fecha_de_registro: date,
            cantidad: hours
        }

        fetch(`https://rrhh-squad6-1c2023.onrender.com/recursos/${legajo}/registros`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept":"application/json" },
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

    const selectProject = (projectIndex: number) => {
        let project = projects[projectIndex];
        setProyect(project);
        let tasks = project.tasks;
        setTasks(tasks);
        if (tasks.length === 0) setTask(undefined);
    }

    const selectTask = (taskIndex: number) => {
        let task = tasks[taskIndex];
        setTask(task);
    }

    useEffect(() => {
        fetch("https://api-proyectos.onrender.com/projects/")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setProjects(data)
            })
        }, [])


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
                                <select onChange={(e) => selectProject(parseInt(e.target.value))}> {projects.map((proyect, index) => (<option key={index} value={index}>{proyect.name}</option>))}</select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="col-form-label">Tarea: <small>(requerido)</small></label>
                                {/* <input type="text" className="form-control" id="name" placeholder="Listar tarea" required /> */}
                                <select disabled={tasks.length === 0} onChange={(e) => selectTask(parseInt(e.target.value))}> {tasks.map((task, index) => (<option key={index} value={index}>{task.title}</option>))} </select>
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
                            <button type="submit" className="btn btn-primary">Aceptar</button>

                        </div>
                            <HorasCargadasModal />


                        {/* <div className="modal fade" id="horasCargadasModal" tabIndex={-1} aria-labelledby="horasCargadasModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form>
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="horasCargadasModalLabel">Carga de horas</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <h3 className="fw-light mb-4">La carga fue realizada con exito</h3>
                        
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> */}



                    </form>
                </div>
            </div>
        </div>

    )
}