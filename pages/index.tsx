import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../auth/AuthContext';
import Layout from '../components/Layout';
import PostListDisplay from '../components/PostListDisplay';

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <Layout title="Home">
        <section>
          <h1>Timeline</h1>
          <PostListDisplay
            getPostsForm={{
              pageSize: 24,
              category: 'ROOT',
              following: true,
            }}
            noPostsLabel="You are not following any blogs yet."
          />
        </section>
      </Layout>
    </div>
  );
}
