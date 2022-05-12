import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
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

      <Footer/>
    </>
  );
};

export default Layout;
