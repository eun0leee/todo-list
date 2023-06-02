const home = () => {
  const rootEl = document.createElement('div');
  rootEl.innerHTML = `<!------------------ BACKGROUND ------------------>
          <!-- icons -->
          <div class="background-icons" aria-label="window95 version for background icons">
            <button class="icon">
              <img src="./images/icon_my.png" alt="windows95 computer icon" />
              <span>My Computer</span>
            </button>
            <button class="icon">
              <img src="./images/icon_network.png" alt="windows95 network icon" />
              <span>Network<br />Neighborhood</span>
            </button>
            <button class="icon">
              <img src="./images/icon_YouTube.png" alt="windows95 youtube icon" />
              <span>YouTube</span>
            </button>
            <button class="icon">
              <img src="./images/icon_bin.png" alt="windows95 Recycle Bin icon" />
              <span>Recycle Bin</span>
            </button>
            <button class="icon">
              <img src="./images/icon_Starbucks.png" alt="windows95 Starbucks icon" />
              <span>Starbucks</span>
            </button>
            <button class="icon iconTodo">
              <img src="./images/icon_Todo.png" alt="windows95 memo icon" />
              <span>Start Todo</span>
            </button>
          </div>
      
          <!-- task-bar -->
          <div class="taskbar" aria-label="window95 version graphics for taskbar">
            <div class="task-btns">
              <button class="startbtn">
                <img src="./images/icon_start.png" alt="windows95 icon" />
                Start
              </button>
              <span class="todobtn">Start Todo</span>
            </div>
            <span class="task-clock" aria-current="time">00:00:00</span>
          </div>
      
          <!------------------ MODAL ------------------>
          <div class="modal">
            <!-- titlebar -->
            <header class="titlebar">
              <h1 class="titlebar__title">Start Todo</h1>
              <button class="titlebar__btn">✖</button>
            </header>
            <!-- greeting -->
            <div class="greeting-box">
              <!-- signinout -->
              <div class="signinout">
                <h2 class="message">Welcome!</h2>
                <form action="" class="form hidden">
                  <input required maxlength="10" type="text" placeholder="What is your name?" autofocus />
                </form>
                <h3 class="username hidden"></h3>
                <button class="signoutbtn hidden">sign out</button>
              </div>
              <img src="./images/gif_cat.gif" alt="walking cat" />
            </div>
      
            <main class="workspace">
              <!------------------ TODO ------------------>
              <div class="todo">
                <form class="todo__form">
                  <strong class="zerolength hidden">
                    Type your first Todo.<br />
                    Then you can get🍀
                  </strong>
                  <input class="input" type="text" placeholder="type..." />
                  <input class="input-submit" type="button" value="add" />
                </form>
                <ul class="todo__ul"></ul>
              </div>
              <!------------------ WIDGETS ------------------>
              <div class="widgets">
                <div class="widgets-btns">
                  <button class="onlytodo-btn">only To do</button>
                  <button class="onlydone-btn">only Done</button>
                  <button class="all-btn">All</button>
                </div>
                <div class="widgets-position">
                  <span class="item location"><img src="./images/icon_location.svg" alt="current location" /></span>
                  <span class="item weather"><img src="./images/icon_weather.svg" alt="current weather" /></span>
                </div>
              </div>
            </main>
          </div>
      
          <div class="loading"></div>`;

  const app = document.querySelector('#root');
  app.append(rootEl);
};

export default home;
