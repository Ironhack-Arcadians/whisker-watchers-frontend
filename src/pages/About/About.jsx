import VicenteImage from "./vicente.png";
import JustinImage from "./justin.png";
import { useEffect } from "react";

/* Bootstrap CSS */
import "../../css/bootstrap-css/bootstrap-reboot.css";
import "../../css/bootstrap-css/style.css";

/* Personalised CSS */
import "./about.css";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="about-container">
      <section className="ftco-section ftco-about about-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="heading-section mb-5 mt-5 mt-lg-0 Founders-description">
                <h2 className="mb-3"><strong>Our Philosophy</strong></h2>
                <p>
                  At Whisker Watchers, we believe in creating a nurturing, safe,
                  and enriching environment for pets. We prioritize the
                  emotional and physical well-being of animals by offering
                  personalized care, built on trust and respect. Our philosophy
                  is rooted in a deep love for pets and a commitment to making
                  their lives better, ensuring they feel valued and cared for,
                  just like family.
                </p>
              </div>
              <div className="heading-section mb-5 mt-5 mt-lg-0 Founders-description">
                <h2 className="mb-3"><strong>Our Aim</strong></h2>
                <p>
                  Our aim is to provide unparalleled pet care services, with a
                  focus on convenience, compassion, and quality. We strive to be
                  a reliable companion for pet owners, offering services that
                  cater to every aspect of their pets' lives, ensuring peace of
                  mind for both pets and their owners.
                </p>
              </div>
            </div>

            <div className="col-lg-6 d-flex flex-column">
              <div className="Founders-description mb-4 heading-section">
                <h2><strong>Our Founders</strong></h2>
              </div>

              <div className="founders-cards d-flex justify-content-between">
                <div className="profile">
                  <h3>Vicente</h3>
                  <img
                    src={VicenteImage}
                    alt="Vicente"
                    className="profile-image"
                  />
                  <a
                    className="socials"
                    href="https://www.linkedin.com/in/vicente-duch-moreno-a7b6a82a2/"
                  >
                    LinkedIn
                  </a>
                  <a className="socials" href="https://github.com/vicenteduch">
                    Github
                  </a>
                </div>

                <div className="profile">
                  <h3>Justin</h3>
                  <img
                    src={JustinImage}
                    alt="Justin"
                    className="profile-image"
                  />
                  <a
                    className="socials"
                    href="https://www.linkedin.com/in/justin-fanton-2034551a8/"
                  >
                    LinkedIn
                  </a>
                  <a className="socials" href="https://github.com/JAFanton">
                    Github
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-faqs faq-section">
        <div className="container">
          <div className="row align-items-center">
            {/* Image Section (on the left) */}
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="img-video about-img-2 text-center">
                <img
                  src="https://scontent.fvlc2-1.fna.fbcdn.net/v/t39.30808-6/467678789_10234674337258834_5604163066618665332_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NDik2QiUJoUQ7kNvgGFYxVB&_nc_zt=23&_nc_ht=scontent.fvlc2-1.fna&_nc_gid=ARm9bj99bHO8KaFUGIdIagA&oh=00_AYDavSSZNiKTZZX_2PTFPC3-cvBrgzxkIYc1qcOgcNB08Q&oe=674E4842"
                  alt="Norwegian Buhund"
                  className="img-fluid centered-img"
                />
              </div>
            </div>

            {/* FAQ Content Section (on the right) */}
            <div className="col-lg-6 pl-lg-5 py-lg-5">
              <div className="heading-section mb-5 mt-5 mt-lg-0">
                <h2 className="mb-3">Frequently Asked Questions</h2>
                <p>
                  Get answers to some of the most common questions we receive
                  about our services.
                </p>
              </div>
              <div className="faq-list w-100">
                <div className="faq-item mb-4">
                  <h5 className="faq-question">
                    How do I become a pet sitter?
                  </h5>
                  <div className="faq-answer">
                    <p>
                      Interested in joining the Whisker Watcher family? Send
                      your CV to the team at {" "}
                      <a
                        href="mailto:totallyNotAFakeAccount@gmail.com"
                        style={{ textDecoration: "none", color: "#2563eb" }}
                      >
                        totallyNotAFakeAccount@gmail.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <div className="faq-item mb-4">
                  <h5 className="faq-question">
                    How do I get in contact with sitters?
                  </h5>
                  <div className="faq-answer">
                    <p>
                      Once you book a sitter, their contact details will be
                      provided for easy communication.
                    </p>
                  </div>
                </div>
                <div className="faq-item mb-4">
                  <h5 className="faq-question">
                    What are the requirements for sitting pets?
                  </h5>
                  <div className="faq-answer">
                    <p>
                      Owners must provide all necessary information about their
                      pets, including dietary preferences, habits, and any
                      special needs.
                    </p>
                  </div>
                </div>
                <div className="faq-item mb-4">
                  <h5 className="faq-question">
                    Can I meet the sitter before booking?
                  </h5>
                  <div className="faq-answer">
                    <p>
                      Yes! We encourage you to connect with sitters beforehand
                      to ensure the best match for your pet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
