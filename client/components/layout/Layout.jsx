import Head from 'next/head';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { networkConnected, onChangeNetwork, walletConnected } from '../../utils/authHandler';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, isConnected, setIsConnected }) => {
  useEffect(() => {
    const init = async () => {
      networkConnected();
      onChangeNetwork();
      walletConnected(setIsConnected);
    };

    init();
  }, []);

  return (
    <>
      <Head>
        <link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet" />
        <title>NFT</title>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_GA_TRACKING_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GOOGLE_GA_TRACKING_ID}');
              `,
          }}
        />
      </Head>

      <Header isConnected={isConnected} setIsConnected={setIsConnected} />

      <main>
        {children}
        <ToastContainer />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
