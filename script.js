window.onscroll = function () { stickNavbar() };

const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;
let selectedIds = [];

function stickNavbar() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

const particleContainer = document.querySelector('.particles');
const starBackground = document.querySelector('.star-background');

for (let i = 0; i < 100; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.top = `${Math.random() * 100}vh`;
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.animationDelay = `${Math.random() * 10}s`;
  particleContainer.appendChild(particle);
}

for (let i = 0; i < 300; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  starBackground.appendChild(star);
}


let index = 0;

const svg = document.querySelector('svg');
const container = document.querySelector('.container');
let isZoomed = false;
const originalViewBox = svg.getAttribute('viewBox');
const zoomViewBox = '300 234 400 616'; // Daha az zoom için bu değerleri ayarlayın

function zoomIn() {
  svg.setAttribute('viewBox', zoomViewBox);
  isZoomed = true;
}

function zoomOut() {
  svg.setAttribute('viewBox', originalViewBox);
  isZoomed = false;
}

function panSVG(e) {
  if (!isZoomed) return;

  const { left, top, width, height } = svg.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 1000; // 1000 orijinal SVG genişliği
  const y = ((e.clientY - top) / height) * 684; // 684 orijinal SVG yüksekliği

  const newViewBoxX = x - (400 / 2); // Zoom seviyesine göre bu değerleri ayarlayın
  const newViewBoxY = y - (616 / 2);

  svg.setAttribute('viewBox', `${newViewBoxX} ${newViewBoxY} 400 616`);
}

container.addEventListener('mouseenter', () => {
  if (window.innerWidth > 768) {
    zoomIn();
  }
});

container.addEventListener('mouseleave', () => {
  if (window.innerWidth > 768) {
    zoomOut();
  }
});

container.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 768) {
    panSVG(e);
  }
});

document.querySelectorAll('#map path').forEach(function (path) {
  path.addEventListener('click', function () {
    path.classList.toggle('selected');

    // Update the selectedIds array
    selectedIds = [];
    document.querySelectorAll('#map path.selected').forEach(function (selectedPath) {
      selectedIds.push(selectedPath.id);
    });

    // Log the array to the console
    console.log(selectedIds);
  });
});


const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', () => {
  const map2 = document.getElementById('map2');

  // İlk olarak, ikinci haritayı temizleyelim
  map2.querySelectorAll('path').forEach((path) => {
    path.classList.remove('selected'); // Tüm seçimleri kaldır
  });

  // Ardından, selectedIds dizisindeki ülke ID'lerine göre ikinci haritayı güncelle
  selectedIds.forEach((id) => {
    const country = map2.getElementById(id);
    if (country) {
      country.classList.add('selected'); // Seçilen ülkeleri doldur
    }
  });
  document.querySelector('.slider').scrollIntoView({
    behavior: 'smooth'
  });

});



function captureDiv() {
  var element = document.getElementById('capture');
  html2canvas(element).then(function (canvas) {
    canvas.toBlob(function (blob) {
      saveAs(blob, 'screenshot.png');
    });
  });
}

document.getElementById('lang').addEventListener('click', function() {
  if (this.src === 'https://hatscripts.github.io/circle-flags/flags/tr.svg') {
      this.src = 'https://hatscripts.github.io/circle-flags/flags/gb.svg';
      title.textContent = 'My Erasmus Travel Map';
      generateBtn.textContent ="Generate";
      imgTitle.textContent = "My Travel Map";
      downloadBtn.textContent = "Download";
      copyright.textContent = "All Rights Reserved © 2024"


  } else {
      this.src = 'https://hatscripts.github.io/circle-flags/flags/tr.svg';
      title.textContent = 'Erasmus Seyahat Haritam';
      generateBtn.textContent ="Oluştur";
      imgTitle.textContent = "Seyahat Haritam";
      downloadBtn.textContent = "İndir";
      copyright.textContent = "Tüm Hakları Saklıdır © 2024"


  }
});

