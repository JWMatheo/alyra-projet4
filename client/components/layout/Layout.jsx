import Head from 'next/head';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { networkConnected } from '../../utils/authHandler';
import { notification } from '../../utils/notification';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  useEffect(() => {
    const init = async () => {
      // Check Network connected et Ru
      const network = await networkConnected();

      network !== 'rinkeby' && 'Notification';
    };

    // detect Network account change
    window.ethereum.on('chainChanged', function (networkId) {
      // If network is not 4, so rinkeby
      console.log(typeof networkId);
      if (networkId === '4') {
        return notification('success', 'Good choose ! Welcome back 😃');
      } else {
        return notification('warn', 'You doesn\'t use Rinkeby network');
      }
    });

    init();
  }, []);

  return (
    <>
      <Head>
        <link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet" />
        <title>NFT</title>
      </Head>

      <Header />

      <main>
        {children}
        <ToastContainer />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
