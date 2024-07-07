import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../assets/profile.jpeg'; // Adjust the path if necessary
import FeatureImage1 from '../assets/feature1.png';
import FeatureImage2 from '../assets/feature2.png';
import FeatureImage3 from '../assets/feature3.png';
import TeamMember1Image from '../assets/team-member1.png';
import TeamMember2Image from '../assets/team-member2.png';

function Home() {
  return (
    <div style={{ textAlign: 'center', color: '#fff', backgroundColor: '#333' }}>
      <header style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '1rem', position: 'fixed', width: '100%', top: '0', zIndex: '1000', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={ProfileImage} alt="T-TRUCK Logo" style={{ width: '50px', height: 'auto', marginRight: '1rem' }} />
        </div>
        <nav>
          <ul style={{ listStyle: 'none', margin: '0', padding: '0', display: 'flex', justifyContent: 'center' }}>
            <li style={{ margin: '0 1rem' }}><a href="#features" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Features</a></li>
            <li style={{ margin: '0 1rem' }}><a href="#about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>About</a></li>
            <li style={{ margin: '0 1rem' }}><a href="#project" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Project</a></li>
            <li style={{ margin: '0 1rem' }}><a href="#team" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Our Team</a></li>
            <li style={{ margin: '0 1rem' }}><a href="http://localhost:3000/login" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Login T-TRUCK</a></li>
          </ul>
        </nav>
      </header>

      <section style={{ height: '100vh', backgroundImage: 'url("https://thumbs.dreamstime.com/z/white-bonnet-big-rig-day-cab-semi-truck-spoiler-roof-moving-step-down-semi-trailer-transporting-black-plastic-106790699.jpg?ct=jpeg")', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.875)' }}>
        <div style={{ maxWidth: '600px', padding: '2rem', background: 'rgba(0, 0, 0, 0.746)', borderRadius: '10px' }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 1rem' }}>Welcome to Our Tracking Platform</h1>
          <p style={{ fontSize: '1.25rem', margin: '0 0 2rem' }}>Manage your fleet efficiently with our advanced tracking solutions.</p>
          <a href="#features" style={{ backgroundColor: '#28a745', color: '#fff', padding: '0.75rem 1.5rem', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Explore More</a>
        </div>
      </section>

      <section id="features" style={{ padding: '5rem 1rem', display: 'flex', justifyContent: 'space-around' }}>
  <div style={{ textAlign: 'center', flex: '1', maxWidth: '500px' }}>
    <img src={FeatureImage3} alt="Feature 1" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
    <h2>Expense Monitoring</h2>
    <p>Track and monitor expenses such as fuel costs with detailed analytics.</p>
  </div>
  <div style={{ textAlign: 'center', flex: '1', maxWidth: '500px', marginLeft: '20px', marginRight: '20px' }}>
    <img src={FeatureImage1} alt="Feature 2" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
    <h2>Load Planning</h2>
    <p>Plan truck loads efficiently to optimize routes and reduce transit time.</p>
  </div>
  <div style={{ textAlign: 'center', flex: '1', maxWidth: '500px' }}>
    <img src={FeatureImage2} alt="Feature 3" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
    <h2>Invoicing</h2>
    <p>Generate invoices quickly and accurately based on completed deliveries.</p>
  </div>
</section>


      <section id="about" style={{ padding: '50px 0', backgroundColor: '#444', color: '#ddd', marginTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2>About Us</h2>
          <p>Our project aims to assist small fleet owners in managing their trucks effectively, including monitoring expenses like fuel, planning loads for optimal efficiency, facilitating faster invoicing, and providing insights into profits.</p>
        </div>
      </section>

      <section id="project" style={{ padding: '50px 0', backgroundColor: '#444', color: '#ddd', marginTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2>Project Overview</h2>
          <p>The T-TRUCK project aims to provide a comprehensive platform for small fleet owners to efficiently manage their trucks. It includes features for monitoring expenses, planning loads, generating invoices, and analyzing profits.</p>
          <a href="https://github.com/your-username/your-repo" style={{ display: 'inline-block', marginTop: '20px' }} target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </section>

      <section id="team" style={{ padding: '50px 0', textAlign: 'center' }}>
        <h2>Our Team</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '300px', textAlign: 'center' }}>
            <img src={TeamMember1Image} alt="Team Member 1" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            <div style={{ marginTop: '10px' }}>
              <h3>Edwin John</h3>
              <p>Lead Developer</p>
              <div style={{ marginTop: '20px' }}>
                <a href="https://www.linkedin.com/your-linkedin-profile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">Twitter</a>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: '300px', textAlign: 'center' }}>
            <img src={TeamMember2Image} alt="Team Member 2" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            <div style={{ marginTop: '10px' }}>
              <h3>John Edwin</h3>
              <p>UI/UX Designer</p>
              <div style={{ marginTop: '20px' }}>
                <a href="https://www.linkedin.com/your-linkedin-profile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">Twitter</a>
              </div>
            </div>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      <footer style={{ backgroundColor: '#222', padding: '1rem', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
            <li style={{ display: 'inline-block', marginRight: '10px' }}><a href="#privacy" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a></li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}><a href="#terms" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</a></li>
          </ul>
          <p>&copy; {new Date().getFullYear()} T-TRUCK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
