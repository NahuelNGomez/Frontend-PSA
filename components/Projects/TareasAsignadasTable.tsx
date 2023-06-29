import Link from "next/link";
import router from "next/router";

export default function TareasAsignadasTable({items} : any) {
    return (
        <table className="table table-striped my-4">
            <thead>
                <tr>
                    <th>Número de Tarea</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>RecursoAsignado</th>
                    <th style={{width:"10%"}}></th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.idTarea}</td>
                            <td>{item.nombre}</td>
                            <td>{item.estado}</td>
                            <td>{item.recursoAsignado}</td>
                            <td>
                                <a href={'/tareas/' + item.id} className="btn btn-primary btn-sm">Ver tarea</a>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}