import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import NavBar from './NavBar';
import Footer from './Footer';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Article = styled.article`
  padding-top: 1em;
  padding-bottom: 1em;
  max-width: 70em;
  margin: 0 auto;
  padding: 0.5em;
`;

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{`${title} - MataBlog`}</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A small blog for Mercer Denholm" />
      </Head>

      <div>
        <header>
          <NavBar />
        </header>

        <main>
          <Article>{children}</Article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
