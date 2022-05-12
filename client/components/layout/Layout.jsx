import Head from 'next/head';
import { useEffect } from 'react';
import { networkConnected } from '../../utils/authHandler';
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
    window.ethereum.on('networkChanged', function (networkId) {
      // If network is not 4, so rinkeby
      if (networkId === 4) {
        setAllow(true);
      } else {
        alert("This app doesn't work on mainet ethereum");
        setAllow(false);
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

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
