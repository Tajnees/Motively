// app/page.js

import Head from 'next/head';
import PodcastList from './components/PodcastList';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Podcast App</title>
        <meta name="description" content="A simple podcast app" />
      </Head>
      <main>

        <PodcastList />
      </main>
    </div>
  );
};

export default HomePage;
