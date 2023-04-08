import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { TextsmsTwoTone } from '@mui/icons-material';

function BasicExample({ head, text, link, imgUrl }) {
  return (
    <Card style={{ width: '18rem', height:'12rem', background: `url(${imgUrl})`, backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      {/* <Card.Img variant="top" src={imgUrl} /> */}
      <Card.Body>
        <Card.Title style={{  fontWeight:'bolder', fontSize: '30px' }}>{head}</Card.Title>
        <Card.Text style={{ float: "right",
    fontWeight: "500",
    background: "rgb(219 212 212 / 30%)",
    borderRadius: "40px",
    padding: "5px",
    fontSize: "1.5rem",}}>
          {text}
        </Card.Text>
        <Link style={{position: 'absolute', bottom: "5px",left: "30%"}} to={link}>
          <Button variant="info">Go somewhere</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;
