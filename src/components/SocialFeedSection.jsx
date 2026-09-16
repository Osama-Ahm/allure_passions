import React from 'react';
import { INSTAGRAM_POSTS, CLINIC_INFO } from '../data/treatmentData';
import { Heart, MessageCircle, Play, ExternalLink } from 'lucide-react';

const InstagramIcon = ({ size = 18, color = "#1C1B18" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function SocialFeedSection() {
  return (
    <section id="social-feed" className="section-padding" style={{
      background: '#FFFFFF',
      borderBottom: '1px solid rgba(28, 27, 24, 0.06)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
            <InstagramIcon size={13} color="#A87F3D" /> Clinical Practice & Transformations
          </div>
          <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
            Follow <span className="text-bronze-gradient">{CLINIC_INFO.instagram}</span>
          </h2>
          <p>
            Experience behind-the-scenes clinic life, treatment video demonstrations, patient transformation journeys, and expert educational insights.
          </p>
        </div>

        {/* Instagram Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={`https://instagram.com/allurepassionsuk`}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-card"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                textDecoration: 'none',
                position: 'relative',
                height: '310px',
                display: 'block'
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(28,27,24,0.85) 100%)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.92)',
                    border: '1px solid rgba(168, 127, 61, 0.3)',
                    color: '#A87F3D',
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    {post.type === 'Reel' && <Play size={10} fill="#A87F3D" />}
                    {post.type}
                  </span>
                  <InstagramIcon size={18} color="#FFFFFF" />
                </div>

                <div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                    {post.title}
                  </h4>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: '#E5C98B', fontSize: '0.775rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Heart size={13} fill="#E5C98B" /> {post.likes}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MessageCircle size={13} /> {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Direct Follow Button */}
        <div style={{ textAlign: 'center' }}>
          <a
            href={`https://instagram.com/allurepassionsuk`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-bronze"
          >
            <InstagramIcon size={16} color="#A87F3D" /> Follow Us On Instagram {CLINIC_INFO.instagram} <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
