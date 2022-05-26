import { useState, useEffect } from 'react';
import { Layout } from '../components';
import '../styles/globals.css';
import { networkConnected, onChangeNetwork, walletConnected } from '../utils/web3/authHandler';
import { getListing } from '../utils/web3/getter';
import {mintNFTCollection} from '../utils/web3/mintHandler'


function MyApp({ Component, pageProps }) {
  const [addressConnected, setAddressConnected] = useState();
  const [switchLayout, setSwitchLayout] = useState(false);

  useEffect(() => {
    const init = async () => {
      //await networkConnected();
      //await onChangeNetwork();
      await walletConnected(setAddressConnected);
    const n =  await getListing(4)
    console.log(n);
    //  await mintNFTCollection('Default', 'DFT', 'bafybeideszhe6x7q36ozqigc5cqhfqs7j5zq3qfnsvy3jhvwmh3wmk6wwy', 1)
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
