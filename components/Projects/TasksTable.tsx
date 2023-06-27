import { useState } from "react";

export default function TasksTable({items} : any) {
    return (
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
                    items.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.status}</td>
                            <td>{item.employeeId}</td>
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