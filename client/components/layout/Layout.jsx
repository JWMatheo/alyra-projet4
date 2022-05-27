import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Header from './Header';
import { useRouter } from 'next/router'
const Layout = ({ children, addressConnected, setAddressConnected }) => {
  const router = useRouter()
  console.log(router.pathname);
const subtitle = router.pathname.split('/')[1]
  return (
    <>
      <Head>
        <link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet" />
        <title>NFT{subtitle ? subtitle : 'Home'} </title>
{/*         <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_GA_TRACKING_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GOOGLE_GA_TRACKING_ID}');
              `,
          }}
        /> */}
      </Head>

      <Header addressConnected={addressConnected} setAddressConnected={setAddressConnected} />

      <main>
        {children}
        <ToastContainer />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
