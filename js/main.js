// День 1.

// * Модальное окно авторизации
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('login');

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

// * Оформление кнопок для авторизации
function autorized() {
  console.log('Авторизован');
  buttonAuth.style.display = 'none';
  userName.textContent = login;
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';

  // * Отмена авторизации
  function logOut() {
    login = null;
    localStorage.removeItem('login');
    // eslint-disable-next-line no-use-before-define
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  buttonOut.addEventListener('click', logOut);
}

// * Оформление кнопок для неавторизованных
function notAutorized() {
  console.log('Не авторизован');

  // * Авторизация
  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;
    // console.log(login);
    localStorage.setItem('login', login);

    /**
     * для вывода сообщения об невведенном логине.
     * Можно было бы изменить верстку, но для тренировки сделано так
     */
    let warning = document.querySelector('.login-warning');

    if (login) {
      if (warning) {
        document.querySelector('.modal-dialog-auth').removeChild(warning);
      }
      toggleModalAuth();
      loginForm.removeEventListener('submit', logIn);
      // eslint-disable-next-line no-use-before-define
      checkAuth();
    } else {
      // Создание div для вывода сообщения об ошибке
      if (!warning) {
        warning = document.createElement('div');
        warning.classList.add('login-warning');
        document.querySelector('.modal-dialog-auth').append(warning);
      }

      warning.textContent = 'Логин не введен';
      warning.style.color = 'red';
      console.log('Логин не введен');
    }
  }

  loginForm.reset();
  userName.style.display = '';
  buttonOut.style.display = '';
  buttonAuth.style.display = 'flex';

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  loginForm.addEventListener('submit', logIn);
}

// * Проверка на авторизацию
function checkAuth() {
  login = localStorage.getItem('login');

  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

// // * Авторизация
// function logIn(event) {
//   event.preventDefault();
//   login = loginInput.value;
//   // console.log(login);
//   localStorage.setItem('login', login);
//   let warning = document.querySelector('.login-warning');

//   if (login) {
//     if (warning) {
//       document.querySelector('.modal-dialog-auth').removeChild(warning);
//     }
//     toggleModalAuth();
//     // autorized();
//     checkAuth();
//   } else {
//     // Создание div для вывода сообщения об ошибке
//     if (!warning) {
//       warning = document.createElement('div');
//       warning.classList.add('login-warning');
//       document.querySelector('.modal-dialog-auth').append(warning);
//     }

//     warning.textContent = 'Логин не введен';
//     warning.style.color = 'red';
//     // console.log('Логин не введен');
//   }
// }

// * События кнопок
// buttonOut.addEventListener('click', logOut);
// buttonAuth.addEventListener('click', toggleModalAuth);
// closeAuth.addEventListener('click', toggleModalAuth);
// loginForm.addEventListener('submit', logIn);

checkAuth();
