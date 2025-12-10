import { useState, useEffect, useRef } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, userSettings, onSave }) {
  const [displayName, setDisplayName] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);

  // Update local state when modal opens or userSettings change
  useEffect(() => {
    if (isOpen) {
      setDisplayName(userSettings.displayName);
      setExperienceLevel(userSettings.experienceLevel);
    }
  }, [isOpen, userSettings]);

  // Handle opening/closing the dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      // Focus the first input after a small delay
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 0);
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Handle ESC key and backdrop click
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleCancel(e) {
      e.preventDefault();
      onClose();
    }

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      displayName: displayName.trim(),
      experienceLevel,
    });
  }

  function handleBackdropClick(e) {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }

  return (
    <dialog 
      ref={dialogRef} 
      className="modal" 
      onClick={handleBackdropClick}
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">User Settings</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close settings"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="display-name" className="form-label">
              Display Name
            </label>
            <input
              ref={firstInputRef}
              type="text"
              id="display-name"
              className="form-input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              maxLength={30}
            />
            <p className="form-hint">
              This name will appear in your personalized greeting.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="experience-level" className="form-label">
              Experience Level
            </label>
            <select
              id="experience-level"
              className="form-select"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
              <option value="beginner">Beginner - New to plants</option>
              <option value="intermediate">Intermediate - Some experience</option>
              <option value="expert">Expert - Plant parent pro</option>
            </select>
            <p className="form-hint">
              We&apos;ll tailor plant recommendations to your skill level.
            </p>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default Modal;