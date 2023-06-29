import Link from "next/link";

export default function Home() {
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">Bienvenido!</h1>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" href="/proyectos">Proyectos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/recursos">Recursos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/soporte">Soporte</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
