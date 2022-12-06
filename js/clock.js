const clockEl = document.querySelector(".task-clock");

function clock() {
  //String의 s는 대문자로!
  const hours = String(new Date().getHours()).padStart("2", 0);
  const minutes = String(new Date().getMinutes()).padStart("2", 0);
  const seconds = String(new Date().getSeconds()).padStart("2", 0);

  clockEl.innerText = `${hours}:${minutes}:${seconds}`;
}

clock();
setInterval(clock, 1000);

//
