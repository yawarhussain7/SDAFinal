import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // For accordion functionality
import "./contactPage.css";
const faqs = [
  {
    question: "How can I book a hotel through Travelers?",
    answer:
      "You can book a hotel by browsing our Hotels section, selecting your desired property, and following the booking process. You’ll need to provide your travel dates, guest information, and payment details to complete the reservation.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including credit/debit cards (Visa, Mastercard, American Express), bank transfers, and selected mobile payment platforms. All transactions are secure and encrypted.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "You can cancel or modify your booking subject to the cancellation policy of the specific hotel or tour package. Some bookings may have free cancellation up to a certain date, while others might have non-refundable policies.",
  },
  {
    question: "Do you offer travel insurance?",
    answer:
      "Yes, we offer insurance options that you can add during the booking process. We recommend adding travel insurance to protect your trip from unexpected circumstances.",
  },
  {
    question: "Do I need a visa to visit Pakistan?",
    answer:
      "Most foreign nationals require a visa to visit Pakistan. However, visa requirements vary by nationality. We can provide guidance on visa applications, but we recommend checking with the Pakistani embassy or consulate in your country for the most up-to-date information.",
  },
];

const ContactPage = () => {
  // Form state for handling input and validation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSubmitStatus(null), 3000); // Clear status after 3s
      }, 1000);
    } else {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="container-fluid py-5 bg-light">
      {/* Hero Section */}
      <section className="text-center py-5 bg-primary text-white">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Get in Touch</h1>
          <p className="lead">
            Have questions or need assistance? We're here to help you plan your
            perfect Pakistan adventure.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="container py-5">
        <div className="row g-4">
          {/* Contact Info */}
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title h3 mb-4">Contact Information</h2>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <strong>Office Address</strong>
                    <div>Blue Area, Islamabad, Pakistan 44000</div>
                  </li>
                  <li className="mb-3">
                    <strong>Phone Number</strong>
                    <div>
                      <a
                        href="tel:+923011234567"
                        className="text-decoration-none">
                        +92 301 1234567
                      </a>
                    </div>
                  </li>
                  <li className="mb-3">
                    <strong>Email Address</strong>
                    <div>
                      <a
                        href="mailto:info@travelers.pk"
                        className="text-decoration-none">
                        info@travelers.pk
                      </a>
                    </div>
                  </li>
                  <li className="mb-3">
                    <strong>Working Hours</strong>
                    <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                    <div>Saturday: 10:30 AM - 4:00 PM</div>
                    <div>Sunday: Closed</div>
                  </li>
                </ul>
              </div>
              <div className="card-footer bg-light border-0">
                {/* Placeholder for Map */}
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.058138376675!2d73.0478843152056!3d33.6844200807046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd1b3f7d1b5%3A0x2e4b8a7c7b7f0b0!2sBlue%20Area%2C%20Islamabad%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1634567891234"
                    title="Office Location"
                    allowFullScreen
                    loading="lazy"
                    style={{ border: 0 }}></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title h3 mb-4">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.name ? "is-invalid" : ""
                        }`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                      {formErrors.name && (
                        <div className="invalid-feedback">
                          {formErrors.name}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          formErrors.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                      />
                      {formErrors.email && (
                        <div className="invalid-feedback">
                          {formErrors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+92 300 1234567"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g., Booking Inquiry"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Your Message
                    </label>
                    <textarea
                      className={`form-control ${
                        formErrors.message ? "is-invalid" : ""
                      }`}
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"></textarea>
                    {formErrors.message && (
                      <div className="invalid-feedback">
                        {formErrors.message}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    <i className="bi bi-send me-2"></i>Send Message
                  </button>
                  {submitStatus === "success" && (
                    <div className="alert alert-success mt-3" role="alert">
                      Message sent successfully!
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="alert alert-danger mt-3" role="alert">
                      Please correct the errors in the form.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-5">
        <h2 className="h3 text-center mb-4">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="The accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index}`}>
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${
                  index === 0 ? "show" : ""
                }`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion">
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
