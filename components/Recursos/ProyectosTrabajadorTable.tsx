import Link from "next/link";
/*Hay que hacerla cuando se puedan traer los proyectos del recurso seleccionado de un endpoint*/
export default function ProyectosTrabajadorTable({items} : any) {

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
                            <td>{item}</td>    
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}