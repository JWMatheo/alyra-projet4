import { useState } from 'react';
import { Layout } from '../components';
import '../styles/globals.css';
// https://nftavatarmaker.com/assets/main-nft.png
function MyApp({ Component, pageProps }) {
const [isConnected, setIsConnected] = useState(false);

  return (
    <Layout isConnected={isConnected} setIsConnected={setIsConnected}>
      <Component isConnected={isConnected} {...pageProps} />
    </Layout>
  );
}

export default MyApp;
