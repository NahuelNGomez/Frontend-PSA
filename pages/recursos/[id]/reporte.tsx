import { ReactElement, useEffect, useState } from "react"
import RegistrosTable from "../../../components/Recursos/RegistrosTable";
import { useRouter } from "next/router";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ReporteHorasForm from "../../../components/Recursos/ReporteHorasForm";

function BreadcrumbItemsReporte({ legajo_recurso }: any) {
    return [
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
}


function LoadingIndicator({ cargando }: any) {
    return <div>{cargando}</div>;
}

function SubtotalHours({ hours }: any) {
    return (
        <div className="text-center">
            <div className="mb-4">
                <label htmlFor="name" className="col-form-label" style={{ padding: "10px" }}>
                    <b>Subtotal de horas: {hours} </b>
                </label>
            </div>
        </div>
    );
}



export default function ReporteHoras({ id }: any) {

    const router = useRouter()
    const legajo_recurso = router.query.id;

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

    const breadcrumbItems = BreadcrumbItemsReporte({ legajo_recurso });

    const table = registros.length === 0 ? (<></>) : (<RegistrosTable registros={registros} />);

    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="row">

                    <ReporteHorasForm
                        handleSubmit={handleSubmit}
                        project={project}
                        projects={projects}
                        setProject={setProject}
                        dateInicio={dateInicio}
                        setDateInicio={setDateInicio}
                        dateFin={dateFin}
                        setDateFin={setDateFin}
                        maxDate={maxDate}
                        anyEmpty={anyEmpty}
                    />

                    <LoadingIndicator cargando={cargando} />
                    {table}
                    <SubtotalHours hours={hours} />

                </div>
            </div>
        </section>
    )
}