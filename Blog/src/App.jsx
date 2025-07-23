import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IndividualIntervalsExample from './Components/Carousel';

import ironman from './assets/ironman.jpg';
import pic1 from './assets/ironman1.jpg';
import pic2 from './assets/ironman2.jpg';
import pic3 from './assets/ironman3.jpg';
import pic4 from './assets/ironman4.jpg';

function App() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Left image - fixed on desktop, visible only on md+ */}
        <div className="col-md-6 d-none d-md-block position-fixed h-100">
          <img src={ironman} alt="Ironman" className="w-130 h-100 object-fit-contain m-4" />
        </div>

        {/* Right content - scrollable and responsive */}
        <div className="col-12 col-md-6 offset-md-6 scrollable-right">
          {/* Mobile image on top */}
          <div className="d-block d-md-none mb-3">
            <img src={ironman} alt="Ironman" className="img-fluid w-100" />
          </div>

          {/* Main content */}
          <Content />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <Container className="py-4">
      <Row className="mb-5">
        <Col>
          <IndividualIntervalsExample />
        </Col>
      </Row>

      {/* Blog Sections */}
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <h3>Heroic Legacy</h3>
          <p>
            Ironman redefined heroism in the MCU with his unmatched intellect, technology, and sacrifice.
          </p>
        </Col>
        <Col md={6}>
          <img src={pic1} alt="Blog 1" className="img-fluid rounded" />
        </Col>
      </Row>

      <Row className="mb-4 align-items-center flex-row-reverse">
        <Col md={6}>
          <h3>Stark Industries</h3>
          <p>
            Behind the armor lies a genius mind running one of the world’s most influential tech empires.
          </p>
        </Col>
        <Col md={6}>
          <img src={pic2} alt="Blog 2" className="img-fluid rounded" />
        </Col>
      </Row>

      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <h3>Mark Series Evolution</h3>
          <p>
            From Mark I to the bleeding edge suit, Ironman’s armor continuously evolved to tackle threats.
          </p>
        </Col>
        <Col md={6}>
          <img src={pic3} alt="Blog 3" className="img-fluid rounded" />
        </Col>
      </Row>

      <Row className="mb-4 align-items-center flex-row-reverse">
        <Col md={6}>
          <h3>Endgame Impact</h3>
          <p>
            The legacy of Ironman lives on through his ultimate sacrifice in Avengers: Endgame.
          </p>
        </Col>
        <Col md={6}>
          <img src={pic4} alt="Blog 4" className="img-fluid rounded" />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
