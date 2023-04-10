

function About() {
    return (
      <div className="about-section">
        <h2>About Plate Plan</h2>
        <div>
          <p>Plate Plan was created with the goal of planning and tracking meals and nutrition.</p>
          <p>It was creating using Typescript and React, using a database provided by ElephantSQL and api routes using a Flask backend, and Firebase for authentication.</p>
          <p>All data for food products and nutrition is provided by <a href="https://us.openfoodfacts.org">https://us.openfoodfacts.org</a>.</p>
          <a href="https://github.com/BurnsBoy/Plate-Plan">Check out the Github repository</a>
        </div>
      </div>
    )
  }
  
  export default About