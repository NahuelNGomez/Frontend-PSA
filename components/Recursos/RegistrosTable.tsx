import Link from "next/link";
import { useEffect, useState } from "react";

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
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )

}