import { Link } from 'react-router';
import './Breadcrumbs.css';

/** Trail of links ending in the current page (plan §7.1). `items`: [{ label, to? }]. */
export default function Breadcrumbs({ items }) {
  return (
    <nav className="ap-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {item.to ? (
              <Link to={item.to} viewTransition>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="ap-breadcrumbs__divider" aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
