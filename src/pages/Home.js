import { handleGetTodos, handleAddTodos } from '/src/utils/todo.js';

const Home = () => {
  const homePage = document.createElement('div');
  homePage.innerHTML = `
          <!------------------ BACKGROUND ------------------>
          <!-- icons -->
          <div class="background" aria-label="window95 version for background icons">
            <button class="background-icon">
              <img src="./assets/icon_my.png" alt="windows95 computer icon" />
              <span>My Computer</span>
            </button>
            <button class="background-icon">
              <img src="./assets/icon_network.png" alt="windows95 network icon" />
              <span>Network<br />Neighborhood</span>
            </button>
            <button class="background-icon">
              <img src="./assets/icon_YouTube.png" alt="windows95 youtube icon" />
              <span>YouTube</span>
            </button>
            <button class="background-icon">
              <img src="./assets/icon_bin.png" alt="windows95 Recycle Bin icon" />
              <span>Recycle Bin</span>
            </button>
            <button class="background-icon">
              <img src="./assets/icon_Starbucks.png" alt="windows95 Starbucks icon" />
              <span>Starbucks</span>
            </button>
            <button class="background-icon iconTodo">
              <img src="./assets/icon_Todo.png" alt="windows95 memo icon" />
              <span>Start Todo</span>
            </button>
          </div>
      
          <!-- task-bar -->
          <div class="taskbar" aria-label="window95 version graphics for taskbar">
            <div class="taskbar-btns">
              <button class="startbtn">
                <img src="./assets/icon_start.png" alt="windows95 icon" />
                Start
              </button>
              <span class="todobtn">Start Todo</span>
            </div>
            <span class="taskbar-clock" aria-current="time">00:00:00</span>
          </div>
      
          <!------------------ WINDOW ------------------>
          <section class="window">
            <!-- titlebar -->
            <div class="titlebar">
              <h1 class="titlebar-title">Start Todo</h1>
              <button class="titlebar-btn">✖</button>
            </div>
            <!-- greeting -->
            <div class="greeting-box">
              
            <!-- username -->
              <div class="username-box">
                <h2 class="welcome">Welcome!</h2>
                <form action="" class="type-name-form hidden">
                  <input required maxlength="10" type="text" placeholder="What is your name?" autofocus />
                  <button class="signinbtn" type="submit">sign in</button>
                </form>
                <h3 class="print-name hidden"></h3>
                <button class="signoutbtn hidden" type="button">sign out</button>
              </div>
              <img src="./assets/gif_cat.gif" alt="walking cat" />
            </div>
      
            <main class="workspace">
              <!------------------ TODO ------------------>
              <div class="todo">
                <form class="todo-form">
                  <input class="todo-add-input" type="text" placeholder="type..." />
                  <input class="todo-submit-input" type="submit" value="add" />
                </form>
                <ul class="todo-list">
                <strong class="empty-todo hidden">
                    Type your first Todo.<br />
                    Then you can get🍀
                  </strong>
                </ul>
              </div>
              <!------------------ WIDGETS ------------------>
              <div class="widgets">
                <div class="widgets-btns">
                  <button class="onlytodo-btn">only To do</button>
                  <button class="onlydone-btn">only Done</button>
                  <button class="all-btn">All</button>
                </div>
                <div class="widgets-position">
                  <span class="item location"><img src="./assets/icon_location.svg" alt="current location" /></span>
                  <span class="item weather"><img src="./assets/icon_weather.svg" alt="current weather" /></span>
                </div>
              </div>
            </main>
          </section>
      
          <div class="loading"></div>`;

  const app = document.querySelector('#root');
  app.append(homePage);

  // init
  const loadingEl = document.querySelector('.loading');
  const todoFormEl = document.querySelector('.todo-form');
  const todoUlEl = document.querySelector('.todo-list');
  const emptyMessageEl = document.querySelector('.empty-todo');
  const filterBtn = document.querySelector('.widgets-btns');

  // get
  handleGetTodos(loadingEl, todoUlEl, emptyMessageEl);

  // add
  todoFormEl.addEventListener('submit', handleAddTodos);

  // filter
  filterBtn.addEventListener('click', (e) => {
    const targetClassName = e.target.className;
    todoUlEl.innerHTML = '';
    switch (targetClassName) {
      case 'onlytodo-btn':
        handleGetTodos(loadingEl, todoUlEl, emptyMessageEl, 'notDone');
        break;
      case 'onlydone-btn':
        handleGetTodos(loadingEl, todoUlEl, emptyMessageEl, 'done');
        break;
      case 'all-btn':
        handleGetTodos(loadingEl, todoUlEl, emptyMessageEl);
        break;
    }
  });
};

export default Home;
