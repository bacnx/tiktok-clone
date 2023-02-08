import { useState, useEffect } from 'react';
import VideoPost from '~/components/VideoPost';
import { videoServices } from '~/services';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    videoServices.getVideosList().then((res) => {
      setVideos(res);
    });
  }, []);

  return (
    <div style={{ maxWidth: '692px', marginLeft: 'auto' }}>
      {videos?.map((video) => {
        return <VideoPost key={video.id} data={video} />;
      })}
    </div>
  );
}

export default Home;
