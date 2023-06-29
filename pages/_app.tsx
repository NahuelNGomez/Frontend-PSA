import "../styles/globals.css"
import Script from 'next/script'
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script src={'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'} integrity={"sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"} crossOrigin={'anonymous'} />
      <Script src={'https://code.jquery.com/jquery-3.7.0.slim.min.js'} integrity={'sha256-tG5mcZUtJsZvyKAxYLVXrmjKBVLd6VpVccqz/r4ypFE='} crossOrigin={'anonymous'} />
    </>
  )
}
