import Link from "next/link";

function formatDate(timestamp: string){
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export default function ProjectsTable({items} : any) {

    const statusList:any = {
        'starting': 'Inicio',
        'developing': 'En desarrollo',
        'implementation': 'En implementación',
        'finished' : 'Finalizado'
    };

    if(!items.length){
        return (<div className="my-4">No se encontraron proyectos. <u><a className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#projectModal">Crear nuevo proyecto</a></u></div>)
    }

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
                            <td>{formatDate(item.start_date)}</td>
                            <td>{formatDate(item.end_date)}</td>
                            <td>{statusList[item.status]}</td>
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