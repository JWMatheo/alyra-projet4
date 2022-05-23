import { useState, useEffect } from 'react';
import { Layout } from '../components';
import '../styles/globals.css';
import { networkConnected, onChangeNetwork, walletConnected } from '../utils/web3/authHandler';

function MyApp({ Component, pageProps }) {
  const [addressConnected, setAddressConnected] = useState();
  const [switchLayout, setSwitchLayout] = useState(false);

  useEffect(() => {
    const init = async () => {
      //await networkConnected();
      //await onChangeNetwork();
      await walletConnected(setAddressConnected);
    };

    init();
  }, [setAddressConnected, addressConnected]);


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
