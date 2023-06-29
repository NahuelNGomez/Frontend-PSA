import { useEffect, useState } from "react"

export default function ProductReportModal(props : any) {
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        if(props.id != undefined){
            fetch("https://apisoporte.onrender.com/reportes/" + props.id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItem(data)
            })
        }
    }, [props.id])

    if(item == null) return (<></>)

    return (
        <div className="modal fade" id="productReportModal" tabIndex={-1} aria-labelledby="productReportModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="productReportModalLabel">Reporte de producto</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {item ? (
                            <div>
                                ID: {props.id} <br />
                                Nombre: {item.NombreProducto} <br />
                                Versión: {item.CodigoVersion} <br /> 
                                <br />
                                <b>Promedio respuesta de tickets</b>
                                <ul>
                                    <li className="m-3">Promedio en Severidad 1: {item.PromedioS1} días </li>
                                    <li className="m-3">Promedio en Severidad 2: {item.PromedioS2} días</li>
                                    <li className="m-3">Promedio en Severidad 3: {item.PromedioS3} días</li>
                                    <li className="m-3">Promedio en Severidad 4: {item.PromedioS4} días</li>
                                </ul>
                            </div>
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}