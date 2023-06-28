import { useRouter } from "next/router"
import Breadcrumbs from "../../../components/Breadcrumbs"
import TicketsTable from "../../../components/Projects/TicketsTable"
import { useEffect, useState } from "react"
import CrearTicketModal from "../../../components/Projects/CrearTicketModal"

export default function Tickets() {
    const router = useRouter()
    const version_id = router.query.id;
    
    interface Version {
        idVersion: number;
        CodigoVersion: string;
        CodigoProducto: 0;
        NombreProducto: string;
        Estado: string;
      }

      interface Recurso {
        legajo: number;
        Nombre: string;
        Apellido: string;
      }
      
      const [version, setVersion] = useState<Version>();
      const [items, setItems] = useState([])
      const [recursos, setRecursos] = useState<Recurso[]>([])
      const [clientes, setClientes] = useState([])

    useEffect(() => {
        if(router.query.id){ 
        fetch("https://apisoporte.onrender.com/versiones/"+ router.query.id + "/tickets" )
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
            
        fetch("https://rrhh-squad6-1c2023.onrender.com/recursos")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setRecursos(data)
            })
        fetch("https://apisoporte.onrender.com/clientes")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setClientes(data)
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
            title: 'Tickets',
            url: '/soporte/' + router.query.id + '/tickets'
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
                <h3 className="fw-light">Listado de tickets</h3>
                <div className="modal-body">
                            <h5 className="fw-light">Version: {version?.CodigoVersion ? version.CodigoVersion : "Cargando..."}</h5>
                            <h5 className="fw-light">Nombre De producto: {version?.NombreProducto ? version.NombreProducto : "Cargando..."}</h5>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Buscar..." aria-label="Buscar..." aria-describedby="search" />
                            <button className="btn btn-dark" type="button" id="search">
                                <i className="bi bi-search"></i> Buscar ticket
                            </button>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#crearTicketModal">Nuevo ticket</button>
                        </div>
                    </div>
                </div>
            <TicketsTable items={items} />
            </div>
            <CrearTicketModal version_id={router.query.id} recursos={recursos} clientes={clientes}/>
        </section>
    )
}
