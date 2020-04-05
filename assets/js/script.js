window.onload = init;

function init() {
  loadIframe("#page", `game/${getHash()}/index.html`);
  for(let element of document.querySelectorAll("main#main>nav>ul li>a")){
    element.onclick = onClick;
  }
  document.querySelector("li.openNav").onclick = function () {
    const parentMain = this.closest("main#main");
    const parentUl = this.closest("main#main>nav>ul");
    parentMain.classList.toggle("displayNav");
    console.log(this.querySelector("img"));
    this.querySelector("img").src = parentMain.classList.contains("displayNav") ? "assets/img/arrow-from-right.svg" : "assets/img/arrow-from-left.svg";
    console.log(this.querySelector("img"));
    for(let elem of parentUl.querySelectorAll("p.description")){
      elem.classList.toggle("hidden");
    }
  };
  changeActive(getHash());

  document.querySelector("iframe").onload = resizeIframe;

  SimpleScrollbar.initAll();
}

function changeActive(hash) {
  for(let element of document.querySelectorAll("main#main>nav>ul>li")){
    element.classList.remove("active");
  }
  document.querySelector("#"+hash.replace(/\/[A-z0-9]+/g,"")).classList.add("active");
}

function onClick(e) {
  const a = this;
  if(a.href !== "/index.html" && a.href !== location.origin+"/index.html" && a.href !== location.origin+"/project2/index.html") {
    e.preventDefault();
  }
  location.hash = a.hash;
  loadIframe("#page",`game/${getHash()}/index.html`);
  changeActive(getHash());
}

function loadIframe(selector, src) {
  document.querySelector(selector).innerHTML = `<iframe src="${src}"></iframe>`;
  document.querySelector("iframe").onload = resizeIframe;
  SimpleScrollbar.initEl(document.querySelector(selector));
}

function getHash() {
  return location.hash.replace("#", "");
}

function resizeIframe() {
  this.contentWindow.document.documentElement.style.maxWidth = document.querySelector("#page").clientWidth + "px";
  this.style.height = this.contentWindow.document.documentElement.scrollHeight + 'px';
  this.style.width = this.contentWindow.document.documentElement.scrollWidth + 'px';
  this.contentWindow.document.documentElement.style.margin = "auto";
  this.contentWindow.document.documentElement.style.overflow = "hidden";
  this.contentWindow.document.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);
}

window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);
