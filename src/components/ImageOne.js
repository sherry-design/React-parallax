import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { motion } from 'framer-motion';
import logo from '../images/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar } from '@fortawesome/free-solid-svg-icons';
import bg from '../images/bg.png';
import forest from '../images/forest.png';
import bg2 from '../images/bg2.png';
import bg3 from '../images/bg3.png';
import stroke from '../images/stroke.png';
import strokedesc from '../images/strokedesc.png';
import { Link } from 'react-router-dom';


const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 2,
      staggerChildren: 0.5,
    },
  },
};



const ImageOne=()=> {
  return (
    <div>
      <Parallax pages={6.1}>

        <ParallaxLayer offset={0} speed={0.1} factor={2} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }} />
        <ParallaxLayer offset={0.9} speed={1} factor={1.3} style={{ backgroundImage: `url(${bg2})`, backgroundSize: 'contain', }} />
        <ParallaxLayer offset={1.3} speed={0.5} factor={2} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'contain' }} />
        <ParallaxLayer offset={1.98} speed={0.3} factor={2} style={{ backgroundImage: `url(${bg3})`, backgroundSize: 'contain' }} />
        <ParallaxLayer offset={2.6} speed={0.4}factor={1.8} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'contain' }} />
        <ParallaxLayer offset={2.7} speed={0.4}factor={1.8} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'contain' }} />
        <ParallaxLayer offset={2.8} speed={0.1}factor={1.8} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'contain' }} />
        <ParallaxLayer offset={3.8} speed={0.1}factor={1.8} style={{ backgroundImage: `url(${strokedesc})`, backgroundSize: 'contain' }} />
        <ParallaxLayer offset={4.7} speed={0.00001} factor={2} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'contain' }} />
        <ParallaxLayer offset={5} speed={0.5} factor={2} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'contain' }} />
        <ParallaxLayer offset={5.15} speed={0.9} factor={1.9} style={{ backgroundImage: `url(${forest})`, backgroundSize: 'contain' }} />

        <ParallaxLayer sticky={{ start: 0.05, end: 0.7}} style={{ textAlign: 'center' ,top: '30px'}}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ duration: 1.5}}
          >
            <img src={logo} alt="Logo" style={{ width: '400px', height: '600px' }} />
          </motion.div>
        </ParallaxLayer>

        
        <ParallaxLayer sticky={{ start: 2.85, end: 4.3}} style={{ textAlign: 'left',top: '30px' }}>
          
            <img src={stroke} alt="stroke" style={{ width: '800px', height: '600px'}} />
          
        </ParallaxLayer>

        
        

        <ParallaxLayer
          offset={0}
          speed={0.05}
          style={{
            position: 'absolute',
            top: '10px',
            left: '20px',
            display: 'flex',
            flexDirection: 'row', // Set to row for horizontal alignment
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: '10px',
              right: '200px',
              display: 'flex',
              gap: '10px',
              scale: 1.5,
              height: '70px',
              width: '50px',
            }}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: '#48817C',
                color: 'antiquewhite',
                padding: '20px',
                borderRadius: '5px',
                fontFamily: 'horta',
                fontSize: '20px',
                border: '2px solid antiquewhite',
                margin: '5px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '70px',
              width: '50px',
              }}
            >
              <FontAwesomeIcon icon={faHome} />
            </motion.button>
            <Link to="/predict">
              <motion.button
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: '#48817C',
                  color: 'antiquewhite',
                  padding: '20px',
                  borderRadius: '5px',
                  fontFamily: 'horta',
                  fontSize: '20px',
                  border: '2px solid antiquewhite',
                  margin: '5px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '70px',
              width: '50px',
                }}
              >
                <FontAwesomeIcon icon={faChartBar} />
              </motion.button>
            </Link>
            
          </motion.div>
        </ParallaxLayer>

        
      </Parallax>
    </div>
  );
}

export default ImageOne;
