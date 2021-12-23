import React, { useState} from 'react';
import ReactMarkdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton';
import Layout from '../components/Layout';
import aboutmd from '../config/about.md';
export default function About() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('loading');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'loading') {
      getAboutPage()
        .then((res) => {
          setContent(res);
          setStatus('idle');
        })
        .catch((err) => {
          setErrors([...errors, err]);
          setStatus('error');
        });
    }
  }, [errors, status]);

  return (
    <div>
      <Layout title="About">
        <h1>About</h1>
        <ErrorAlert errors={errors} />
        {status === 'loading' ? (
          <>
            <Skeleton count={6} />
          </>
        ) : (
          <ReactMarkdown source={content} />
        )}
      </Layout>
    </div>
  );
}
