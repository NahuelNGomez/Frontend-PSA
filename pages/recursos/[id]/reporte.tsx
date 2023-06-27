import { useEffect, useState } from "react"
import RegistrosTable from "../../../components/Recursos/RegistrosTable";
import { useRouter } from "next/router";
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function ReporteHoras({ id }: any) {

    const router = useRouter()
    const legajo_recurso = router.query.id;

    const breadcrumbItems = [
        {
            title: 'Recursos',
            url: '/recursos'
        },
        {
            title: 'Gestion R' + legajo_recurso, // Obtenerlo de API
            url: '/recursos/' + legajo_recurso
        },
        {
            title: "Reporte", // Obtenerlo de API
            url: '/recursos/' + legajo_recurso + "/reporte"
        }

    ]

    const [registros, setRegistros] = useState([])
    const [dateInicio, setDateInicio] = useState('')
    const [dateFin, setDateFin] = useState('')
    const [cargando, setCargando] = useState('')

    const [projects, setProjects] = useState([])
    const [project, setProject] = useState('')
    const [hours, setHours] = useState(0)

    let maxDate = new Date().toISOString().slice(0, 10);


    useEffect(() => {
        let fecha = new Date();
        fecha.setDate(fecha.getDate() - 7);
        setDateInicio(fecha.toISOString().slice(0, 10));
        setDateFin(maxDate);

        fetch("https://api-proyectos.onrender.com/projects/")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setProjects(data)
                setProject(data[0]['id'])
            })
    }, [])

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setCargando("Cargando datos...");
        fetch(`https://rrhh-squad6-1c2023.onrender.com/recursos/${legajo_recurso}/registros?fechaInicio=${dateInicio}&fechaFin=${dateFin}&idProyecto=${project}`)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => { throw err })
                }
                return res.json()
            })
            .then(data => {
                let registros = data.map((registro: any) => {
                    let proyecto = projects.find(p => p['id'] == project);
                    if (proyecto) {
                        registro.nombre_proyecto = proyecto["name"];
                        let tasks: [] = proyecto['tasks'] || [];
                        let tarea = tasks.find((task: any) => task.id == registro.id_tarea)
                        registro.titulo_tarea = tarea ? tarea['title'] : "Tarea sin titulo";
                    }
                    return registro
                })

                setRegistros(registros);
                let hoursSum = registros.reduce((acc: number, actual: any) => acc += actual["cantidad"], 0);
                setHours(hoursSum)
                setCargando("");
            })
            .catch(err => {
                setCargando("");
                console.error(err.detail)
            })

    }
    let anyEmpty = !project || !dateInicio || !dateFin;
    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="row">

                    <form onSubmit={handleSubmit}>
                        <h1 className="modal-title fs-5">Hacer reporte</h1>
                        <div className="mb-3">
                            <label htmlFor="name" className="col-form-label">Proyecto: <small>(requerido)</small></label>
                            <select className="form-select" value={project} onChange={(e) => setProject(e.target.value)}> {projects.map((proyect, index) => (<option key={proyect["id"]} value={proyect["id"]}>{proyect["name"]}</option>))}</select>

                            <div className="mb-3">
                                <label htmlFor="start_date" className="col-form-label">Fecha de inicio: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="date" required value={dateInicio} max={maxDate} onChange={(e) => setDateInicio(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="start_date" className="col-form-label">Fecha de finalizacion: <small>(requerido)</small></label>
                                <input type="date" className="form-control" id="date" required value={dateFin} max={maxDate} min={dateInicio} onChange={(e) => setDateFin(e.target.value)} />
                            </div>

                        </div>
                        <div className="text-center">
                            <button type="submit" disabled={anyEmpty} className="btn btn-primary">Generar</button>
                        </div>
                        <div className="text-center">
                            {cargando}
                            <RegistrosTable registros={registros} />
                            <div className="mb-4">
                                <label htmlFor="name" className="col-form-label" style={{ padding: "10px" }}><b>Subtotal de horas: {hours} </b></label>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}