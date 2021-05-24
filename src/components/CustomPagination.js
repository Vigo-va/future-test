import React from 'react';
import { Col, Pagination, Row } from 'react-bootstrap';

export const CustomPagination = (props) => {
  let active = props.currentPage;
  let items = [];
  for (let number = 1; number <= props.pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        value={number}
        active={number === active}
        disabled={number === active}
        onClick={props.paginationHandler}
      >
        {number}
      </Pagination.Item>
    );
  }
  if (props.pageCount > 1) {
    return (
      <Row>
        <Col />
        <Col className={'pagination'}>
          <Pagination>
            <Pagination.First
              onClick={props.paginationStart}
              className={'paginationItem'}
            />
            <Pagination.Prev
              onClick={props.paginationPrev}
              className={'paginationItem'}
            />
            {items}
            <Pagination.Next
              onClick={props.paginationNext}
              className={'paginationItem'}
            />
            <Pagination.Last
              onClick={props.paginationEnd}
              className={'paginationItem'}
            />
          </Pagination>
        </Col>
        <Col />
      </Row>
    );
  }
  return <></>;
};
