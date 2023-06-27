import { useRouter } from "next/router";
import ModificarRegistroModal from "./ModificarRegistroModal";
import EliminarRegistroModal from "./EliminarRegistroModal";
import { useState } from "react";
interface RegistroProps {
    id: number,
    cantidad: number,
    fecha_de_registro: string,
    id_tarea: number,
    titulo_tarea: string,
    id_proyecto: number,
    nombre_proyecto: string
}

export default function RegistrosTable({registros} : any) {
    if (!registros) return (<></>)
    const router = useRouter()
    const legajo = router.query.id;
    // let registroAEliminar = {
    //     id: 0,
    //     legajo: legajo
    // };
    const [id, setId] = useState(0)
    const eliminarRegistro = (id:number) => {
        if (confirm("¿Seguro que desea eliminar el registro?")) {
            fetch(`https://rrhh-squad6-1c2023.onrender.com/recursos/${legajo}/registros/${id}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json", "Accept": "application/json" }
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
    }

    // const modificarRegistro = (item: any, legajo: number) => {
    //     <ModificarRegistroModal registro= {item}/>
        
    // }

    return (
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
                            <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eliminarRegistroModal" onClick={() => setId(item.id) }>Eliminar</button></td>
                        </tr>
                    ))
                }
                
            <EliminarRegistroModal idRegistro={id}/>
            </tbody>
        </table>

)

}