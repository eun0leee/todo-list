const Home = () => {
  const rootEl = document.createElement('div');
  rootEl.innerHTML = `
          <!------------------ BACKGROUND ------------------>
          <!-- icons -->
          <div class="background" aria-label="window95 version for background icons">
            <button class="background-icon">
              <img src="./images/icon_my.png" alt="windows95 computer icon" />
              <span>My Computer</span>
            </button>
            <button class="background-icon">
              <img src="./images/icon_network.png" alt="windows95 network icon" />
              <span>Network<br />Neighborhood</span>
            </button>
            <button class="background-icon">
              <img src="./images/icon_YouTube.png" alt="windows95 youtube icon" />
              <span>YouTube</span>
            </button>
            <button class="background-icon">
              <img src="./images/icon_bin.png" alt="windows95 Recycle Bin icon" />
              <span>Recycle Bin</span>
            </button>
            <button class="background-icon">
              <img src="./images/icon_Starbucks.png" alt="windows95 Starbucks icon" />
              <span>Starbucks</span>
            </button>
            <button class="background-icon iconTodo">
              <img src="./images/icon_Todo.png" alt="windows95 memo icon" />
              <span>Start Todo</span>
            </button>
          </div>
      
          <!-- task-bar -->
          <div class="taskbar" aria-label="window95 version graphics for taskbar">
            <div class="taskbar-btns">
              <button class="startbtn">
                <img src="./images/icon_start.png" alt="windows95 icon" />
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
                </form>
                <h3 class="print-name hidden"></h3>
                <button class="signoutbtn hidden">sign out</button>
              </div>
              <img src="./images/gif_cat.gif" alt="walking cat" />
            </div>
      
            <main class="workspace">
              <!------------------ TODO ------------------>
              <div class="todo">
                <form class="todo-form">
                  <strong class="empty-todo hidden">
                    Type your first Todo.<br />
                    Then you can get🍀
                  </strong>
                  <input class="todo-add-input" type="text" placeholder="type..." />
                  <input class="todo-submit-input" type="button" value="add" />
                </form>
                <ul class="todo-list"></ul>
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
          </section>
      
          <div class="loading"></div>`;

  const app = document.querySelector('#root');
  app.append(rootEl);
};

export default Home;
