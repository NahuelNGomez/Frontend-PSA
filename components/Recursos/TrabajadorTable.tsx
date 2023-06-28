import Link from "next/link";

export default function TrabajadorTable({item} : any) {

    return (
        <section className="row py-lg-12 bg-light p-3 rounded">
            <h3 className="fw-light mb-4"> Detalles del trabajador</h3>
            <h4 className="fw-light mb-4">Legajo: {item.legajo}</h4>
            <h4 className="fw-light mb-4">Nombre: {item.Nombre}</h4>
            <h4 className="fw-light mb-4">Apellido: {item.Apellido}</h4>

        </section>
    )
}