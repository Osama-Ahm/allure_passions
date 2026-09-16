import './PriceTable.css';

/**
 * A price category as a table: area, single session and course (plan §7.1,
 * §7.3). The course column is dropped where no row in the category has one.
 */
export default function PriceTable({ category }) {
  const hasCourse = category.items.some((item) => item.course);

  return (
    <div className="ap-prices">
      <table className="ap-prices__table">
        <caption className="ap-visually-hidden">
          {category.title}: {category.subtitle}
        </caption>
        <thead>
          <tr>
            <th scope="col">Treatment area</th>
            <th scope="col">Single session</th>
            {hasCourse && <th scope="col">Course</th>}
          </tr>
        </thead>
        <tbody>
          {category.items.map((item) => (
            <tr key={item.name}>
              <th scope="row">{item.name}</th>
              <td className="ap-nums">{item.single ?? '—'}</td>
              {hasCourse && (
                <td className="ap-nums">
                  {item.course ? (
                    <>
                      {item.course}
                      {item.courseLabel && <span className="ap-prices__note">{item.courseLabel}</span>}
                    </>
                  ) : (
                    '—'
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
