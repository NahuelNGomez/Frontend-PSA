import Link from "next/link";

function formatDate(timestamp: string){
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

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
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{formatDate(item.startDate)}</td>
                            <td>{formatDate(item.endDate)}</td>
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