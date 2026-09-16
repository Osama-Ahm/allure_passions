import React from 'react';

// Renders ® and ™ as small raised marks; Cormorant draws them at full cap height.
export function withTrademarks(text = '') {
  return text.split(/([®™])/).map((part, index) =>
    part === '®' || part === '™' ? (
      <span key={index} className="ap-mark">
        {part}
      </span>
    ) : (
      part
    )
  );
}
