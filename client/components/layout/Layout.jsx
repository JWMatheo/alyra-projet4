import Head from 'next/head';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { networkConnected, onChangeNetwork, walletConnected } from '../../utils/authHandler';
import { notification } from '../../utils/notification';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, isConnected, setIsConnected }) => {
  useEffect(() => {
    const init = async () => {
      networkConnected();
      onChangeNetwork();
      walletConnected(setIsConnected)
    };

    init();
  }, []);

  return (
    <>
      <Head>
        <link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet" />
        <title>NFT</title>
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
