import { useState } from 'react';
import './Accordion.css';

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  function handleToggle(index) {
    setOpenIndex(prev => prev === index ? null : index);
  }

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const itemId = item.id || `item-${index}`;
        const headingId = `accordion-heading-${itemId}`;
        const panelId = `accordion-panel-${itemId}`;

        return (
          <div key={itemId} className="accordion-item">
            <h3 className="accordion-heading">
              <button
                id={headingId}
                className="accordion-trigger"
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="accordion-title">{item.title}</span>
                <span className={`accordion-icon ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              className={`accordion-panel ${isOpen ? 'is-open' : ''}`}
              hidden={!isOpen}
            >
              <div className="accordion-content">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;