import React,{useState,useEffect} from "react";
// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    guests: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    category: '',
    request: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Table booking request submitted!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contactUs" >
      <h2 className="heading">Contact Us</h2>
      <div className="contact-container">
        <div className="contact-box" data-aos="fade-up">
          <h2>Book a Table</h2>
          <p>You can book your Table by filling up the form given below, Please Contact Here.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>No. Of Guest</label>
                <input
                  type="text"
                  name="guests"
                  placeholder="05"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Phone No.</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 9898282800"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Reservation Type</label>
                <select
                  className="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Please Select</option>
                  <option value="dinner">Dinner</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="wedding">Wedding | Anniversary</option>
                  <option value="private">Private Party</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <label>Any Special Request</label>
                <textarea
                  name="request"
                  cols="30"
                  placeholder="Please Mention Here..!"
                  value={formData.request}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="partBtn">
              Book Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact