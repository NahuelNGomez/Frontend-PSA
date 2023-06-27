import Link from "next/link";
import router from "next/router";

export default function TareasAsignadasTable({items} : any) {


    return (
        <table className="table table-striped my-4">
            <thead>
                <tr>
                    <th>Número de Tarea</th>
                    <th style={{width:"10%"}}></th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.idTarea}</td>
                            <td>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}