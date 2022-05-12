import Head from 'next/head';
import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet" />
        <title>NFT</title>
      </Head>

      <Header />

      <main>{children}</main>
    </>
  );
};

export default Layout;
