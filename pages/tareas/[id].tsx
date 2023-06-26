import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Breadcrumbs from "../../components/Breadcrumbs"
//import TasksTable from "../../../components/Proyectos/TasksTable"
//import TaskModal from "../../../components/TaskModal"

function formatDate(timestamp: string){
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export default function Tarea() {
    const router = useRouter()

    const [item, setItem] = useState([])
    const [breadcrumbItems, setBreadcrumbItems] = useState<Array<{ title: string; url: string; }>>([]);
    const [tasks, setTasks] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if(router.query.id){
            fetch("https://api-proyectos.onrender.com/projectTasks/" + router.query.id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItem(data)
                setTasks(data.tasks)

                const breadcrumb = [
                    {
                        title: 'Proyectos',
                        url: '/proyectos'
                    },
                    {
                        title: data.name,
                        url: '/proyectos/' + data.id
                    }
                ];
                setBreadcrumbItems(breadcrumb);
            })
        }
    }, [router.query.id])

    const searchForm = async () => {
        fetch("https://api-proyectos.onrender.com/projects?search=" + encodeURIComponent(searchText))
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setItem(data)
        })
    }

    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />
                
                <h3 className="fw-light">{item.name}</h3>
                <h6 className="fw-light">Version FALTA_VERSION</h6>

                <div className="row my-4">
                    <div className="col-md-12 mb-2">
                        Descripción: <div className="bd-callout bd-callout-light my-2">{item.description}</div>
                    </div>
                    <div className="col-md-12 mb-2">
                        Detalles: 
                        <div className="bd-callout bd-callout-light my-2">
                            {item.hoursWorked} horas trabajadas ({item.tasksQuantity} tareas)<br />
                            Inicio: {formatDate(item.startDate)} | Fin: {formatDate(item.endDate)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
