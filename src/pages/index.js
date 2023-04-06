import Head from 'next/head';
import { getAllPublished } from '@/pages/utils/notion';
import { IoLinkOutline } from 'react-icons/io5';
import styles from '@/styles/index.module.scss';

export default function Home({ posts }) {
  if (!posts) return <h1>No posts</h1>;
  const title = 'const {snippets} = code';

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="All the code belongs to us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.wrap}>
        <h1>{title}</h1>
        <section className={styles['c-cat']}>
          {posts.map((post, index) => (
            <article className={styles['c-article']} key={index}>
              <h2 className={styles['c-article__title']}>
                <a href={post.url} target="_blank">
                  {post.title} <IoLinkOutline color="#F1FDCC" />
                </a>
              </h2>
              <p>{post.description}</p>
              <time>{post.date.toLowerCase()}</time>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await getAllPublished();

  return {
    props: {
      posts: data,
    },
    revalidate: 60,
  };
};
