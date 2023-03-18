import { Link } from '@chakra-ui/react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample({ head, text, link, imgUrl }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title>{head}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        <Link href={link} isExternal>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Link>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;