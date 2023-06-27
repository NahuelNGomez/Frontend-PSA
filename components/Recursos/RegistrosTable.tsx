import { useRouter } from "next/router";
import ModificarRegistroModal from "./ModificarRegistroModal";
import EliminarRegistroModal from "./EliminarRegistroModal";
import { useState } from "react";


export default function RegistrosTable({ registros }: any) {
    if (!registros) return (<></>)
    const router = useRouter()
    const legajo = router.query.id;
    const [id, setId] = useState(0)

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
                                <td>{item.fecha_de_registro}</td>
                                <td>{item.cantidad}</td>
                                <td><button type="button" className="btn btn-primary">Modificar</button></td>
                                <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eliminarRegistroModal" onClick={() => setId(item.id)}>Eliminar</button></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            <EliminarRegistroModal idRegistro={id} />
        </div>

    )

}