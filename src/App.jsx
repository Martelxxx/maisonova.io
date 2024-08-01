import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import matin from './assets/matinlivingroom.jpeg';
import midi from './assets/midilivingroom.jpeg';
import soir from './assets/soirlivingroom.jpeg';
import mbmatin from './assets/mbmatin.jpeg';
import mbmidi from './assets/mbmidi.jpeg';
import mbsoir from './assets/mbsoir.jpeg';
import townhouse from './assets/townhouse.jpeg';
import aerial from './assets/aerial.jpeg';
import crosssection from './assets/crosssection.jpeg';
import matinkitchen from './assets/matinkitchen.jpeg';
import midikitchen from './assets/midikitchen.jpeg';
import soirkitchen from './assets/soirkitchen.jpeg';
import matinbg from './assets/matinbg.jpeg';
import midibg from './assets/midibg.jpeg';
import soirbg from './assets/soirbg.jpeg';
import barsep from './assets/barsep.png';
import insta from './assets/insta.png';
import youtube from './assets/youtube.png';
import './App.css';

const services = [
  { name: '15 Photos (up to 1000 sq. ft)', price: 114.00 },
  { name: '20 Photos (1001-2000 sq. ft)', price: 139.00 },
  { name: '30 Photos (2001-3000 sq. ft)', price: 189.00 },
  { name: '50 Photos (3001-5000 sq. ft)', price: 239.00 },
  { name: '2D Floor Plan (up to 2000 sq. ft)', price: 100.00 },
  { name: '3D Matterport (up to 2000 sq. ft)', price: 200.00 },
  { name: 'Aerial Photography (up to 20 photos)', price: 250.00 },
  { name: 'Aerial Photography + Videography', price: 500.00 }
];

const discounts = [
  { name: 'Summer Special', description: 'Get 20% off on all services during the summer season!', percentage: 20 },
  { name: 'Referral Discount', description: 'Refer a friend and receive a 15% discount on your next booking!', percentage: 15 },
  { name: 'First-Time Client', description: 'New clients enjoy a 10% discount on their first service!', percentage: 10 },
  { name: 'Bulk Booking', description: 'Book 3 or more services and get a 25% discount on the total cost!', percentage: 25 },
  { name: 'Holiday Offer', description: 'Celebrate the holidays with a 30% discount on all services!', percentage: 30 }
];

// Function to get the current week number
const getWeekNumber = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate - startOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

// Function to get the discount for the current week
const getWeeklyDiscount = () => {
  const weekNumber = getWeekNumber();
  const discountIndex = weekNumber % discounts.length;
  return discounts[discountIndex];
};

