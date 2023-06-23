import Link from "next/link";

export default function TrabajadorTable({item} : any) {

    return (
        <section className="row py-lg-12 bg-light p-3">
            <h3 className="fw-light mb-4"> Detalles del trabajador</h3>
            <h4 className="fw-light mb-4">Legajo: {item.legajo}</h4>
            <h4 className="fw-light mb-4">Nombre: {item.Nombre}</h4>
            <h4 className="fw-light mb-4">Apellido: {item.Apellido}</h4>

        </section>
        // <table className="table table-striped my-4">
        //     <thead>
        //         <tr>
        //             <th>Legajo</th>
        //             <th>Nombre</th>
        //             <th>Apellido</th>
        //             <th style={{width:"10%"}}></th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <td>{item.legajo}</td>
        //         <td>{item.Nombre}</td>
        //         <td>{item.Apellido}</td>
                
        //     </tbody>
        // </table>
    )
}