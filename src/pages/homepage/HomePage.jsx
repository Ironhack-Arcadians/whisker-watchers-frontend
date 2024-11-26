import React from "react";
import ReactDOM from "react-dom";
import "./homepage.scss";
import "./homepage.css";
import Sammo from "../../assets/images/Sammo.jpg";
import doggos from "../../assets/images/doggos.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

/* Bootstrap css */
import "../../css/bootstrap-css/bootstrap-reboot.css";
import "../../css/bootstrap-css/style.css";
<link rel="stylesheet" href="css/flaticon.css"></link>;

/* Personalised styling */

function HomePage() {
  return (
    <div className="homepage-container">
      <section
        className="intro-title"
        style={{
          backgroundImage: `url(${doggos})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          height: "50rem",
        }}
      >
        <div className="container-intro">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-section mb-5 mt-5 mt-lg-0">
                <h1
                  className="mb-3 wwheader"
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Welcome to Whisker Watchers
                </h1>
                <p className="intro-text">
                  Your trusted platform for pet care, connecting pet owners with
                  reliable pet sitters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section timeline-container how-ww-works">
        <div className="container">
          <h2 className="mb-4">How Whisker Watchers Works</h2>
          <div id="timeline">
            {/* Step 1 */}
            <div className="timeline-item">
              <div className="timeline-icon">{/* Can input icon here */}</div>
              <div className="timeline-content">
                <h2>Step 1: Register and Create Your Profile</h2>
                <p className="text">
                  <strong>For Pet Owners:</strong> Register your account and
                  choose the "Pet Owner" profile type. Fill in your personal
                  details.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="timeline-item">
              <div className="timeline-icon">{/* Can input icon here */}</div>
              <div className="timeline-content right">
                <h2>Step 2: Set Up Your Profile</h2>
                <p className="text">
                  <strong>For Pet Owners:</strong> After creating your account,
                  add profiles for your pets, including their name, age, breed,
                  and any special care needs.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="timeline-item">
              <div className="timeline-icon">{/* Can input icon here */}</div>
              <div className="timeline-content">
                <h2>Step 3: Create and Respond to Care Requests</h2>
                <p className="text">
                  <strong>For Pet Owners:</strong> Create care requests for your
                  pets and choose from sitters who respond to your requests.
                  Pick the one that suits your pet’s needs best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-no-pt ftco-no-pb why-choose-us">
        <div className="container">
          <div className="row d-flex no-gutters">
            <div className="col-md-5 d-flex">
              <div className="img-video">
                <img src={Sammo} alt="Why Choose Us" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-7 pl-md-5 py-md-5">
              <div className="heading-section pt-md-5">
                <h2 className="mb-4">Why Choose Us?</h2>
              </div>
              <div className="row">
                {[
                  {
                    icon: <FontAwesomeIcon icon={faHeart} />,
                    title: "Pet Care Advice",
                    text: "Offering expert pet care tips to ensure your pet’s well-being.",
                  },
                  {
                    icon: "flaticon-customer-service",
                    title: "Subscription Benefits",
                    text: "Enjoy exclusive perks for members.",
                  },
                  {
                    icon: "flaticon-emergency-call",
                    title: "Ease of Use",
                    text: "Simple platform to connect with trusted pet sitters.",
                  },
                  {
                    icon: "flaticon-veterinarian",
                    title: "Pet Sitting Services",
                    text: "Professional sitters who understand your pet’s needs.",
                  },
                ].map((service, index) => (
                  <div key={index} className="col-md-6 services-2 w-100 d-flex">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className={service.icon}></span>
                    </div>
                    <div className="text pl-3">
                      <h4>{service.title}</h4>
                      <p>{service.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
