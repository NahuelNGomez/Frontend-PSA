import { useRouter } from "next/router"
import Breadcrumbs from "../../../components/Breadcrumbs"
import ClientsTable from "../../../components/ClientsTable"
import TicketModal from "../../../components/Projects/TaskModal"
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
        if(router.query.id){ 
        fetch("https://apisoporte.onrender.com/licencias/"+ router.query.id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItems(data)
            })
        fetch("https://apisoporte.onrender.com/versiones/"+ router.query.id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setVersion(data)
            })    
        }
      }, [router.query.id])
      
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
            url: '/soporte/' + router.query.id + '/clientes'
        }
    ]

    if(version == null){
        return (<div className="container text-center">
            <div className="row align-items-center">
                <div className="col my-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>)
    }
    return (
        <section className="row py-lg-12">
            <div className="col-lg-12">
                <Breadcrumbs items={breadcrumbItems} />
                
                <h3 className="fw-light">Listado de clientes</h3>
                <div className="modal-body">
                    <h5 className="fw-light">Version: {version?.CodigoVersion ? version.CodigoVersion : "Cargando..."}</h5>
                    <h5 className="fw-light">Nombre De producto: {version?.NombreProducto ? version.NombreProducto : "Cargando..."}</h5>
                </div>
                <ClientsTable items={items} />
            </div>
            <TicketModal />
        </section>
    )
}