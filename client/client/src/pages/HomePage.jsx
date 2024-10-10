import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import task from '../assets/task.png'

const HomePage = () => {

    return (
        <Container className="bg-primary py-3">
            <Row>
                {/* Left column with two rows */}
                <Col md={8}>
                    <Row>
                        <Col>
                            <div style={{ background: '#f8f9fa', padding: '20px', border: '1px solid #dee2e6' }}>
                                Left Column, Row 1
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ background: '#f8f9fa', padding: '20px', border: '1px solid #dee2e6', marginTop: '10px' }}>
                                <Link to='/auth/login'>
                                    <Button>Login</Button>
                                </Link>
                                <Link to='auth/register'>
                                    <Button>Register</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Col>

                {/* Right column with one combined row */}
                <Col md={4}>
                    <div style={{ background: '#f1f3f5', padding: '20px', border: '1px solid #ced4da' }}>
                        <img src={task} alt="Completing Task Image" className='img-fluid' />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default HomePage;