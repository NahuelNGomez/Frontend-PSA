import { Html, Head, Main, NextScript } from 'next/document'
import Header from '../components/Header'

export default function Document() {
  return (
    <Html lang="en">
      <body>
        <Head>
          <link href={"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"} rel={"stylesheet"} integrity={"sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"} crossOrigin={"anonymous"} />
        </Head>
        <Header />

        <div className='container'>
          <Main />
        </div>

        <NextScript />
      </body>
    </Html>
  )
}
