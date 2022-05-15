import { useState, useEffect } from 'react';
import { Layout } from '../components';
import '../styles/globals.css';
import sanity from '../lib/sanity';

function MyApp({ Component, pageProps, data }) {
  const [isConnected, setIsConnected] = useState(false);
  const [switchLayout, setSwitchLayout] = useState(false);
console.log(data);

  return (
    <Layout isConnected={isConnected} setIsConnected={setIsConnected}>
      <Component
        switchLayout={switchLayout}
        setSwitchLayout={setSwitchLayout}
        isConnected={isConnected}
        {...pageProps}
      />
    </Layout>
  );
}


export default MyApp;
