import { useRouter } from "next/router"
import Breadcrumbs from "../../../components/Breadcrumbs"
import { useEffect, useState } from "react"
import TrabajadorTable from "../../../components/Recursos/TrabajadorTable"
import CargarHorasModal from "../../../components/Recursos/CargarHorasModal"
import Link from "next/link"

export default function Recurso() {
    const router = useRouter()
    const legajo_recurso = router.query.id;

    useEffect(() => {
        fetch("https://rrhh-squad6-1c2023.onrender.com/recursos/" + legajo_recurso)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItems(data)
            })
    }, [legajo_recurso])

    const breadcrumbItems = [
        {
            title: 'Recursos',
            url: '/recursos'
        },
        {
            title: 'Gestion R' + legajo_recurso,
            url: '/recursos/' + legajo_recurso
        }
    ]

    const [items, setItems] = useState([])

    const [notification, setNotification] = useState({ message: "", type: "" });

    const [isRequestLoading, setIsRequestLoading] = useState(false);

    const cargarRegistro = (proyect: number, task: number, date: string, hours: number) => {
        const registro = {
            id_proyecto: proyect,
            id_tarea: task,
            fecha_de_registro: date,
            cantidad: hours
        }

        return fetch(`https://rrhh-squad6-1c2023.onrender.com/recursos/${legajo_recurso}/registros`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(registro)
        }).then((res) => {
            if (!res.ok) {
                return res.json().then(err => { throw err });
            }
            setNotification({ message: "Carga realizada exitosamente!", type: "success" });
            setTimeout(() => setNotification({ message: "", type: "" }), 4000); // Clear notification after 4 seconds
            return res.json();
        }).catch((error) => {
            console.error(error);
            setNotification({ message: `Fallo en la carga de horas: ${error.detail || "Exceso de carga de horas para la fecha especificada. Maximo por dia: 12"}`, type: "danger" });
            setTimeout(() => setNotification({ message: "", type: "" }), 4000);
        })

    }


    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />

                <h3 className="fw-light mx-2">Gestion R{legajo_recurso}</h3>

                {isRequestLoading && (

                    <div className={`alert alert-info mt-4`} role="alert">
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Procesando Operacion...</span>
                            </div>
                            <p>Procesando Operacion...</p>
                        </div>
                    </div>

                )
                }

                {notification.message && (
                    <div className={`alert alert-${notification.type} alert-block mt-4`} role="alert">
                        <h5>{notification.message}</h5>
                    </div>
                )}

                <div className="row">
                    <div className="d-flex align-items-center bg-secondary rounded my-5 mx-2">
                        <div className="col-3 px-3">
                            <div className="text-center text-white">
                                <h5>Acciones</h5>
                                <div className="btn-toolbar flex-column" role="toolbar" aria-label="Toolbar with button groups">
                                    <div className="btn-group mx-2 my-2" role="group">
                                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#cargarHorasModal">Cargar horas</button>
                                    </div>

                                    <div className="btn-group mx-2 my-2" role="group">
                                        <Link className="btn btn-primary" href={"/recursos/" + legajo_recurso + "/reporte"}>Reporte de horas por proyecto</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-10 text-left me-auto">
                            <TrabajadorTable item={items} />

                        </div>
                    </div>
                </div>

            </div>




            <CargarHorasModal id={legajo_recurso} handleSubmit={cargarRegistro} isRequestLoading={isRequestLoading} setIsRequestLoading={setIsRequestLoading} />

        </section>
    )
}
