import React from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Layout = ({ children, title }: LayoutProps) => (
  <div className="bg-indigo-200">
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
      <NavBar />
      <main className="col-span-8 bg-white">
        <article>{children}</article>
      </main>
      <Footer />
    </div>
  </div>
);

export default Layout;
