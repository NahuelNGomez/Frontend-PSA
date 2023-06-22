import { useRouter } from "next/router"
import Breadcrumbs from "../../../components/Breadcrumbs"
import ClientsTable from "../../../components/ClientsTable"
import TicketModal from "../../../components/TaskModal"
import { useEffect, useState } from "react"

export default function Clientes() {
    const router = useRouter()
    const version_id = router.query.id;

    interface Version {
        idVersion: number;
        CodigoVersion: string;
        CodigoProducto: 0;
        NombreProducto: string;
        Estado: string;
      }
      
      const [version, setVersion] = useState<Version>();
      
      const [items, setItems] = useState([])

    useEffect(() => {
        fetch("https://apisoporte.onrender.com/licencias/"+ version_id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItems(data)
            })
        fetch("https://apisoporte.onrender.com/versiones/"+ version_id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setVersion(data)
            })    
      }, [])
      console.log(version)
      
      const breadcrumbItems = [
        {
            title: 'Soporte',
            url: '/soporte'
        },
        {
            title: version?.NombreProducto,
            url: '/soporte'
        },
        {
            title: 'Clientes',
            url: '/soporte/' + version_id + '/clientes'
        }
    ]
    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />
                
                <h3 className="fw-light">Listado de clientes</h3>
                <div className="modal-body">
                <tbody>
                    <tr>
                    <h5 className="fw-light">Version: {version?.CodigoVersion ? version.CodigoVersion : "Cargando..."}</h5>
                    <h5 className="fw-light">Nombre De producto: {version?.NombreProducto ? version.NombreProducto : "Cargando..."}</h5>
                    </tr>

                </tbody>
             </div>

                <ClientsTable items={items} />
            </div>

            <TicketModal />
        </section>
    )
}