import { useState } from 'react';
import './Tabs.css';

function Tabs({ tabs, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  function handleTabClick(tabId) {
    setActiveTab(tabId);
  }

  function handleKeyDown(e, index) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
    }
  }

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist" aria-label="Plant care information">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`tab-button ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            <span className="tab-icon" aria-hidden="true">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {tabs.map(tab => (
        activeTab === tab.id && (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            className="tab-panel"
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
          >
            {tab.content}
          </div>
        )
      ))}
    </div>
  );
}

export default Tabs;