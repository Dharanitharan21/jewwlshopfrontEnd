import React from 'react';
import MyNavbar from './MyNavbar';
import Card from 'react-bootstrap/Card';
import model from '../images/diamondmodel.jpg';
import img1 from '../images/pexels-janakukebal-6689390.jpg'
import img2 from '../images/pexels-eugenia-remark-5767088-31209274.jpg'
import earing from'../images/eaaings.jpg'
import bracelet from '../images/Bracelets.jpg'
import bangles from '../images/bangles.jpg'
import rings from '../images/rings.jpg'
import neckles from '../images/necles.jpg'
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/buypage?category=${category}`);  // Navigate with category as a URL parameter
    };
  return (
    <div>
      <MyNavbar />
    
      <div className='homecard2'>
        <Card className="bg-dark dark text-white model-card"  onClick={() => handleCategoryClick('necklaces')}>
          <Card.Img src={model} alt="Card image" className='model-img' />
          <Card.ImgOverlay className="ov-bg">
            <Card.Title className="ov-title">Necklaces</Card.Title>
            <Card.Text className="ov-text">
              Discover the elegance of our jewelry, designed for sophistication.
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
        
        <Card className="bg-dark dark1 text-white model-card"  onClick={() => handleCategoryClick('earrings')}>
          <Card.Img src={img1} alt="Card image" className='model-img2' />
          <Card.ImgOverlay className="ov-bg">
            <Card.Title className="ov-title">Earrings</Card.Title>
            <Card.Text className="ov-text">
              Discover the elegance of our  jewelry, designed for sophistication.
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
        <Card className="bg-dark dark1 text-white model-card"  onClick={() => handleCategoryClick('rings')}>
          <Card.Img src={img2} alt="Card image" className='model-img2' />
          <Card.ImgOverlay className="ov-bg">
            <Card.Title className="ov-title">Rings</Card.Title>
            <Card.Text className="ov-text">
              Discover the elegance of our diamond jewelry, designed for sophistication.
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
        <Card className="bg-dark dark1 text-white model-card"  onClick={() => handleCategoryClick('earrings')}>
          <Card.Img src={earing} alt="Card image" className='model-img2' />
          <Card.ImgOverlay className="ov-bg">
            <Card.Title className="ov-title">Earrings</Card.Title>
            <Card.Text className="ov-text">
              Discover the elegance of our  jewelry, designed for sophistication.
            </Card.Text>
          </Card.ImgOverlay>
        </Card> <Card className="bg-dark dark1 text-white model-card"  onClick={() => handleCategoryClick('rings')}>
          <Card.Img src={rings} alt="Card image" className='model-img2' />
          <Card.ImgOverlay className="ov-bg">
            <Card.Title className="ov-title">Rings</Card.Title>
            <Card.Text className="ov-text">
              Discover the elegance of our jewelry, designed for sophistication.
            </Card.Text>
          </Card.ImgOverlay>
        </Card> <Card className="bg-dark dark1 text-white model-card"  onClick={() => handleCategoryClick('bangles')}>
          <Card.Img src={bangles} alt="Card image" className='model-img2' />
          <Card.ImgOverlay className="ov-bg">
            <Card.Title className="ov-title">Bangles</Card.Title>
            <Card.Text className="ov-text">
              Discover the elegance of our  jewelry, designed for sophistication.
            </Card.Text>
          </Card.ImgOverlay>
        </Card> <Card className="bg-dark text-white model-card"  onClick={() => handleCategoryClick('chains')}>
          <Card.Img src={neckles} alt="Card image" className='model-img8' />
          <Card.ImgOverlay className="ov-bg">
            <Card.Title className="ov-title">Chains</Card.Title>
            <Card.Text className="ov-text">
              Discover the elegance of our jewelry, designed for sophistication.
            </Card.Text>
          </Card.ImgOverlay>
        </Card> <Card className="bg-dark dark1 text-white model-card"   onClick={() => handleCategoryClick('Bracelets')}>
          <Card.Img src={bracelet} alt="Card image" className='model-img' />
          <Card.ImgOverlay className="ov-bg">
            <Card.Title className="ov-title">Bracelets</Card.Title>
            <Card.Text className="ov-text">
              Discover the elegance of our jewelry, designed for sophistication.
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
        </div>
      </div>
   
  );
}

export default Home;
