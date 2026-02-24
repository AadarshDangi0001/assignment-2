import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export default function App() {
  const heroImage =
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80';
  const galleryImage =
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80';
  const avatar =
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80';
  const galleryThumbs = [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=60'
  ];
  const carouselImages = [
    {
      src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=60',
      alt: 'Editorial color pop',
      position: 'left'
    },
    {
      src: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=600&q=70',
      alt: 'Studio joy portrait',
      position: 'center'
    },
    {
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=60',
      alt: 'Elegant side profile',
      position: 'right'
    }
  ];
  const introImages = {
    canopy: 'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?auto=format&fit=crop&w=700&q=60',
    portrait: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80',
    dress: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=70',
    path: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=70'
  };
  const shortMessage =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis pulvinar porttitor viverra dictum.';
  const fallbackAbout =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt sed purus phasellus condimentum sed diam sem. Maecenas fermentum ac aliquet felis.';

  const [companyProfile, setCompanyProfile] = useState({
    name: '',
    about: '',
    whyChoose: ''
  });
  const [companyLoading, setCompanyLoading] = useState(true);
  const [companyError, setCompanyError] = useState('');
  const isMounted = useRef(false);

  const displayName = companyProfile.name || 'Jenny Creative Studio';
  const displayAbout = companyProfile.about || fallbackAbout;
  const displayWhyChoose = companyProfile.whyChoose || shortMessage;

  const fetchCompanyProfile = useCallback(async () => {
    if (!isMounted.current) {
      return;
    }

    setCompanyLoading(true);
    setCompanyError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/company`);

      if (!response.ok) {
        throw new Error('Unable to load company profile from the API');
      }

      const data = await response.json();

      if (isMounted.current) {
        setCompanyProfile({
          name: data.name || '',
          about: data.about || '',
          whyChoose: data.whyChoose || ''
        });
      }
    } catch (error) {
      if (isMounted.current) {
        setCompanyError(error.message || 'Unexpected API error');
      }
    } finally {
      if (isMounted.current) {
        setCompanyLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchCompanyProfile();

    return () => {
      isMounted.current = false;
    };
  }, [fetchCompanyProfile]);

  return (
    <div className="app">
      <main className="jenny-page">
        <div className="texture" aria-hidden="true" />
        <div className="slope slope-right" aria-hidden="true" />

        <div className="dot-grid dot-grid--hero" aria-hidden="true">
          {Array.from({ length: 25 }).map((_, index) => (
            <span key={`hero-dot-${index}`} />
          ))}
        </div>

        <div className="hero">
          <div className="hero__identity">
            <p className="hero__initials">
              {displayName}
            </p>

            <div className="hero__meta">
              <div className="dot-grid dot-grid--mini" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, index) => (
                  <span key={`mini-dot-${index}`} />
                ))}
              </div>
              <div className="followers">
                <div className="followers__score">
                  <span>4.5</span>
                </div>
                <div>
                  <p className="followers__count">15K</p>
                  <p className="followers__label">Followers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero__photo-card">
            <img src={heroImage} alt="Fashion portrait" className="hero__photo" />
            <button className="share" aria-label="Share profile">
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4" />
              </svg>
            </button>
            <div className="profile-card">
              <p className="profile-card__name">I’m Jenny</p>
              <p className="profile-card__handle">@jameswill</p>
              <div className="profile-card__actions">
                <button>Message</button>
                <button>Follow</button>
              </div>
            </div>
          </div>
        </div>

        <section className="intro">
          <div className="intro__stripe" aria-hidden="true" />

          <div className="intro__collage">
            <figure className="intro__tile intro__tile--top">
              <img src={introImages.canopy} alt="Golden forest" />
              <button className="share share--mini" aria-label="Share forest shot">
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4" />
                </svg>
              </button>
            </figure>

            <figure className="intro__tile intro__tile--center">
              <img src={introImages.portrait} alt="Studio portrait" />
              <button className="share share--mini" aria-label="Share portrait shot">
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4" />
                </svg>
              </button>
            </figure>

            <figure className="intro__tile intro__tile--left">
              <img src={introImages.dress} alt="Editorial fashion" />
              <button className="share share--mini" aria-label="Share editorial shot">
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4" />
                </svg>
              </button>
            </figure>

            <figure className="intro__tile intro__tile--bottom">
              <img src={introImages.path} alt="Forest road" />
              <button className="share share--mini" aria-label="Share landscape shot">
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4" />
                </svg>
              </button>
            </figure>
          </div>

          <div className="intro__content">
            <h2>
              MY <br /> INTRO
            </h2>
            <p>{displayAbout}</p>
            <p>
              Eu sagittis, purus auctor curabitur. Pellentesque in quis rhoncus vel sed netus ipsum. Consectetur
              curabitur ante.
            </p>
            <div className="intro__cta">
              <button className="intro__link">About Me</button>
              <button className="intro__link intro__link--accent">Hire Me</button>
            </div>
          </div>
        </section>

        <section className="carousel" aria-label="Featured portraits carousel">
          <div className="carousel__backdrop" aria-hidden="true" />
          <div className="carousel__stack">
            {carouselImages.map((image) => (
              <figure key={image.alt} className={`carousel__card carousel__card--${image.position}`}>
                <img src={image.src} alt={image.alt} />
                <button className="share share--mini" aria-label={`Share ${image.alt}`}>
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4" />
                  </svg>
                </button>
              </figure>
            ))}
          </div>
          <div className="carousel__dots">
            {carouselImages.map((_, index) => (
              <span key={`dot-${index}`} className={`carousel__dot${index === 1 ? ' is-active' : ''}`} />
            ))}
          </div>
        </section>

        <section className="gallery-section">
          <h2>MYGALLERY</h2>
          <article className="spotlight">
            <div className="spotlight__overlay">
              <img src={avatar} alt="Cameron avatar" className="spotlight__avatar" />
              <div>
                <p className="spotlight__name">Cameron Williamson</p>
                <p className="spotlight__tag">@cameronwill_off</p>
              </div>
            </div>
            <button className="spotlight__share" aria-label="Share gallery post">
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4" />
              </svg>
            </button>
            <img src={galleryImage} alt="Gallery highlight" />
            <div className="spotlight__footer">
              <div>
                <p className="spotlight__caption">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor, sapien sed convallis.
                </p>
                <p className="spotlight__handle">Lorem Studio · #portrait</p>
              </div>
              <div className="spotlight__stats">
                <span>❤️ 26</span>
                <span>💬 03</span>
                <span className="spotlight__arrow">➤</span>
              </div>
            </div>
          </article>

          <div className="thumb-row">
            {galleryThumbs.map((src, index) => (
              <img key={`thumb-${index}`} src={src} alt="Gallery thumbnail" />
            ))}
            <span className="thumb-row__spacer" aria-hidden="true" />
          </div>
          <button className="gallery-section__view">
            View all <span>›</span>
          </button>
        </section>

       

        <section className="short-message" aria-label="Closing message">
          <div className="short-message__stripe" aria-hidden="true" />
          <div className="short-message__inner">
            <button className="short-message__view">
              View all <span>›</span>
            </button>
            <h3>SHORT MESSAGE</h3>
            <p className="short-message__body">{displayWhyChoose}</p>
            <p className="short-message__closing">Thank you ! Visit Again</p>
          </div>
        </section>
      </main>
    </div>
  );
}