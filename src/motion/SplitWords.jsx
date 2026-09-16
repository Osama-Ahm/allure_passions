import React, { Children, cloneElement, isValidElement } from 'react';

function splitNode(node, counter) {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
      .split(/(\s+)/)
      .filter(Boolean)
      .map((part) => {
        if (/^\s+$/.test(part)) return ' ';
        const index = counter.value++;
        return (
          <span key={`word-${index}`} className="ap-word">
            <span style={{ '--word-index': index }}>{part}</span>
          </span>
        );
      });
  }

  if (isValidElement(node) && node.props.children != null) {
    return [cloneElement(node, undefined, splitChildren(node.props.children, counter))];
  }

  return [node];
}

function splitChildren(children, counter) {
  return Children.toArray(children).flatMap((child) => splitNode(child, counter));
}

/**
 * Wraps every word (including words inside nested elements such as <em>) in a
 * mask so headings can rise in word by word. Pair with data-reveal="words" on
 * the heading, or the .hero-title choreography.
 */
export default function SplitWords({ children }) {
  return <>{splitChildren(children, { value: 0 })}</>;
}
