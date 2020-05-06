// День 1.

// * Модальное окно авторизации
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = '';

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

// * Оформление кнопок для авторизации
function autorized() {
  // console.log('Авторизован');
  buttonAuth.style.display = 'none';
  userName.textContent = login;
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
}

// * Оформление кнопок для неавторизованных
function notAutorized() {
  // console.log('Не авторизован');
  loginForm.reset();
  userName.style.display = '';
  buttonOut.style.display = '';
  buttonAuth.style.display = 'flex';
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

// * Отмена авторизации
function logOut() {
  login = '';
  localStorage.removeItem('login');
  checkAuth();
}

// * Авторизация
function logIn(event) {
  event.preventDefault();
  login = loginInput.value;
  // console.log(login);
  localStorage.setItem('login', login);
  let warning = document.querySelector('.login-warning');

  if (login) {
    if (warning) {
      document.querySelector('.modal-dialog-auth').removeChild(warning);
    }
    toggleModalAuth();
    // autorized();
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
    // console.log('Логин не введен');
  }
}

// * События кнопок
buttonOut.addEventListener('click', logOut);
buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);
loginForm.addEventListener('submit', logIn);

checkAuth();
