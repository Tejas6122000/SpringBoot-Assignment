import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ViewArticle = ({ title, text, author }) => {
  return (
    <>
      <Card className={'mt-4 mx-5'} style={{backgroundColor:"black",color:"white",width:"50%"}}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Author: {author}
          </Card.Subtitle>
          <Card.Text>{text}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewArticle;
