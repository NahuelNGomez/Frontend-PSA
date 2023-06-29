import { useRouter } from "next/router";
import EliminarRegistroModal from "./EliminarRegistroModal";
import { useState } from "react";
import CargarHorasModal from "./CargarHorasModal";


export default function RegistrosTable({ registros }: any) {
    const router = useRouter()
    const legajo = router.query.id;
    const [id, setId] = useState(0)
    const [selectedItem, setSelectedItem] = useState<object>({})

    const [isRequestLoading, setIsRequestLoading] = useState(false);
    const [notification, setNotification] = useState({ message: "", type: "" });

    const modificarRegistro = (proyect: number, task: number, date: string, hours: number) => {
        const registro = {
            id_proyecto: proyect,
            id_tarea: task,
            fecha_de_registro: date,
            cantidad: hours,
        }

        return fetch(`https://rrhh-squad6-1c2023.onrender.com/recursos/${legajo}/registros/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(registro)
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => { throw err })
            }
            setNotification({ message: "Registro modificado exitosamente! Puede ver los cambios generando la tabla nuevamente", type: "success" });
            setTimeout(() => setNotification({ message: "", type: "" }), 4000);
            return res.json()
        }).catch((error) => {
            setNotification({ message: `Fallo al modificar: ${error.detail || "Problema inesperado en comunicacion con servidor"}`, type: "danger" });
            setTimeout(() => setNotification({ message: "", type: "" }), 4000);
        })

    }

    const eliminarRegistro = () => {
        setIsRequestLoading(true);
        return fetch(`https://rrhh-squad6-1c2023.onrender.com/recursos/${legajo}/registros/${id}`, {
            method: 'DELETE',
            headers: { "Accept": "application/json" }
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => { throw err })
            }
            setIsRequestLoading(false);
            setNotification({ message: "Registro eliminado exitosamente! Puede ver los cambios generando la tabla nuevamente", type: "success" });
            setTimeout(() => setNotification({ message: "", type: "" }), 4000);
            return res.json()
        }).catch((err: any) => {
            console.error(err.detail)
            setIsRequestLoading(false);
            setNotification({ message: `Fallo al eliminar: ${err.detail || "Problema inesperado en comunicacion con servidor"}`, type: "danger" });
            setTimeout(() => setNotification({ message: "", type: "" }), 4000);
        })

    }

    const parseFecha = (fecha: string) => {
        return `${fecha.substring(8, 10)}/${fecha.substring(5, 7)}/${fecha.substring(0, 4)}`
    }

    if (!registros) return (<></>)
    return (
        <div>
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

            <table className="table table-striped my-4 text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarea</th>
                        <th>Fecha de registro</th>
                        <th>Cantidad de horas</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        registros.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.titulo_tarea}</td>
                                <td>{parseFecha(item.fecha_de_registro)}</td>
                                <td>{item.cantidad}</td>
                                <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cargarHorasModal" onClick={() => { setSelectedItem(item); setId(item.id) }}>Modificar</button></td>
                                <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eliminarRegistroModal" onClick={() => setId(item.id)}>Eliminar</button></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

            <EliminarRegistroModal eliminarRegistro={eliminarRegistro} />
            <CargarHorasModal id={legajo} registro={selectedItem} handleSubmit={modificarRegistro} isRequestLoading={isRequestLoading} setIsRequestLoading={setIsRequestLoading} />
        </div>

    )

}