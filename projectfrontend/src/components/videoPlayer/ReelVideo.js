import React, { useRef, useEffect } from 'react';

const ReelVideo = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVisibilityChange = () => {
      /* if (document.visibilityState === 'visible') {
        videoElement.play();
      } else {
        videoElement.pause();
      } */
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      src={src || "https://res.cloudinary.com/drhiix8od/video/upload/v1721448076/junun9zyizwuzgebksrw.mp4"}
      autoPlay
      loop
      controls={false}
      playsInline
    />
  );
};

export default ReelVideo;
