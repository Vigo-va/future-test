import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const ModalError = (props) => {
  return (
    <Modal {...props} size="sm" aria-labelledby="errorMessage" centered>
      <Modal.Header closeButton className={'modalHeader'}>
        <Modal.Title id="errorMessage">{props.errorMessage}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Something went wrong, please try again later!</p>
      </Modal.Body>
      <Modal.Footer className={'modalFooter'}>
        <Button variant={'secondary'} onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
