import Link from "next/link";

export default function TrabajadorTable({item} : any) {

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
                <td>{item.legajo}</td>
                <td>{item.Nombre}</td>
                <td>{item.Apellido}</td>
                
            </tbody>
        </table>
    )
}