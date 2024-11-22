import React from "react";

function HomePage() {
  return (
    <div className="homepage-container">
      <h1>Welcome to Whisker Watchers</h1>
      <p>
        Your trusted platform for pet care, connecting pet owners with reliable
        pet sitters.
      </p>

      <div className="how-it-works">
        <h2>How Whisker Watchers Works</h2>

        <div className="steps-container">
          {/* Step 1 */}
          <div className="step">
            <h3>Step 1: Register and Create Your Profile</h3>
            <p>
              <strong>For Pet Owners:</strong> Register your account and choose
              the "Pet Owner" profile type. Fill in your personal details.
            </p>
            <p>
              <strong>For Pet Sitters:</strong> Register your account and select
              the "Pet Sitter" profile type. Complete your details and set up
              your sitter profile.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step">
            <h3>Step 2: Set Up Your Profile</h3>
            <p>
              <strong>For Pet Owners:</strong> After creating your account, add
              profiles for your pets, including their name, age, breed, and any
              special care needs.
            </p>
            <p>
              <strong>For Pet Sitters:</strong> Once your sitter profile is set
              up, visit your dashboard to browse through available pet care
              requests that match your availability and preferences.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step">
            <h3>Step 3: Create and Respond to Care Requests</h3>
            <p>
              <strong>For Pet Owners:</strong> Create care requests for your
              pets and choose from sitters who respond to your requests. Pick
              the one that suits your pet’s needs best.
            </p>
            <p>
              <strong>For Pet Sitters:</strong> Browse the care requests posted
              by pet owners and respond to those that align with your skills,
              location, and availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
