import React from 'react';
import { CLINIC_INFO } from '../data/treatmentData';
import SplitWords from '../motion/SplitWords';

const InstagramIcon = ({ size = 18, color = "#1C1B18" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const INSTAGRAM_POSTS = [
  {
    image: '/assets/images/hero_clinic_ambiance.png',
    caption: 'Clinical precision during Morpheus8 subdermal remodeling in our Knightsbridge suite.',
    tag: '#Morpheus8 #Knightsbridge',
  },
  {
    image: '/assets/images/practitioner_portrait.jpg',
    caption: 'Meet Abigail, Clinic Founder & Level 6 Medical Aesthetician at Allure Passions UK.',
    tag: '#AllurePassionsUK #ClinicalLead',
  },
  {
    image: '/assets/images/emsculpt_applicator.jpg',
    caption: 'Dual action Emsculpt Neo: 30% subcutaneous fat apoptosis and 25% muscle toning.',
    tag: '#EmsculptNeo #BodySculpting',
  },
  {
    image: '/assets/images/prefooter_serum.jpg',
    caption: 'Post-laser barrier recovery and cellular hydration protocols for glowing skin.',
    tag: '#ClinicalSkincare #SkinHealth',
  },
];

export default function InstagramSection() {
  return (
    <section
      style={{
        backgroundColor: '#F5F0EA',
        padding: '6rem 0',
        borderBottom: '1px solid rgba(28, 27, 24, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            data-reveal
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A87F3D',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            Behind The Scenes
          </div>
          <h2
            data-reveal="words"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: '#1C1B18',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '0.75rem',
            }}
          >
            <SplitWords>
              Follow Our Journey{' '}
              <a
                href="https://www.instagram.com/allurepassionsuk"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#A87F3D', textDecoration: 'none' }}
              >
                {CLINIC_INFO.instagram}
              </a>
            </SplitWords>
          </h2>
          <p
            data-reveal
            style={{
              color: '#4A4740',
              fontSize: '1rem',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            Daily clinical insights, practitioner masterclasses, and patient transformations from 189 Brompton Road.
          </p>
        </div>

        {/* 4 Square Photo Grid (Figma Exact) */}
        <div
          data-reveal-children
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {INSTAGRAM_POSTS.map((post, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/allurepassionsuk"
              target="_blank"
              rel="noopener noreferrer"
              className="card-white-elevation ap-hover-zoom"
              style={{
                display: 'block',
                textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '1/1',
                backgroundColor: '#1C1B18',
              }}
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1.0)';
                }}
              />

              {/* Hover Overlay with Instagram Icon */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(20, 19, 17, 0.2) 0%, rgba(20, 19, 17, 0.85) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  color: '#FFFFFF',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1C1B18',
                    }}
                  >
                    <InstagramIcon size={18} color="#1C1B18" />
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: '0.8rem', lineHeight: '1.4', color: '#ECE8E1', marginBottom: '0.35rem' }}>
                    {post.caption}
                  </p>
                  <span style={{ fontSize: '0.72rem', color: '#D4AF37', fontWeight: '600' }}>
                    {post.tag}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
