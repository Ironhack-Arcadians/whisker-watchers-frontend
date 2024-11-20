import VicenteImage from "./vicente.png";
import JustinImage from "./justin.png";

function About() {
  return (
    <div className="about-container">
      <div className="about-description">
        <h1>The philosophy behind Whisker Watchers</h1>
        <p>Lorum ipsum lorum ipsum</p>
      </div>

      <div className="aim-description">
        <h2>Our Aim</h2>
        <p>Lorum ipsum lorum ipsum</p>
      </div>

      <div className="Founders-description">
        <h2>Our Founders</h2>
      </div>

      <div className="founders-cards">
        <div className="profile-container">
          <div className="profile">
            <h3>Vicente</h3>
            <img src={VicenteImage} alt="Vicente" className="profile-image" />
            <p>lorum ipsum lorum ipsum</p>
            <a href="https://www.linkedin.com/in/vicente-duch-moreno-a7b6a82a2/">
              LinkedIn
            </a>
            <a href="https://github.com/vicenteduch">Github</a>
          </div>

          <div className="profile">
            <h3>Justin</h3>
            <img src={JustinImage} alt="Justin" className="profile-image" />
            <p>lorum ipsum lorum ipsum</p>
            <a href="https://www.linkedin.com/in/justin-fanton-2034551a8/">
              LinkedIn
            </a>
            <a href="https://github.com/JAFanton">Github</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
