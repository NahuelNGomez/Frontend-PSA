import { useEffect, useState } from "react"
// import HorasCargadasModal from "./HorasCargadasModal";


function ModalHeaderRegistro() {
    return (
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="cargarHorasModalLabel">
                Cargar Horas
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

        </div>
    );
}

function ModalBodyTitle({ isModification, registro }: any) {
    return (
        <div>
            {isModification && (
                <div className="mb-4">
                    <h1 className="fs-5">
                        <b>Registro {registro ? registro["id"] : ""}</b>
                    </h1>
                </div>
            )}
        </div>
    );
}

function ProjectSelect({ projects, project, setProject }: any) {
    return (
        <div className="mb-3">
            <label htmlFor="name" className="col-form-label">
                Proyecto: <small>(requerido)</small>
            </label>
            <select className="form-select" value={project || ""} required onChange={(e) => setProject(e.target.value)}>
                {projects.map((proyect: any, index: any) => (
                    <option key={proyect["id"]} value={proyect["id"]}>
                        {proyect["name"]}
                    </option>
                ))}
            </select>
        </div>
    );
}

function TaskSelect({ tasks, task, setTask }: any) {
    return (
        <div className="mb-3">
            <label htmlFor="name" className="col-form-label">
                Tarea: <small>(requerido)</small>
            </label>
            <select className="form-select" value={task || ""} disabled={tasks.length === 0} required onChange={(e) => setTask(e.target.value)}>
                {tasks.map((task: any, index: any) => (
                    <option key={task["id"]} value={task["id"]}>
                        {task["title"]}
                    </option>
                ))}
            </select>
        </div>
    );
}


function HoursInput({ hours, setHours }: any) {
    return (
        <div className="mb-3">
            <label htmlFor="name" className="col-form-label">
                Cantidad de horas: <small>(requerido)</small>
            </label>
            <input
                type="number"
                className="form-control"
                id="horas"
                placeholder="Horas de trabajo"
                required
                min={1}
                max={12}
                value={hours || ""}
                onChange={(e) => setHours(e.target.value)}
            />
        </div>
    );
}

function DateInput({ date, setDate, maxDate }: any) {
    return (
        <div className="mb-3">
            <label htmlFor="start_date" className="col-form-label">
                Fecha: <small>(requerido)</small>
            </label>
            <input type="date" className="form-control" id="date" required value={date || ""} max={maxDate} onChange={(e) => setDate(e.target.value)} />
        </div>
    );
}

function ModalFooterRegistro({ anyEmpty, isRequestLoading }: any) {
    return (
        <div className="modal-footer">
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled={anyEmpty || isRequestLoading}>
                {isRequestLoading ? "Cargando..." : "Aceptar"}
            </button>
        </div>
    );
}

function ModalBodyRegistro({ isRequestLoading, isModification, registro, projects, project, setProject, tasks, task, setTask, hours, setHours, date, setDate, maxDate, submitHandler, anyEmpty }: any) {
    return (
        <div className="modal-body">
            {isRequestLoading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading...</p>
                </div>
            ) : (
                <form onSubmit={submitHandler}>
                    <ModalBodyTitle isModification={isModification} registro={registro} />
                    <ProjectSelect projects={projects} project={project} setProject={setProject} />
                    <TaskSelect tasks={tasks} task={task} setTask={setTask} />
                    <HoursInput hours={hours} setHours={setHours} />
                    <DateInput date={date} setDate={setDate} maxDate={maxDate} />
                    <ModalFooterRegistro anyEmpty={anyEmpty} isRequestLoading={isRequestLoading} />

                </form>
            )}
        </div>
    );
}

export default function CargarHorasModal({ id, registro, handleSubmit, isRequestLoading, setIsRequestLoading }: any) {
    //const router = useRouter()
    //const legajo = id > 0 ? id : router.query.id;

    const [isModification, setIsModification] = useState(false)
    const [hours, setHours] = useState('')
    const [date, setDate] = useState('')

    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])

    const [project, setProject] = useState("")
    const [task, setTask] = useState("")

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsRequestLoading(true);
        handleSubmit(project, task, date, hours)
            .then((data: any) => {
                console.log(data);
                setIsRequestLoading(false);
            }).catch((err: any) => {
                console.error(err.detail)
                setIsRequestLoading(false);
            })
    }

    useEffect(() => {
        console.log("Buscando proyectos...")
        fetch("https://api-proyectos.onrender.com/projects/")
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(data => { throw { data } })
                }
                return res.json()
            })
            .then((data) => {
                setProjects(data)
                if (data && data.lenght > 0 && !project) setProject(data.at(0)["id"])
                else setProject('')
            })
            .then(() => {
                if (!project) return;
                fetch(`https://api-proyectos.onrender.com/projects/${project}/tasks`)
                    .then((res) => {
                        if (!res.ok) {
                            return res.json().then(data => { throw { data } })
                        }
                        return res.json()
                    })
                    .then((data) => {
                        setTasks(data)
                        if (data) setTask(data.at(0)["id"])
                    })
                    .catch(() => {
                        setTasks([]);
                        setTask('')
                    })

            })
            .then(() => {
                setIsModification(registro != null)

                if (registro != null) {
                    setProject(registro["id_proyecto"])
                    setTask(registro["id_tarea"])
                    setDate(registro["fecha_de_registro"])
                    setHours(registro["cantidad"])
                }
            })
            .catch(() => null)

    }, [registro, projects, project])

    let anyEmpty = !project || !task || !hours || !date;
    let maxDate = new Date().toISOString().slice(0, 10);


    return (
        <div className="modal fade" id="cargarHorasModal" tabIndex={-1} aria-labelledby="cargarHorasModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <ModalHeaderRegistro />
                    <ModalBodyRegistro
                        isRequestLoading={isRequestLoading}
                        isModification={isModification}
                        registro={registro}
                        projects={projects}
                        project={project}
                        setProject={setProject}
                        tasks={tasks}
                        task={task}
                        setTask={setTask}
                        hours={hours}
                        setHours={setHours}
                        date={date}
                        setDate={setDate}
                        maxDate={maxDate}
                        submitHandler={submitHandler}
                        anyEmpty={anyEmpty}
                    />
                </div>
            </div>
        </div>

    )
}