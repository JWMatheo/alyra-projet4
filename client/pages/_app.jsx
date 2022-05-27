import { useState, useEffect } from 'react';
import { Layout } from '../components';
import '../styles/globals.css';
import { createUserAndCollectionSanity } from '../utils/handlerFactory';
import { networkConnected, onChangeNetwork, walletConnected } from '../utils/web3/authHandler';

function MyApp({ Component, pageProps }) {
  const [addressConnected, setAddressConnected] = useState();
  const [switchLayout, setSwitchLayout] = useState(false);
  const [_window, set_window] = useState(null);
  useEffect(() => {
    const init = async () => {
      await networkConnected();
      await onChangeNetwork();
      await walletConnected(setAddressConnected);
    };
    set_window(window);
    init();
  }, [setAddressConnected, addressConnected]);

  // Change account event
  if (_window) {
    _window.ethereum.on('accountsChanged', async function (accounts) {
      setAddressConnected(accounts[0]);
      createUserAndCollectionSanity(accounts[0])
    });
  }


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
