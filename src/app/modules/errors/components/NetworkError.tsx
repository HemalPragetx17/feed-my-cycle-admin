import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

const NetworkError: FC = () => {
  return (
    <Container className="text-center py-0">
      <Row className="justify-content-center">
        <Col md={8} lg={8}>
          <h3 className="display-4 fw-bold text-danger mb-2">Network Error</h3>
          <p className="lead text-muted fs-18 mb-1">
            Oops! Something went wrong. try again later.
          </p>
          <div className="mb-4">
            <Image
              src="/media/auth/networkError.png"
              alt="Network Error Illustration"
              fluid
              className="d-block mx-auto"
              style={{ maxHeight: '265px' }}
            />
          </div>
          <Link to="/dashboard">
            <Button variant="primary" size="lg" className="px-3 py-2">
              Return Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export { NetworkError };