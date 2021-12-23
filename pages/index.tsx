import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import PostListDisplay from '../components/PostListDisplay';

export default function Home() {
  return (
    <div>
      <Layout title="Home">
        <section>
          <h1>Timeline</h1>
          <PostListDisplay
            postSearchForm={{ pageSize: 24, category: 'ROOT' }}
          />
        </section>
      </Layout>
    </div>
  );
}
