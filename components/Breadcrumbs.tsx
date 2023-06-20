import Link from "next/link";

export default function Breadcrumbs({items} : any) {

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb py-3 rounded-3">
                {
                    items.map((item: any, index: number) => (
                        <li className={index == 0 ? 'breadcrumb-item active' : 'breadcrumb-item'} key={index}>
                            <Link className={(index == 0 ? 'link-body-emphasis fw-semibold text-decoration-none active' : 'link-body-emphasis text-decoration-none')} href={item.url}>{item.title}</Link>
                        </li>
                    ))
                }
            </ol>
        </nav>
    )
}

/*
<li className="breadcrumb-item active" aria-current="page">
    Tarea o Ticket
</li>
*/