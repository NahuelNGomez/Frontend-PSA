import Link from "next/link"
import { useRouter } from "next/router"

export default function Header() {
  return (
    <>
      <header className="py-3 border-bottom text-bg-dark">
        <div className="container d-flex flex-wrap justify-content-center">
          <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
            <span className="text-white fs-4">Praxis Systems Argentina</span>
          </a>
        </div>
      </header>
      <nav className="py-2 bg-body-tertiary border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <a href="/proyectos" className="nav-link link-body-emphasis px-2 active" aria-current="page">Proyectos</a>
            </li>
            <li className="nav-item">
              <a href="/recursos" className="nav-link link-body-emphasis px-2">Recursos</a>
            </li>
            <li className="nav-item">
              <a href="/soporte" className="nav-link link-body-emphasis px-2">Soporte</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}