import React from 'react';
import { Button, ButtonGroup, Table, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';

export const UsersList = (props) => {
  const sortById = () => {
    props.sortBy('id');
  };
  const sortByFirstName = () => {
    props.sortBy('firstName');
  };
  const sortByLastName = () => {
    props.sortBy('lastName');
  };
  const sortByEmail = () => {
    props.sortBy('email');
  };
  const sortByPhone = () => {
    props.sortBy('phone');
  };

  const notFound = (
    <tr>
      <th colSpan="5" className={'notFound'}>
        Users not found!
      </th>
    </tr>
  );

  const mappedData = props.data.map((user, i) => {
    return (
      <tr
        key={i}
        id={i}
        onClick={props.displayCurrentUser}
        className={i.toString() === props.currentUserIndex ? 'active' : ''}
      >
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
      </tr>
    );
  });

  if (props.data.length === 0) {
    return <></>;
  }
  return (
    <Row>
      <Col md={12}>
        <Table className={'usersList'} striped bordered hover>
          <thead>
            <tr>
              <th onClick={sortById}>
                ID
                {props.filterName !== 'id' ? (
                  <i className="fas fa-sort" />
                ) : props.filterToggle ? (
                  <i className="fas fa-sort-up" />
                ) : (
                  <i className="fas fa-sort-down" />
                )}
              </th>
              <th onClick={sortByFirstName}>
                First Name
                {props.filterName !== 'firstName' ? (
                  <i className="fas fa-sort" />
                ) : props.filterToggle ? (
                  <i className="fas fa-sort-up" />
                ) : (
                  <i className="fas fa-sort-down" />
                )}
              </th>
              <th onClick={sortByLastName}>
                Last Name
                {props.filterName !== 'lastName' ? (
                  <i className="fas fa-sort" />
                ) : props.filterToggle ? (
                  <i className="fas fa-sort-up" />
                ) : (
                  <i className="fas fa-sort-down" />
                )}
              </th>
              <th onClick={sortByEmail}>
                Email
                {props.filterName !== 'email' ? (
                  <i className="fas fa-sort" />
                ) : props.filterToggle ? (
                  <i className="fas fa-sort-up" />
                ) : (
                  <i className="fas fa-sort-down" />
                )}
              </th>
              <th onClick={sortByPhone}>
                Phone
                {props.filterName !== 'phone' ? (
                  <i className="fas fa-sort" />
                ) : props.filterToggle ? (
                  <i className="fas fa-sort-up" />
                ) : (
                  <i className="fas fa-sort-down" />
                )}
              </th>
            </tr>
          </thead>
          {props.isAdding ? (
            <tr>
              <td>
                <input
                  name={'id'}
                  type={'number'}
                  required={true}
                  placeholder={'ID'}
                  onChange={props.addUserFormChangeHandler}
                  value={props.userForm.id}
                  onFocus={props.addUserFormChangeHandler}
                  className={props.errorsField.id.error ? 'inValidInput' : ''}
                  onBlur={props.validationIdInput}
                />
              </td>
              <td>
                <input
                  name={'firstName'}
                  type={'text'}
                  required={true}
                  placeholder={'First Name'}
                  onChange={props.addUserFormChangeHandler}
                  value={props.userForm.firstName}
                  onFocus={props.addUserFormChangeHandler}
                  onBlur={props.validationFirstNameInput}
                  className={
                    props.errorsField.firstName.error ? 'inValidInput' : ''
                  }
                />
              </td>
              <td>
                <input
                  name={'lastName'}
                  type={'text'}
                  required={true}
                  placeholder={'Last Name'}
                  onChange={props.addUserFormChangeHandler}
                  value={props.userForm.lastName}
                  onFocus={props.addUserFormChangeHandler}
                  onBlur={props.validationLastNameInput}
                  className={
                    props.errorsField.lastName.error ? 'inValidInput' : ''
                  }
                />
              </td>
              <td>
                <input
                  name={'email'}
                  type={'email'}
                  required={true}
                  placeholder={'Email'}
                  onChange={props.addUserFormChangeHandler}
                  value={props.userForm.email}
                  onFocus={props.addUserFormChangeHandler}
                  className={
                    props.errorsField.email.error ? 'inValidInput' : ''
                  }
                  onBlur={props.validationEmailInput}
                />
              </td>
              <td>
                <InputMask
                  name={'phone'}
                  required={true}
                  mask={'(999)999-9999'}
                  placeholder={'Phone Number'}
                  onChange={props.addUserFormChangeHandler}
                  value={props.userForm.phone}
                  onFocus={props.addUserFormChangeHandler}
                  onBlur={props.validationPhoneInput}
                  className={
                    props.errorsField.phone.error ? 'inValidInput' : ''
                  }
                />
                <ButtonGroup className={'addingButton'}>
                  <Button
                    variant={'secondary'}
                    onClick={props.addUser}
                    disabled={!props.addButton}
                  >
                    Add
                  </Button>
                  <Button variant={'secondary'} onClick={props.addUserToggle}>
                    Cancel
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ) : null}
          <tbody>{props.noResult ? notFound : mappedData}</tbody>
        </Table>
      </Col>
    </Row>
  );
};
