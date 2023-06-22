import Link from "next/link";

export default function TicketsTable({items} : any) {

    return (
        <table className="table table-striped my-4">
            <thead>
                <tr>
                    <th>Número de ticket</th>
                    <th>Nombre</th>
                    <th style={{textAlign: 'center'}}>Estado</th>
                    <th style={{textAlign: 'center'}}>Severidad</th>
                    <th>Tiempo restante</th>
                    <th style={{width:"10%"}}></th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.Nombre}</td>
                            <td align="center">{item.Estado}</td>
                            <td align="center">{item.Severidad}</td>
                            <td>Tiempo_RESTANTE</td>
                            <td>
                                <Link className="btn btn-primary btn-sm disabled" href={"/ticket/" + item.id}>Ver ticket</Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}