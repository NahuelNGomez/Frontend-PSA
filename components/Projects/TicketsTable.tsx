import Link from "next/link";

export default function TicketsTable({items} : any) {

    function subtractDates(FechaDeCreacion: any, arg1: number): import("react").ReactNode {
        const currentDate = new Date();
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Cantidad de milisegundos en un día
        const creationTimestamp = new Date(FechaDeCreacion).getTime();
        const targetTimestamp = creationTimestamp + ( arg1 * millisecondsPerDay);
        const difference = Math.floor((targetTimestamp - currentDate.getTime()) / millisecondsPerDay);
        return `${difference} días restantes`;
    }

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
                            <td>
                            {
                                item.Severidad === 'S1' ? subtractDates(item.FechaDeCreacion, 7) :
                                item.Severidad === 'S2' ? subtractDates(item.FechaDeCreacion, 30) :
                                item.Severidad === 'S3' ? subtractDates(item.FechaDeCreacion, 90) :
                                subtractDates(item.FechaDeCreacion, 365)
                            }
                            </td>
                            <td>
                            <Link className="btn btn-primary btn-sm" href={"/soporte/" + item.idVersion + "/tickets/" + item.id}>Ver ticket</Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}