const App = () => {
  // Initialize state for main div style
  const [mainStyle, setMainStyle] = useState({
    backgroundImage: `url(${matin})`,
  });

  const currentDiscount = getWeeklyDiscount();

  // Initialize state for section1 div style
  const [section1Style, setSection1Style] = useState({
    backgroundImage: `url(${mbmatin})`,
  });

  // Initialize state for section2 div style
  const [section2Style, setSection2Style] = useState({
    backgroundImage: `url(${matinkitchen})`,
  });

  // Initialize state for background style
  const [backgroundStyle, setBackgroundStyle] = useState({
    background: 'linear-gradient(to bottom, rgb(173, 216, 230) 0%, rgb(255, 228, 196) 100%)',
    backgroundAttachment: 'fixed',
  });

  // Initialize state of section3 background style
  const [section3Style, setSection3Style] = useState({
    backgroundImage: `url(${matinbg})`,
    });

  // Initialize state for navbar style
  const [navbarStyle, setNavbarStyle] = useState({
    background: 'rgb(255, 228, 196)',
  });

  // Initialize state for footer style
  const [footerStyle, setFooterStyle] = useState({
    background: 'rgb(173, 216, 230)',
  });

  // Initialize state for logo style
  const [logoStyle, setLogoStyle] = useState({ height: '100px', width: '100px', filter: '' });

  // Function to change background color and optionally logo style
  const changeBackgroundColor = (color, darkerColor, lighterColor, logoFilter = {}) => {
    setBackgroundStyle({
      background: color,
      backgroundAttachment: 'fixed',
    });
    setSection3Style({
      background: color,
    });
    setNavbarStyle({
      background: lighterColor,
    });
    setFooterStyle({
      background: darkerColor,
    });
    // Check if the "Soir" theme is applied and adjust the logo style accordingly
    if (color === 'linear-gradient(to bottom, rgb(25, 25, 112) 0%, white 100%)') {
      setLogoStyle({ ...logoStyle, filter: 'invert(0%)' }); // Invert colors to simulate white logo
    } else {
      setLogoStyle({ ...logoStyle, filter: '' }); // Reset logo style for other themes
    }
  };

  // Function to change the main div's background image
  const changeMainBackgroundImage = (image) => {
    setMainStyle({
      ...mainStyle,
      backgroundImage: `url(${image})`,
    });
  };

  // Function to change the section1 div's background image
  const changeSection1BackgroundImage = (image) => {
    setSection1Style({
      ...section1Style,
      backgroundImage: `url(${image})`,
    });
  };

  // Function to change the section2 div's background image
  const changeSection2BackgroundImage = (image) => {
    setSection2Style({
      ...section2Style,
      backgroundImage: `url(${image})`,
    });
  };

  // Function to change the background image for the section3 div
  const changeSection3BackgroundImage = (image) => {
    setSection3Style({
      ...section3Style,
      backgroundImage: `url(${image})`,
    });
  };

  // Apply the background style to the body element
  useEffect(() => {
    document.body.style.background = backgroundStyle.background;
    document.body.style.backgroundAttachment = backgroundStyle.backgroundAttachment;
  }, [backgroundStyle]);

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedServices: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormState((prevState) => {
      const selectedServices = checked
        ? [...prevState.selectedServices, value]
        : prevState.selectedServices.filter(service => service !== value);
      return { ...prevState, selectedServices };
    });
  };

  const calculateTotalPrice = () => {
    return formState.selectedServices.reduce((total, serviceName) => {
      const service = services.find(service => service.name === serviceName);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log('Form submitted:', formState);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar" style={navbarStyle}>
        <img src={logo} alt="React Logo" style={logoStyle} />
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#offering">Offering</a></li>
          <li><a href="#book">Book</a></li>
        </ul>
      </nav>

      <div className='time'>
        {/* <img src={logo} style={logoStyle} alt="React Logo" /> */}
        <div className='theme'>
          {/* <h3>Choose a Theme</h3> */}
          <button className='matinButton' onClick={() => {
            changeBackgroundColor(
              'linear-gradient(to bottom, rgb(173, 216, 230) 0%, rgb(255, 228, 196) 100%)', 
              'rgb(173, 216, 230)',
              'rgb(255, 228, 196)'
            );
            changeMainBackgroundImage(matin);
            changeSection1BackgroundImage(mbmatin); // Change section1 background image for Matin theme
            changeSection2BackgroundImage(matinkitchen); // Change section2 background image for Matin theme
            changeSection3BackgroundImage(matinbg); // Change section3 background image for Matin theme
          }}>Matin</button>
          <button className='midiButton' onClick={() => {
            changeBackgroundColor(
              'linear-gradient(to bottom, rgb(135, 206, 235) 0%, rgb(255, 255, 224) 100%)', 
              'rgb(135, 206, 235)',
              'rgb(255, 255, 224)'
            );
            changeMainBackgroundImage(midi);
            changeSection1BackgroundImage(mbmidi); // Change section1 background image for Midi theme
            changeSection2BackgroundImage(midikitchen); // Change section2 background image for Midi theme
            changeSection3BackgroundImage(midibg); // Change section3 background image for Midi theme
          }}>Midi</button>
          <button className='soirButton' onClick={() => {
            changeBackgroundColor(
              'linear-gradient(to bottom, rgb(25, 25, 112) 0%, white 100%)', 
              'rgb(25, 25, 112)',
              'white'
            );
            changeMainBackgroundImage(soir);
            changeSection1BackgroundImage(mbsoir); // Change section1 background image for Soir theme
            changeSection2BackgroundImage(soirkitchen); // Change section2 background image for Soir theme
            changeSection3BackgroundImage(soirbg); // Change section3 background image for Soir theme
          }}>Soir</button>
        </div>
      </div>

      <div className='opening'>    
      <p className='subtitle'>
      <h1 className='title'>Welcome to Maisonova</h1>
        <p span className="cool2">Transform Your Listings with Breathtaking Visuals!</p>
        <p span className="cool2">Unlock the full potential of your properties with our premium services.</p>
        <p span className="cool2">Serving Realtors in DC, MD, and VA. Elevate your marketing game and captivate your audience today!</p>
        <div className='cta'>
        <button className='serBut'>Services</button>
        <button className='serBut'>Gallery</button>
        </div>
      </p>
      <div className='discounts'>
      {/* <h3>Weekly Special</h3> */}
      {/* <h3>{currentDiscount.name}</h3> */}
      <p>{currentDiscount.description}</p>
      
      </div>
      </div>
      
      {/* <div className='wrapper'> */}
        <div className='main' style={mainStyle}>
          <div className='text1'>
            <h1>Showcase Your Home</h1>
            <p span className="cool2">Elevate your home with stunning visuals</p>
            <button className='bookbut'>Book Now</button>
          </div>
        </div>
      {/* </div> */}

      <div className='wrapper1'>
      <img src={barsep} alt="bar" className='bar' />
      </div>

      <div className='title1'>
        <div className='title1cover'>
      <p className='elegant'>Our Signature Offerings...</p>
      </div>
      <div className='smallTalk'>
      <p span className="cool2"><b>Transform Your Listings with AI-Powered Photography!</b>
           <p>Elevate your property photos to the next level with our AI technology:</p>
           Flawless Shots: AI ensures perfect angles and lighting for every photo.
           Advanced Editing: Enhance colors and details for stunning images.
           Scene Selection: Highlight your property's best features effortlessly.
           Personalized Tips: Get staging advice to maximize appeal</p>
        </div>
      </div>

      <div className='wrapper'>
        {/* <div className='services'> */}
          <div className='section1' style={section1Style}>
            <div className='text2'>
              {/* <img width="300" height="300" src={townhouse} alt="Video" /> */}
              {/* <h3>Traditional Imagery</h3>
              <p>Expertly crafted home photography to showcase your property's timeless beauty and charm.</p> */}
            </div>
            <div className='text2'>
              {/* <img width="300" height="300" src={crosssection} alt="Video" /> */}
              {/* <h3>3D Floor Plans</h3>
              <p>Innovative 3D floor plans to provide a comprehensive and immersive view of your property's layout.</p>             */}
              </div>
            <div className='text2'>
              {/* <img width="300" height="300" src={aerial} alt="Video" /> */}
              {/* 3<p>Stunning aerial photography to capture breathtaking views and unique perspectives of your property.</p>             */}
              </div>
          </div>
        </div>
      {/* </div> */}

      {/* <div className='wrapper'> */}
        {/* <div className='services'> */}
      <div className='section2' style={section2Style}>
      <div className='text3'>
          {/* <img width="200" height="200" src={townhouse} alt="Traditional Imagery" /> */}
          <h3>Traditional Imagery</h3>
          <p>Expertly crafted home photography to showcase your property's timeless beauty and charm.</p>
          <p>Pricing:</p>
          <ul>
            <li>15 Photos (up to 1000 sq. ft): $114.00</li>
            <li>20 Photos (1001-2000 sq. ft): $139.00</li>
            <li>30 Photos (2001-3000 sq. ft): $189.00</li>
            <li>50 Photos (3001-5000 sq. ft): $239.00</li>
          </ul>
        </div>
        <div className='text3'>
          {/* <img width="200" height="200" src={crosssection} alt="3D Floor Plans" /> */}
          <h3>3D Floor Plans</h3>
          <p>Innovative 3D floor plans to provide a comprehensive and immersive view of your property's layout.</p>
          <p>Pricing:</p>
          <ul>
            <li>2D Floor Plan (up to 2000 sq. ft): $100.00</li>
            <li>3D Matterport (up to 2000 sq. ft): $200.00</li>
          </ul>
        </div>
        <div className='text3'>
          {/* <img width="200" height="200" src={aerial} alt="Aerial Photography" /> */}
          <h3>Aerial Photography</h3>
          <p>Stunning aerial photography to capture breathtaking views and unique perspectives of your property.</p>
          <p>Pricing:</p>
          <ul>
            <li>Up to 20 photos: $250.00</li>
            <li>Aerial Photography + Videography: $500.00</li>
          </ul>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}

      <div className='wrapper1'>
      <img src={barsep} alt="bar" className='bar' />
      </div>

      <div className='wrapper'>
      {/* <div className='services'> */}
      <div className='section3' style={section3Style}>
      {/* <h2><span className="cool">Contact Us:</span></h2>           */}
        <form onSubmit={handleSubmit} className="service-form">
          <h3>Contact Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>First Name:</label>
              <input type="text" name="firstName" value={formState.firstName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input type="text" name="lastName" value={formState.lastName} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formState.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="tel" name="phone" value={formState.phone} onChange={handleInputChange} required />
            </div>
          </div>
          <h3>Select Services</h3>
          <div className="services-list">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <input
                  type="checkbox"
                  id={`service-${index}`}
                  name="selectedServices"
                  value={service.name}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`service-${index}`}>{service.name} - ${service.price.toFixed(2)}</label>
              </div>
            ))}
          </div>
          <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
          <button type="submit">Submit</button>
        </form>
      </div>
      </div>
      {/* </div> */}

      <div className='wrapper2'>
        <img src={logo} alt="logo" style={{ height: "400px"}} />
        <div className='social'>
          <img src={insta} alt="Instagram" />
          <img src={youtube} alt="YouTube" />
          </div>
      </div>

      {/* Footer */}
      
      <footer style={footerStyle} className="footer">
        <p className='cool2'>Privacy | Terms & Conditions</p>
        {/* <img src={logo} alt="React Logo" style={{ width: 'auto', height: '70px', display: 'block', marginBottom: '10px' }} />         */}
        <p className='cool2'>© 2024 Maisonova. All rights reserved.</p>
      </footer>
    </>
  );
};

export default App;
