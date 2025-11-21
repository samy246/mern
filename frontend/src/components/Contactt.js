
import { useState } from "react";
// import "./Contact.css"; // Create this CSS file
import { toast } from "react-toastify";
import { axiosi } from "../config/axios";
// import { axiosi } from "../../config/axios";
// import { useMeta } from "../../hooks/useMeta";
// import "./stylesheet.css";
 const Contactt = () => {
    // useMeta({
    //   title: "ContactUs | Thekkady Spices",
    //   description: "Thekkady Spices"
    // });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    tempErrors.name = formData.name.trim() ? "" : "Name is required";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "" : "Enter a valid email";
    tempErrors.phone = /^[6-9]\d{9}$/.test(formData.phone) ? "" : "Enter a valid 10-digit phone number";
    tempErrors.message = formData.message.trim() ? "" : "Message is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("formdata",formData);

    if (validate()) {
      // setLoading(true);
      try {
        const response = await axiosi.post("/contact", formData, {
          headers: { "Content-Type": "application/json" }
        });

        console.log("Response:", response.data);
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });

      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error sending message. Please try again.");
      } finally {
        // setLoading(false);
      }
    }
    }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
        <section id="contactUs">
               <h2 className="heading">Contact Us</h2>
    <div className="contact-container" data-aos="fade-up">
      {/* Banner Section */}


      {/* Contact Form */}
      <div className="contact-form-container">
        <h2 className="form-title">Get in Touch</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error-input" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "error-input" : ""}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? "error-input" : ""}
            ></textarea>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>

        {/* Customer Service Info */}
        <div className="contact-info">
          <h3>CUSTOMER SERVICE</h3>
          <p>Monday to Saturday 9:30 AM – 8:30 PM</p>
          <p>Sunday 9:30 AM – 1:00 PM</p>
          <h3>PHONE</h3>
          <p>+91 9080 53 5414</p>

          <h3>EMAIL</h3>
          <p>
            <a href="mailto:customercare@ajfan.in" className="email-link">
            &#128386;thekkadyspice1@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Contactt