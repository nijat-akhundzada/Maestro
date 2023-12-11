const menuIcon = document.querySelector(".menu-icon");
const links = document.querySelector(".links");
const nav = document.querySelector("nav");

menuIcon.addEventListener("click", () => {
  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.classList.replace("fa-bars", "fa-xmark");
    links.style.display = "flex";
    links.style.position = "absolute";
    links.style.width = "70%";
    links.style.top = "115px";
    links.style.right = "50px";
    links.style.backgroundColor = "#333333";
    nav.style.paddingTop = "20px";
    links.querySelectorAll("a").forEach((link) => {
      link.style.color = "#fff";
      link.style.padding = "30px";
      link.style.display = "block";
      link.style.width = "100%";
    });
    links.style.flexDirection = "column";
  } else {
    menuIcon.classList.replace("fa-xmark", "fa-bars");
    links.style.display = "none";
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 570) {
    links.removeAttribute("style");
    links.querySelectorAll("a").forEach((link) => {
      link.removeAttribute("style");
    });
    menuIcon.classList.replace("fa-xmark", "fa-bars");
  } else if (
    window.innerWidth <= 580 &&
    menuIcon.classList.contains("fa-bars")
  ) {
    links.style.display = "none";
  }
});
