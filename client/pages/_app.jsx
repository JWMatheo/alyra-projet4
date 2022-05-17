import { useState, useEffect } from 'react';
import { Layout } from '../components';
import '../styles/globals.css';
import { networkConnected, onChangeNetwork, walletConnected } from '../utils/authHandler';

function MyApp({ Component, pageProps }) {
  const [addressConnected, setAddressConnected] = useState(false);
  const [switchLayout, setSwitchLayout] = useState(false);



  useEffect(() => {
    const init = async () => {
      networkConnected();
      onChangeNetwork();
      walletConnected(setAddressConnected);
    };

    init();
  }, []);

  return (
    <Layout addressConnected={addressConnected} setAddressConnected={setAddressConnected}>
      <Component
        switchLayout={switchLayout}
        setSwitchLayout={setSwitchLayout}
        addressConnected={addressConnected}
        {...pageProps}
      />
    </Layout>
  );
}


export default MyApp;

