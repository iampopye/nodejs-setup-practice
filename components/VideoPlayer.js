import ReactHlsPlayer from 'react-hls-player';
import asset from '../lib/asset';

export default function VideoPlayer() {
  return (
    <div
      style={{
        marginTop: '2rem',
        boxShadow: '1px 1px 10px rgba(0,0,0,1)',
      }}
    >
      {/* react-hls-player v3 renamed `url` to `src` and `autoplay` to
          `autoPlay`; the old names were being silently ignored. The poster
          path also needed a leading slash to resolve from nested routes. */}
      <ReactHlsPlayer
        src="https://stream.mux.com/ASlzqxSwpCm6D8hNftrvMnI003z2kYaCi.m3u8"
        autoPlay
        controls
        width="100%"
        poster={asset('/static/live-poster.png')}
        height="auto"
      />
    </div>
  );
}
