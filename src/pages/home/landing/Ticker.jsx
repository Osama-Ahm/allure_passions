import { tickerItems } from '../../../content/home';
import './Ticker.css';

function TickerGroup({ hidden = false }) {
  return (
    <div className="ap-ticker__group" aria-hidden={hidden || undefined}>
      {tickerItems.map((item) => (
        <span className="ap-ticker__item ap-serif" key={item.text}>
          {item.text}
          {item.accent && (
            <>
              {' '}
              <em>{item.accent}</em>
            </>
          )}
          {item.after && ` ${item.after}`}
        </span>
      ))}
    </div>
  );
}

/** The credentials, drifting past under the hero. Pauses on hover and focus. */
export default function Ticker() {
  return (
    <div className="ap-ticker" role="region" aria-label="Credentials">
      <div className="ap-ticker__track">
        <TickerGroup />
        <TickerGroup hidden />
      </div>
    </div>
  );
}
