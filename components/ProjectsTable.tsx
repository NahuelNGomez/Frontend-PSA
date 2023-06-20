import Link from "next/link";

export default function ProjectsTable({items} : any) {

    return (
        <table className="table table-striped my-4">
            <thead>
                <tr>
                    <th>Número</th>
                    <th>Nombre</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Estado</th>
                    <th style={{width:"10%"}}></th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.number}</td>
                            <td>{item.name}</td>
                            <td>{item.start_date}</td>
                            <td>{item.finish_date}</td>
                            <td>{item.status}</td>
                            <td>
                                <Link className="btn btn-primary btn-sm" href={"/proyectos/" + item.id}>Ver proyecto</Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}