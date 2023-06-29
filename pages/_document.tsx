import { Html, Main, NextScript } from 'next/document'
import Header from '../components/Header'

export default function Document() {
  return (
    <Html lang="en">
      <body>
        <Header />

        <div className='container'>
          <Main />
        </div>

        <NextScript />
      </body>
    </Html>
  )
}
