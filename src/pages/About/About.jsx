import { useState } from 'react';
import Accordion from '../../components/Accordion/Accordion';
import Tabs from '../../components/Tabs/Tabs';
import './About.css';

const faqItems = [
  {
    id: 'faq-right-plant',
    title: 'How do I know which plant is right for me?',
    content: 'Start with our Plant Finder quiz! It considers your experience level, available light, watering schedule, and whether you have pets. For beginners, we recommend starting with low-maintenance plants like Snake Plants, Pothos, or Spider Plants.',
  },
  {
    id: 'faq-watering',
    title: 'How often should I water my plants?',
    content: 'It depends on the plant! Most houseplants prefer to dry out slightly between waterings. Check the soil moisture by sticking your finger about an inch deep. If it feels dry, it\'s time to water. Overwatering is the most common cause of houseplant death, so when in doubt, wait a day or two.',
  },
  {
    id: 'faq-yellow-leaves',
    title: 'Why are the leaves on my plant turning yellow?',
    content: 'Yellow leaves can indicate several issues: overwatering (most common), underwatering, insufficient light, or natural aging. Check your watering schedule first, then assess light conditions. Some yellowing of older, lower leaves is normal as the plant directs energy to new growth.',
  },
  {
    id: 'faq-pets',
    title: 'Are all houseplants safe for pets?',
    content: 'No, many common houseplants are toxic to cats and dogs if ingested. Plants like Pothos, Peace Lily, and Monstera can cause issues. We clearly mark pet-safe plants in our collection. If you have curious pets, stick to options like Spider Plants, Boston Ferns, or Peperomia.',
  },
];

const careTabs = [
  {
    id: 'watering',
    label: 'Watering',
    icon: '💧',
    content: (
      <div>
        <h3>Watering Tips</h3>
        <p>Proper watering is the key to healthy plants. Here are some essential tips:</p>
        <ul>
          <li>Check soil moisture before watering - stick your finger 1 inch into the soil</li>
          <li>Water thoroughly until it drains from the bottom</li>
          <li>Empty saucers after 30 minutes to prevent root rot</li>
          <li>Use room temperature water when possible</li>
          <li>Water less frequently in winter when growth slows</li>
        </ul>
        <p>Remember: It is better to underwater than overwater. Most plants can recover from being too dry, but root rot from overwatering is often fatal.</p>
      </div>
    ),
  },
  {
    id: 'light',
    label: 'Light',
    icon: '☀️',
    content: (
      <div>
        <h3>Understanding Light Needs</h3>
        <p>Light is essential for photosynthesis. Here is how to assess your space:</p>
        <ul>
          <li><strong>Bright direct:</strong> Within 2 feet of south-facing windows</li>
          <li><strong>Bright indirect:</strong> Near windows but not in direct sun path</li>
          <li><strong>Medium:</strong> Several feet from windows or north-facing rooms</li>
          <li><strong>Low:</strong> Interior rooms, far from windows</li>
        </ul>
        <p>Signs your plant needs more light: leggy growth, small leaves, leaning toward light. Signs of too much light: scorched or bleached leaves, wilting despite moist soil.</p>
      </div>
    ),
  },
  {
    id: 'soil',
    label: 'Soil',
    icon: '🌱',
    content: (
      <div>
        <h3>Soil and Potting</h3>
        <p>The right soil mix ensures proper drainage and nutrition:</p>
        <ul>
          <li>Most houseplants thrive in well-draining potting mix</li>
          <li>Add perlite to improve drainage for plants prone to root rot</li>
          <li>Succulents need sandy, fast-draining soil</li>
          <li>Repot when roots circle the bottom or emerge from drainage holes</li>
          <li>Choose pots with drainage holes - always!</li>
        </ul>
        <p>Repot in spring when plants are actively growing. Go up only 1-2 inches in pot size to prevent overwatering issues.</p>
      </div>
    ),
  },
  {
    id: 'problems',
    label: 'Problems',
    icon: '🩺',
    content: (
      <div>
        <h3>Common Problems and Solutions</h3>
        <p>Troubleshoot these common issues:</p>
        <ul>
          <li><strong>Yellow leaves:</strong> Usually overwatering; check soil and reduce watering</li>
          <li><strong>Brown leaf tips:</strong> Low humidity or inconsistent watering</li>
          <li><strong>Drooping:</strong> Check if soil is too dry or too wet</li>
          <li><strong>Pests:</strong> Isolate plant, wipe leaves, use neem oil</li>
          <li><strong>No new growth:</strong> Needs more light or fertilizer during growing season</li>
        </ul>
        <p>When in doubt, check the roots. Healthy roots are white or tan. Brown, mushy roots indicate rot and need immediate attention.</p>
      </div>
    ),
  },
];

