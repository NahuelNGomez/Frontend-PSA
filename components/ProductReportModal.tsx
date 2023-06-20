import { useEffect, useState } from "react";

export default function ProductReportModal(props : any) {
    if(props == undefined){  // || props.id == undefined
        return (<></>)
    }

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("https://apisoporte.onrender.com/reportes/" + props.id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItems(data)
            })
    }, [props.id])


    return (
        <div className="modal fade" id="productReportModal" tabIndex={-1} aria-labelledby="productReportModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="productReportModalLabel">Reporte de producto</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ID: <br />
                        Nombre: <br />
                        Versión: <br />
                        <br />
                        <b>Promedio respuesta de tickets</b>
                        <ul>
                            <li>Promedio en Severidad 1: </li>
                            <li>Promedio en Severidad 2: </li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}