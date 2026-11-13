const photos = [
  { src: "images/photo1.webp", title: "Terrasse au bord du lac", alt: "Balustrade en pierre au bord d'un lac turquoise avec un ferry et des montagnes" },
  { src: "images/photo2.webp", title: "Balcon sous les arbres", alt: "Balustrade fleurie ombragée par des arbres face à un lac aux eaux turquoise" },
  { src: "images/photo3.webp", title: "Café sur le lac", alt: "Table de café sur une terrasse au bord d'un lac, bordée de villas jaunes et d'arbres" },
  { src: "images/photo4.webp", title: "Arches face à la mer", alt: "Colonnes et arches de pierre ouvertes sur la mer et des falaises verdoyantes" },
  { src: "images/photo5.webp", title: "Sous l'arche de pierre", alt: "Vue sous une arche de pierre sur des bateaux naviguant sur un lac entouré de montagnes" },
  { src: "images/photo6.webp", title: "Village au coucher du soleil", alt: "Village avec clocher au bord d'un lac, montagnes en arrière-plan et fleurs au premier plan" }
];

const INTERVALLE = 3000; 

let index = 0;
let timer = null; 


const toolbar = document.getElementById("toolbar");
const toolbarToggle = document.getElementById("toolbar-toggle");
const btnPrevious = document.getElementById("slider-previous");
const btnToggle = document.getElementById("slider-toggle");
const btnNext = document.getElementById("slider-next");
const btnRandom = document.getElementById("slider-random");
const image = document.getElementById("slider-image");
const title = document.getElementById("slider-title");

function showPhoto(i) {
  index = (i + photos.length) % photos.length;
  const photo = photos[index];

  image.classList.add("fondu");
  setTimeout(() => {
    image.src = photo.src;
    image.alt = photo.alt;
    title.textContent = photo.title;
    image.classList.remove("fondu");
  }, 250);
}

function next() {
  showPhoto(index + 1);
}

function previous() {
  showPhoto(index - 1);
}

function random() {
  if (photos.length < 2) return;
  let n;
  do {
    n = Math.floor(Math.random() * photos.length);
  } while (n === index);
  showPhoto(n);
}

function startSlider() {
  stopSlider(); 
  timer = setInterval(next, INTERVALLE);
  btnToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function stopSlider() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  btnToggle.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function toggleSlider() {
  if (timer === null) {
    startSlider();
  } else {
    stopSlider();
  }
}

toolbarToggle.addEventListener("click", (e) => {
  e.preventDefault(); 
  toolbar.classList.toggle("hidden");
});

btnPrevious.addEventListener("click", previous);
btnNext.addEventListener("click", next);
btnRandom.addEventListener("click", random);
btnToggle.addEventListener("click", toggleSlider);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") previous();
});

showPhoto(0);
