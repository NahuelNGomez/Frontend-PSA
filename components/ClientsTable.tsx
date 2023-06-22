import Link from "next/link";

export default function ClientsTable({items} : any) {

    return (
        <table className="table table-striped my-4">
            <thead>
                <tr>
                    <th>CUIT</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
            {
                    items.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.CUIT}</td>
                            <td>{item.nombre}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}