import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

export const UserCard = (props) => {
  const displayedUser = props.currentUser.map((user, i) => {
    return (
      <Card key={i} className={'userCard'}>
        <Card.Body>
          <Card.Title>
            Выбран пользователь:{' '}
            <b>
              {user.firstName} {user.lastName}
            </b>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Описание:</Card.Subtitle>
          <Card.Text>{user.description}</Card.Text>
          <Card className={'address'}>
            <Card.Body>
              <Card.Text>
                Адрес проживания: <b>{user.address.streetAddress}</b>
              </Card.Text>
              <Card.Text>
                Город: <b>{user.address.city}</b>
              </Card.Text>
              <Card.Text>
                Провинция/штат: <b>{user.address.state}</b>
              </Card.Text>
              <Card.Text>
                Индекс: <b>{user.address.zip}</b>
              </Card.Text>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    );
  });

  return (
    <Row>
      <Col />
      <Col md={5}>{props.currentUser.length !== 0 ? displayedUser : <></>}</Col>
      <Col />
    </Row>
  );
};
