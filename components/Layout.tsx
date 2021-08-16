import React from 'react';
import Head from 'next/head';
import { NavBar } from './NavBar';
import Footer from './Footer';
import styled from 'styled-components';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Article = styled.article`
  margin: 3em 20em 10em;
`;

const Layout = ({ children, title }: LayoutProps) => (
  <div>
    <Head>
      <title>{`${title} - Mercer Denholm Portfolio`}</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="A portfolio of software projects by Mercer Lee Denholm. View his work or get in contact with him through email, Github, or LinkedIn."
      />
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

export default Layout;
