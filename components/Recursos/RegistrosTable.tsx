import { useRouter } from "next/router";
import EliminarRegistroModal from "./EliminarRegistroModal";
import { useEffect, useState } from "react";
import CargarHorasModal from "./CargarHorasModal";


export default function RegistrosTable({ registros }: any) {
    if (!registros) return (<></>)
    const router = useRouter()
    const legajo = router.query.id;
    const [id, setId] = useState(0)
    const [selectedItem, setSelectedItem] = useState<object>({})

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
            return res.json()
        })

    }

    const parseFecha = (fecha:string) => {
        return `${fecha.substring(8,10)}/${fecha.substring(5,7)}/${fecha.substring(0,4)}`
    } 

    return (
        <div>
            <table className="table table-striped my-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Proyecto</th>
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
                                <td>{item.nombre_proyecto}</td>
                                <td>{item.titulo_tarea}</td>
                                <td>{parseFecha(item.fecha_de_registro)}</td>
                                <td>{item.cantidad}</td>
                                <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cargarHorasModal" onClick={() => {setSelectedItem(item); setId(item.id)}}>Modificar</button></td>
                                <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eliminarRegistroModal" onClick={() => setId(item.id)}>Eliminar</button></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            
            <EliminarRegistroModal idRegistro={id} />
            <CargarHorasModal id={legajo} registro={selectedItem} handleSubmit={modificarRegistro} />
        </div>

    )

}