function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  }

  return (
    <div className="about-page">
      <section className="section about-header-section">
        <div className="container">
          <header className="section-header">
            <h1 className="section-title">About Plantopia</h1>
            <p className="section-subtitle">
              Helping plant lovers grow their indoor jungles since 2024
            </p>
          </header>
        </div>
      </section>

      <section className="section about-story">
        <div className="container">
          <div className="story-content">
            <h2 className="story-title">Our Story</h2>
            <p className="story-text">
              Plantopia was born from a simple belief: everyone deserves the joy of living with plants.
              We started as plant enthusiasts frustrated by conflicting care advice and overwhelming
              choices. Now, we are here to simplify your plant journey.
            </p>
            <p className="story-text">
              Our mission is to match you with plants that fit your lifestyle, not the other way around.
              Whether you are a serial plant killer looking for a second chance or an expert seeking rare
              specimens, we have got you covered.
            </p>
          </div>
          <div className="story-values">
            <div className="value-item">
              <span className="value-icon" aria-hidden="true">🎯</span>
              <h3 className="value-title">Honest Advice</h3>
              <p className="value-text">No misleading promises. Just practical, tested guidance.</p>
            </div>
            <div className="value-item">
              <span className="value-icon" aria-hidden="true">🌍</span>
              <h3 className="value-title">Sustainability</h3>
              <p className="value-text">Promoting eco-friendly practices and responsible plant care.</p>
            </div>
            <div className="value-item">
              <span className="value-icon" aria-hidden="true">💚</span>
              <h3 className="value-title">Community</h3>
              <p className="value-text">Building a supportive space for plant lovers everywhere.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt about-care-tips">
        <div className="container">
          <header className="section-header">
            <h2 className="section-title">Plant Care Tips</h2>
            <p className="section-subtitle">Everything you need to keep your plants thriving</p>
          </header>
          <div className="tabs-wrapper">
            <Tabs tabs={careTabs} defaultTab="watering" />
          </div>
        </div>
      </section>

      <section className="section about-faq">
        <div className="container">
          <header className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Common questions about plant care</p>
          </header>
          <div className="faq-wrapper">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      <section className="section section-alt about-contact">
        <div className="container">
          <header className="section-header">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">Have a question? We would love to hear from you!</p>
          </header>

          <div className="contact-wrapper">
            {isSubmitted ? (
              <div className="contact-success">
                <span className="success-icon" aria-hidden="true">✅</span>
                <h3 className="success-title">Message Sent!</h3>
                <p className="success-text">
                  Thank you for reaching out. We will get back to you within 24-48 hours.
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <p id="name-error" className="form-error" role="alert">
                      <span aria-hidden="true">⚠</span> {errors.name}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-email"
                    name="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p id="email-error" className="form-error" role="alert">
                      <span aria-hidden="true">⚠</span> {errors.email}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    className={`form-select ${errors.subject ? 'error' : ''}`}
                    value={formData.subject}
                    onChange={handleChange}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                  >
                    <option value="">Select a subject...</option>
                    <option value="general">General Inquiry</option>
                    <option value="plant-care">Plant Care Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                  {errors.subject && (
                    <p id="subject-error" className="form-error" role="alert">
                      <span aria-hidden="true">⚠</span> {errors.subject}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" className="form-error" role="alert">
                      <span aria-hidden="true">⚠</span> {errors.message}
                    </p>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;