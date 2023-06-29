import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

import Header from '../components/Header'
//import Footer from '../components/Footer'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href={"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"} rel={"stylesheet"} integrity={"sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"} crossOrigin={"anonymous"} />
      </Head>
      <body>
        <Header />

        <div className='container'>
          <Main />
        </div>

        <Script src={"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"} integrity={"sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"} crossOrigin={"anonymous"}></Script>

        <NextScript />
      </body>
    </Html>
  )
}
