import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import shape3 from '../../images/slider/shape-3.svg';
import video1 from '../../images/slider/cry-hero-video.mp4';
import video2 from '../../images/slider/new-video.mp4';
import './hero3.css';

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const videos = [video1, video2];

const badges = [
  { icon: '✔', label: '7,000+ Children Impacted' },
  { icon: '✔', label: '100% Fund Transparency' },
  { icon: '✔', label: '4+ States Reached' },
];

const Hero3 = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [playing, setPlaying] = useState(true);
  const mainVideoRef = useRef(null);

  const switchVideo = (idx) => {
    if (idx === activeIdx) return;
    setFading(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setPlaying(true);
      setFading(false);
    }, 350);
  };

  useEffect(() => {
    const vid = mainVideoRef.current;
    if (!vid) return;
    if (playing) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [playing, activeIdx]);

  const togglePlay = () => setPlaying((p) => !p);

  const thumbIdx = activeIdx === 0 ? 1 : 0;

  return (
    <section className="static-hero rg-hero">
      <div className="rg-hero__inner">

        {/* ─── LEFT: VIDEO ──────────────────────── */}
        <div className="rg-hero__left">
          <div className="rg-video-frame">
            <div
              className={`rg-video-main ${fading ? 'rg-video-main--fade' : ''}`}
              onClick={togglePlay}
            >
              <video
                ref={mainVideoRef}
                src={videos[activeIdx]}
                autoPlay
                muted
                loop
                playsInline
              />
              <button
                className={`rg-video-playbtn ${!playing ? 'rg-video-playbtn--visible' : ''}`}
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
                    <path d="M6 4l14 8-14 8z" />
                  </svg>
                )}
              </button>
            </div>

            <div
              className="rg-video-thumb"
              onClick={() => switchVideo(thumbIdx)}
              title="Watch Another Story"
            >
              <video src={videos[thumbIdx]} muted playsInline preload="metadata" />
              <span className="rg-video-thumb__label">▶ Watch Another Story</span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: TEXT ──────────────────────── */}
        <div className="rg-hero__right">
          <svg className="rg-hero__heart" viewBox="0 0 60 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 50S5 33 5 17a13 13 0 0 1 25-5 13 13 0 0 1 25 5C55 33 30 50 30 50Z" stroke="#FBAD17" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M30 50S5 33 5 17a13 13 0 0 1 25-5 13 13 0 0 1 25 5C55 33 30 50 30 50Z" stroke="#2727a8" strokeWidth="1" strokeDasharray="4 4" fill="none" />
          </svg>

          <h1 className="rg-hero__heading">
            <span className="rg-hero__highlight-orange">Reddington Global Care Foundation </span>
            <span className="rg-hero__highlight-dark">To Educate Underprivileged Children Of India</span>
          </h1>

          <p className="rg-hero__subtext">
            Bridging the education gap for underprivileged children through transparent,
            community-driven programs across India.
          </p>

          <div className="rg-hero__btns">
            <Link onClick={ClickHandler} className="rg-hero__cta rg-hero__cta--primary" to="/donate">
              Donate Now
            </Link>
            <Link onClick={ClickHandler} className="rg-hero__cta rg-hero__cta--secondary" to="/volunteer">
              Volunteer With Us
            </Link>
          </div>

          <div className="rg-hero__badges">
            {badges.map((b, i) => (
              <div className="rg-hero__badge" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
                <span className="rg-hero__badge-icon">{b.icon}</span>
                <span className="rg-hero__badge-label">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="shape-2" style={{ position: 'absolute', left: 40, bottom: 100, zIndex: -1 }}>
        <img src={shape3} alt="" />
      </div>
    </section>
  );
};

export default Hero3;
