import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Script from 'next/script'

import Layout from '../components/layout'

import '../styles/custom.scss'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const useBanner = router.pathname === '/';

  return (<>
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossOrigin="anonymous"></Script>
    <Layout banner={useBanner}>
      <Component {...pageProps} />
    </Layout>
  </>
  )
}

export default MyApp
