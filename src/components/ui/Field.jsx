import { CircleAlert } from 'lucide-react';
import { useId } from 'react';
import cx from '../../lib/cx';
import './Field.css';

/** Label, control, optional help and an error linked through aria-describedby. */
function FieldShell({ id, label, help, error, required, children, className }) {
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cx('ap-field', error && 'is-invalid', className)}>
      <label className="ap-field__label" htmlFor={id}>
        {label}
        {required && <span className="ap-field__required"> (required)</span>}
      </label>
      {help && (
        <p className="ap-field__help" id={helpId}>
          {help}
        </p>
      )}
      {children({ helpId, errorId })}
      {error && (
        <p className="ap-field__error" id={errorId}>
          <CircleAlert aria-hidden="true" size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({ label, help, error, required, type = 'text', className, ...rest }) {
  const id = useId();

  return (
    <FieldShell id={id} label={label} help={help} error={error} required={required} className={className}>
      {({ helpId, errorId }) => (
        <input
          id={id}
          type={type}
          className="ap-field__input"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={cx(helpId, errorId) || undefined}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

export function TextArea({ label, help, error, required, rows = 4, className, ...rest }) {
  const id = useId();

  return (
    <FieldShell id={id} label={label} help={help} error={error} required={required} className={className}>
      {({ helpId, errorId }) => (
        <textarea
          id={id}
          rows={rows}
          className="ap-field__input ap-field__textarea"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={cx(helpId, errorId) || undefined}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

export function Select({ label, help, error, required, options, className, ...rest }) {
  const id = useId();

  return (
    <FieldShell id={id} label={label} help={help} error={error} required={required} className={className}>
      {({ helpId, errorId }) => (
        <select
          id={id}
          className="ap-field__input ap-field__select"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={cx(helpId, errorId) || undefined}
          {...rest}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}

/** Radio group rendered as selectable cards (plan §8.6, RadioCards). */
export function RadioCards({ label, help, error, required, name, options, value, onChange, className }) {
  const id = useId();
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <fieldset className={cx('ap-field', 'ap-field--group', error && 'is-invalid', className)}>
      <legend className="ap-field__label">
        {label}
        {required && <span className="ap-field__required"> (required)</span>}
      </legend>
      {help && (
        <p className="ap-field__help" id={helpId}>
          {help}
        </p>
      )}
      <div className="ap-radio-cards" role="radiogroup" aria-describedby={cx(helpId, errorId) || undefined}>
        {options.map((option) => (
          <label className={cx('ap-radio-card', value === option.value && 'is-selected')} key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="ap-field__error" id={errorId}>
          <CircleAlert aria-hidden="true" size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function Checkbox({ label, error, className, ...rest }) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cx('ap-field', 'ap-field--checkbox', error && 'is-invalid', className)}>
      <label className="ap-checkbox" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...rest}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p className="ap-field__error" id={errorId}>
          <CircleAlert aria-hidden="true" size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {error}
        </p>
      )}
    </div>
  );
}
