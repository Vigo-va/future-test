import React, { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { UsersList } from '../components/UsersList';
import { ModalError } from '../components/ModalError';
import { CustomPagination } from '../components/CustomPagination';
import { UserCard } from '../components/UserCard';
import { ControlPanel } from '../components/ControlPanel';

const axios = require('axios').default;

export const MainPage = (props) => {
  // Инициализация state-а
  const [data, setData] = useState([]); // Данные
  const [foundData, setFoundData] = useState([]); // Найденные данные
  const [filteredData, setFilteredData] = useState([]); // Отфильтрованные данные

  // Получение маленького пакета данных
  const getData = async () => {
    try {
      setIsFetching(true); // Загрузка...
      setDefault();
      const response = await axios.get(
        'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
      );
      setData(response.data);
      setFilteredData(response.data.slice(0, 50));
      setPageCount(Math.ceil(response.data.length / 50));
      setCurrentPage(1);
      setIsFetching(false);
    } catch (error) {
      setModalShow(true);
      setErrorMessage(error.message);
      setIsFetching(false);
    }
  };

  // Получение большого пакета данных
  const getBigData = async () => {
    try {
      setIsFetching(true); // loading...
      setDefault();
      const response = await axios.get(
        'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
      );
      setData(response.data);
      setFilteredData(response.data.slice(0, 50));
      setCurrentPage(1);
      setPageCount(Math.ceil(response.data.length / 50));
      setIsFetching(false);
    } catch (error) {
      setModalShow(true);
      setErrorMessage(error.message);
      setIsFetching(false);
    }
  };

  // Загрузка
  const [isFetching, setIsFetching] = useState(false); // флаг Спинера

  // обработчик
  const [errorMessage, setErrorMessage] = useState(''); // Модальное окно при ошибке во время получения юзеров
  const [modalShow, setModalShow] = useState(false); // флаг модального окна

  // сброс
  const setDefault = () => {
    setIsAdding(false); // Закрывает секцию добавление юзера
    setFilterName(''); // Обнуляет фильтрацию
    setFoundData([]); // Обнуляет найденные данные при получении новых
    setIsSearching(false); // Переключает режим "Поиска"
    setCurrentUser([]); // Обнуляет выбранного юзера
    setCurrentUserIndex('');
    clearSearch();
  };

  // Добавление юзера
  const [userForm, setUserForm] = useState({
    // Данные нового юзера
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: 'lorem', // Заглушка
    address: {
      streetAddress: 'Unknown',
      city: 'Unknown',
      state: 'Unknown',
      zip: 'Unknown',
    },
  });
  const [isAdding, setIsAdding] = useState(false); // Флаг секции "Добавления юзера"
  const [addButton, setAddButton] = useState(false); // Флаг кнопки "Добавления юзера"

  const addUserToggle = () => {
    setIsAdding((prev) => !prev);
    clearUserForm();
    clearErrorFields();
    clearSearch();
    setAddButton(false);
  };

  const addUserFormChangeHandler = (event) => {
    setUserForm({
      ...userForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    let result = Object.values(userForm).some((key) => key === '');
    setAddButton(!result);
  };

  const addUser = () => {
    const isValid = Object.values(errorsField).every(
      (key) => key.error === false
    );
    if (isValid) {
      setFilteredData([userForm, ...filteredData]);
      setData([userForm, ...data]);
      clearUserForm();
      clearErrorFields();
      setAddButton(false);
    }
  };

  const clearUserForm = () => {
    setUserForm({
      ...userForm,
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
  }; // Очищение

  // кастомная валидация Input-ов
  const [errorsField, setErrorsField] = useState({
    id: {
      error: false,
      message: '',
    },
    firstName: {
      error: false,
      message: '',
    },
    lastName: {
      error: false,
      message: '',
    },
    email: {
      error: false,
      message: '',
    },
    phone: {
      error: false,
      message: '',
    },
  }); // Валидация

  const validationIdInput = () => {
    const idPattern = /^[0-9]*$/gm;
    if (!userForm.id.match(idPattern)) {
      console.log('id error changed');
      setErrorsField({
        ...errorsField,
        id: {
          error: true,
          message: 'ID must be a number!',
        },
      });
    } else {
      setErrorsField({
        ...errorsField,
        id: {
          error: false,
          message: '',
        },
      });
    }
  };

  const validationFirstNameInput = () => {
    const firstNamePattern = /^[a-zA-Z\s]*$/;
    if (!userForm.firstName) {
      console.log('Is empty!');
    } else if (userForm.firstName.length < 2) {
      setErrorsField({
        ...errorsField,
        firstName: {
          error: true,
          message: 'Min 2 chars!', // Мало ли какой нибудь Ян попадеться)))
        },
      });
    } else if (!userForm.firstName.match(firstNamePattern)) {
      setErrorsField({
        ...errorsField,
        firstName: {
          error: true,
          message: 'You must use only letters!',
        },
      });
    } else {
      setErrorsField({
        ...errorsField,
        firstName: {
          error: false,
          message: '',
        },
      });
    }
  };

  const validationLastNameInput = () => {
    const lastNamePattern = /^[a-zA-Z\s]*$/;
    if (!userForm.lastName) {
      console.log('Is empty!');
    } else if (userForm.lastName.length < 2) {
      setErrorsField({
        ...errorsField,
        lastName: {
          error: true,
          message: 'Min 2 chars!',
        },
      });
    } else if (!userForm.lastName.match(lastNamePattern)) {
      setErrorsField({
        ...errorsField,
        lastName: {
          error: true,
          message: 'You must use only letters!',
        },
      });
    } else {
      setErrorsField({
        ...errorsField,
        lastName: {
          error: false,
          message: '',
        },
      });
    }
  };

  const validationEmailInput = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!userForm.email) {
      console.log('Is empty');
    } else if (!userForm.email.match(emailPattern)) {
      console.log('email error changed');
      setErrorsField({
        ...errorsField,
        email: {
          error: true,
          message: 'Email is inValid!',
        },
      });
    } else {
      setErrorsField({
        ...errorsField,
        email: {
          error: false,
          message: '',
        },
      });
    }
  };

  const validationPhoneInput = () => {
    console.log(userForm.phone);
    const phonePattern = /^((\+0?1\s)?)\(?\d{3}\)?\d{3}[\s.-]\d{4}$/g;
    if (!userForm.phone) {
      console.log('isEmpty!');
    } else if (!userForm.phone.match(phonePattern)) {
      setErrorsField({
        ...errorsField,
        phone: {
          error: true,
          message: 'Phone number is inValid!',
        },
      });
    } else {
      setErrorsField({
        ...errorsField,
        phone: {
          error: false,
          message: '',
        },
      });
    }
  };

  const clearErrorFields = () => {
    return setErrorsField({
      ...errorsField,
      id: {
        error: false,
        message: '',
      },
      firstName: {
        error: false,
        message: '',
      },
      lastName: {
        error: false,
        message: '',
      },

      email: {
        error: false,
        message: '',
      },
      phone: {
        error: false,
        message: '',
      },
    });
  }; // Очищение

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(50);
  const [pageCount, setPageCount] = useState(0);

  const pagesCount = (count, perPage) => {
    setPageCount(Math.ceil(count / perPage));
  };

  const paginationHandler = (event) => {
    setIsFetching(true);
    setCurrentPage(+event.target.textContent);
    let end = +event.currentTarget.textContent * usersPerPage;
    let start = +end - usersPerPage;
    if (!isSearching) {
      setFilteredData(data.slice(start, end));
    } else {
      setFilteredData(foundData.slice(start, end));
    }
    setIsFetching(false);
  };

  const paginationPrev = () => {
    setIsFetching(true);
    if (currentPage !== 1) {
      setCurrentPage(+currentPage - 1);
      let end = (+currentPage - 1) * usersPerPage;
      let start = +end - usersPerPage;
      if (!isSearching) {
        setFilteredData(data.slice(start, end));
      } else {
        setFilteredData(foundData.slice(start, end));
      }
    }
    setIsFetching(false);
  };

  const paginationNext = () => {
    setIsFetching(true);
    if (currentPage !== pageCount) {
      setCurrentPage(+currentPage + 1);
      let end = (+currentPage + 1) * usersPerPage;
      let start = +end - usersPerPage;
      if (!isSearching) {
        setFilteredData(data.slice(start, end));
      } else {
        setFilteredData(foundData.slice(start, end));
      }
    }
    setIsFetching(false);
  };

  const paginationStart = () => {
    setIsFetching(true);
    if (currentPage !== 1) {
      setCurrentPage(1);
      let end = usersPerPage;
      let start = +end - usersPerPage;
      if (!isSearching) {
        setFilteredData(data.slice(start, end));
      } else {
        setFilteredData(foundData.slice(start, end));
      }
    }
    setIsFetching(false);
  };
  const paginationEnd = () => {
    setIsFetching(true);
    if (currentPage !== +pageCount) {
      setCurrentPage(+pageCount);
      let end = +pageCount * usersPerPage;
      let start = +end - usersPerPage;
      if (!isSearching) {
        setFilteredData(data.slice(start, end));
      } else {
        setFilteredData(foundData.slice(start, end));
      }
    }
    setIsFetching(false);
  };

  // Сортировка
  const [filterToggle, setFilterToggle] = useState(false);
  const [filterName, setFilterName] = useState('');

  const compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  };

  const sortBy = (key) => {
    setCurrentUserIndex('');
    setCurrentUser([]);
    if (!isSearching) {
      if (key !== filterName) {
        setFilterToggle(false);
        setFilterName(key);
        setData(data.sort(compareValues(key, 'asc')));
      } else {
        setFilterToggle((prev) => !prev);
        setFilterName(key);
        setData(data.sort(compareValues(key, filterToggle ? 'asc' : 'desc')));
      }
      setFilteredData(data.slice(0, 50));
      setCurrentPage(1);
    } else {
      if (key !== filterName) {
        setFilterToggle(false);
        setFilterName(key);
        setData(foundData.sort(compareValues(key, 'asc')));
      } else {
        setFilterToggle((prev) => !prev);
        setFilterName(key);
        setData(
          foundData.sort(compareValues(key, filterToggle ? 'asc' : 'desc'))
        );
      }
      setFilteredData(foundData.slice(0, 50));
      setCurrentPage(1);
    }
  };

  // Поиск
  const [searchInput, setSearchInput] = useState('');
  const [noResult, setNoResult] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // Режим поиска

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.currentTarget.value);
  };

  const search = () => {
    setIsSearching(true);
    setIsAdding(false);
    setCurrentUser([]);
    setCurrentUserIndex('');
    const filteredArray = [];
    let currentUser;
    data.filter((user, index) => {
      return Object.values(user).forEach((value) => {
        if (
          value.toString().toLowerCase().includes(searchInput.toLowerCase()) &&
          currentUser !== user
        ) {
          currentUser = user;
          filteredArray.push(user);
        }
      });
    });
    setFoundData(filteredArray);
    if (filteredArray.length === 0) {
      setNoResult(true);
      setPageCount(0);
    } else if (filteredArray.length < usersPerPage) {
      setFilteredData(filteredArray);
      setPageCount(1);
      setNoResult(false);
    } else {
      setFilteredData(filteredArray.slice(0, usersPerPage));
      pagesCount(filteredArray.length, usersPerPage);
      setNoResult(false);
    }
  };

  const clearSearch = () => {
    setIsSearching(false);
    setCurrentUser([]);
    setCurrentUserIndex('');
    setNoResult(false);
    setSearchInput('');
    setFoundData([]);
    setFilteredData(data.slice(0, usersPerPage));
    setCurrentPage(1);
    pagesCount(data.length, usersPerPage);
  };

  // Показать выбранного юзера
  const [currentUser, setCurrentUser] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState('');

  const displayCurrentUser = (event) => {
    const id = event.currentTarget.id;
    setCurrentUserIndex(id);
    setCurrentUser([filteredData[id]]);
  };
  return (
    <>
      <Container>
        <ControlPanel
          getData={getData}
          getBigData={getBigData}
          isFetching={isFetching}
          addUserToggle={addUserToggle}
          searchInput={searchInput}
          searchInputChangeHandler={searchInputChangeHandler}
          search={search}
          clearSearch={clearSearch}
        />
        {isFetching ? (
          <Spinner animation={'border'} role={'status'} className={'loader'} />
        ) : (
          <UsersList
            data={filteredData}
            // Добавление юзера
            userForm={userForm}
            addUserFormChangeHandler={addUserFormChangeHandler}
            isAdding={isAdding}
            addUser={addUser}
            addUserToggle={addUserToggle}
            addButton={addButton}
            // кастомная валидация Input-ов
            validationIdInput={validationIdInput}
            validationFirstNameInput={validationFirstNameInput}
            validationLastNameInput={validationLastNameInput}
            validationEmailInput={validationEmailInput}
            validationPhoneInput={validationPhoneInput}
            errorsField={errorsField}
            // сортировка
            sortBy={sortBy}
            filterName={filterName}
            filterToggle={filterToggle}
            // Поиск
            search={search}
            noResult={noResult}
            // Отображение юзера
            displayCurrentUser={displayCurrentUser}
            currentUser={currentUser}
            currentUserIndex={currentUserIndex}
          />
        )}

        {isFetching ? (
          <></>
        ) : (
          <CustomPagination
            // Пагинация
            usersCount={data.length}
            currentPage={currentPage}
            pageCount={pageCount}
            paginationHandler={paginationHandler}
            paginationPrev={paginationPrev}
            paginationNext={paginationNext}
            paginationStart={paginationStart}
            paginationEnd={paginationEnd}
          />
        )}

        <UserCard
          // Подробнее о юзере
          currentUser={currentUser}
          displayCurrentUser={displayCurrentUser}
        />
        <ModalError
          // Модальное окно ошибки
          show={modalShow}
          errorMessage={errorMessage}
          onHide={() => {
            setModalShow(false);
            setErrorMessage('');
          }}
        />
      </Container>
    </>
  );
};
