export default function ProjectTable() {
    return (
        <table className="table table-striped my-4">
            <thead>
                <tr>
                    <th>Número</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Recurso asignado</th>
                    <th style={{width:"10%"}}></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>0001</td>
                    <td>Verificar base de datos</td>
                    <td>Inicio</td>
                    <td>Jorge Ferraressi</td>
                    <td>
                        <button className="btn btn-primary btn-sm">Ver tarea</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}