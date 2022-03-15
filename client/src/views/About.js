import { Button, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Row className='mt-5'>
      <Col className='text-center'>
        <Button
          variant='dark'
          href='https://www.youtube.com/'
          size='lg'
          target='_blank'
        >
          Visit youtube for more turtorials
        </Button>
      </Col>
    </Row>
  );
};

export default About;
