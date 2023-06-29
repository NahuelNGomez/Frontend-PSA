import { useState } from "react"
import DeleteTaskModal from "./DeleteTaskModal";
export default function TasksTable({items, resources} : any) {

    const statusList:any = {
        'pending': 'Pendiente',
        'working': 'En curso',
        'reviewing': 'En revisión',
        'finished' : 'Finalizado'
    };
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    if(!items.length){
        return (<div className="my-4">No se encontraron tareas. <u><a className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#taskModal">Crear nueva tarea</a></u></div>)
    }

    return (
        <>
            <table className="table table-striped my-4">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Recurso asignado</th>
                        <th style={{width:"10%"}}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item: any, index: number) => {
                            var resource = resources.find((r: any) => r.legajo == item.employee_id);
                            return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{statusList[item.status]}</td>
                                <td>{resource != undefined ? resource.Nombre + ' ' + resource.Apellido : ''}</td>
                                <td width={'15%'} align="center">
                                    <a href={'/tareas/' + item.id} className="btn btn-primary btn-sm mx-2">Ver tarea</a>
                                    <button className="btn btn-danger btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteTaskModal" onClick={() => setSelectedTaskId(item.id)}>Borrar</button>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <DeleteTaskModal taskId={selectedTaskId} />
        </>
    )
}