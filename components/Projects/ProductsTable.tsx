import Link from "next/link";
import ProductReportModal from "../ProductReportModal";
import { useState } from "react";

export default function ProductsTable({items} : any) {
    const [selectedId, setSelectedId] = useState();

    return (
        <>
            <table className="table table-striped my-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Versión</th>
                        <th>Estado</th>
                        <th style={{width:"25%"}}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{item.idVersion}</td>
                                <td>{item.NombreProducto}</td>
                                <td>{item.CodigoVersion}</td>
                                <td>{item.Estado}</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm mx-1" type="button" data-bs-toggle="modal" data-bs-target="#productReportModal" onClick={() => setSelectedId(item.idVersion)}>Reporte</button>
                                    <Link className="btn btn-primary btn-sm mx-1" href={"/soporte/" + item.idVersion + "/tickets"}>Ver tickets</Link>
                                    <Link className="btn btn-primary btn-sm mx-1" href={"/soporte/" + item.idVersion + "/clientes"}>Ver Clientes</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <ProductReportModal id={selectedId} />
        </>
    )
}