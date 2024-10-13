import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import task from '../assets/task.png'

const HomePage = () => {

    return (
        <>
            <h1>TaskMaster</h1>
            <Container className="py-5">
                <Row>
                    {/* Left column with two rows */}
                    <Col md={7}>
                        <Row>
                            <Col>
                                <div style={{
                                    padding: '20px',
                                    width: "80%",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                }}>
                                    <strong>Welcome to TaskMaster</strong>
                                    <br />
                                    Your go-to solution for managing tasks and staying organized! TaskMaster helps you prioritize, track, and complete tasks efficiently, all in one easy-to-use platform.
                                    <br />
                                    <br />
                                    <strong>Features:</strong>
                                    <br />
                                    <ul style={{ textAlign: "left" }}>
                                        <li>Add & Organize Tasks: Create tasks with priorities, deadlines, and categories.</li>
                                        <li>Track Your Progress: Stay on top of your to-do list with easy tracking and visual progress updates.</li>
                                        <li>Collaborate & Comment: Add comments and collaborate with others on tasks.</li>
                                        <li>Edit & Manage: Edit tasks easily, mark them as completed, and delete them when done.</li>
                                    </ul>

                                    Stay productive, stay on task with TaskMaster.
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={{
                                    padding: '20px',
                                    marginTop: '10px',
                                    display: "flex",
                                    justifyContent: "space-around",
                                    width: "50%",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                }}>
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
                    <Col md={5} className='d-flex align-items-center'>
                        <div>
                            <img src={task} alt="Completing Task Image" className='img-fluid' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default HomePage;