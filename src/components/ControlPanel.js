import React from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';

export const ControlPanel = (props) => {
  return (
    <Row className={'controlPanel'}>
      <Col md={3}>
        <Button
          variant={'secondary'}
          onClick={props.getData}
          disabled={props.isFetching}
          block
        >
          Get Small Data
        </Button>
      </Col>
      <Col md={3}>
        <Button
          variant={'secondary'}
          onClick={props.getBigData}
          disabled={props.isFetching}
          block
        >
          Get Big Data
        </Button>
      </Col>
      <Col md={3}>
        <Button
          variant={'secondary'}
          onClick={props.addUserToggle}
          disabled={props.isFetching}
          block
        >
          Add User
        </Button>
      </Col>
      <Col md={3}>
        <InputGroup className={'search'}>
          <FormControl
            placeholder=""
            value={props.searchInput}
            onChange={props.searchInputChangeHandler}
          />
          <i
            className="bi bi-x"
            hidden={!props.searchInput}
            onClick={props.clearSearch}
          />
          <InputGroup.Append>
            <Button variant="secondary" onClick={props.search}>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    </Row>
  );
};
