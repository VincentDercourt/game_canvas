window.onload = init;

function init() {
  loadIframe("#page", `game/${getHash()}/index.html`);
  for(let element of document.querySelectorAll("main#main>nav>ul>li>a")){
    element.onclick = onClick;
  }
  changeActive(getHash());
}

function changeActive(hash) {
  for(let element of document.querySelectorAll("main#main>nav>ul>li")){
    element.classList.remove("active");
  }
  document.querySelector("#"+hash).classList.add("active");
}

function onClick() {
  const a = this;
  const li = a.closest("li");
  const parentMain = a.closest("main#main");
  const parentNav = a.closest("main#main>nav");
  const parentUl = a.closest("main#main>nav>ul");

  if(li.classList.contains("openNav")) {
    parentMain.classList.toggle("displayNav");
    for(let elem of parentUl.querySelectorAll("p.description")){
      elem.classList.toggle("hidden");
    }
  }
  location.hash = a.hash;
  loadIframe("#page",`game/${getHash()}/index.html`);
  changeActive(getHash());
}
function loadIframe(selector, src) {
  document.querySelector(selector).innerHTML = `<iframe src="${src}"></iframe>`;
}
function getHash() {
  return location.hash.replace("#", "");
}