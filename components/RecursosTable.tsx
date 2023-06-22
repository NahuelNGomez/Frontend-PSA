import Link from "next/link";
import { useState } from "react";

export default function RecursosTable({items} : any) {
    
    return (
        <table className="table table-striped my-4">
            <thead>
                <tr>
                    <th>Legajo</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th style={{width:"10%"}}></th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.legajo}</td>
                            <td>{item.Nombre}</td>
                            <td>{item.Apellido}</td>
                            <td>
                                <Link className="btn btn-primary btn-sm" href={"/recursos/" + item.legajo}>Gestionar</Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}