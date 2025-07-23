import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from './ExampleCarouselImage'; // or '../Components/ExampleCarouselImage'
import ironman2 from '../assets/ironman7.webp'
import ironman3 from '../assets/ironman6.webp'
import ironman4 from '../assets/ironman9.webp'
function IndividualIntervalsExample() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img src={ironman2} className="d-block w-100"
  style={{ height: '400px', objectFit: 'contain' }} alt="First image" />
        <Carousel.Caption>
          <h3>Heroic Legacy</h3>
          <p>Ironman redefined heroism in the MCU with his unmatched intellect, technology, and sacrifice.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
       <img src={ironman3} className="d-block w-100"
  style={{ height: '400px', objectFit: 'contain' }} alt="Second image" />
        <Carousel.Caption>
          <h3>Mark Series Evolution</h3>
          <p> From Mark I to the bleeding edge suit, Ironman’s armor continuously evolved to tackle threats.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
       <img src={ironman4} className="d-block w-100"
  style={{ height: '400px', objectFit: 'contain' }} alt="Third image" />
        <Carousel.Caption>
          <h3>Stark Industries</h3>
          <p>Behind the armor lies a genius mind running one of the world’s most influential tech empires.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;
