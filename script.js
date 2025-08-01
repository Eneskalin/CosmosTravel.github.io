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

let selectedNames = [];
document.querySelectorAll('#map path').forEach(function (path) {
  path.addEventListener('click', function () {
    path.classList.toggle('selected');

    selectedNames=[];
    selectedIds = [];
    document.querySelectorAll('#map path.selected').forEach(function (selectedPath) {
      selectedIds.push(selectedPath.id);
      selectedNames.push(selectedPath.getAttribute('name'))
    });

  });
});


const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', () => {
  const map2 = document.getElementById('map2');
  const countryList = document.getElementById('selected-countries');

  // Display selected country names in the list
  countryList.innerHTML = ` `;

  selectedNames.forEach((countryName) => {
    const listItem = document.createElement('li');
    listItem.textContent = countryName;
    countryList.appendChild(listItem);
  });

  


  // Reset all selections in the second map
  map2.querySelectorAll('path').forEach((path) => {
    path.classList.remove('selected');
  });

  // Apply selection to the second map based on selected IDs
  selectedIds.forEach((id) => {
    const country = map2.getElementById(id);
    if (country) {
      country.classList.add('selected');
    }
  });

  // Smooth scroll to the slider section
  document.querySelector('.slider').scrollIntoView({
    behavior: 'smooth',
  });
});






function captureDiv() {
  const element = document.getElementById('capture');

  html2canvas(element, {
    backgroundColor: null,  // Arka plan şeffaf olsun istiyorsan
    useCORS: true,          // Farklı domain görselleri için
    scale: 2,               // Daha yüksek çözünürlük
    windowWidth: element.scrollWidth,  // Tüm alanı kapsa
    windowHeight: element.scrollHeight
  }).then(function (canvas) {
    canvas.toBlob(function (blob) {
      saveAs(blob, 'mymap.png');
    });
  });
}


document.getElementById('lang').addEventListener('click', function () {
  if (this.src === 'https://hatscripts.github.io/circle-flags/flags/tr.svg') {
    this.src = 'https://hatscripts.github.io/circle-flags/flags/gb.svg';
    title.textContent = 'My Erasmus+ Travel Map';
    generateBtn.textContent = "Generate";
    imgTitle.textContent = "My Travel Map";
    downloadBtn.textContent = "Download";
    copyright.textContent = "All Rights Reserved © 2024"


  } else {
    this.src = 'https://hatscripts.github.io/circle-flags/flags/tr.svg';
    title.textContent = 'Erasmus+ Seyahat Haritam';
    generateBtn.textContent = "Oluştur";
    imgTitle.textContent = "Seyahat Haritam";
    downloadBtn.textContent = "İndir";
    copyright.textContent = "Tüm Hakları Saklıdır © 2024"


  }
});

document.addEventListener('DOMContentLoaded', function () {
  const svg = document.getElementById('map');
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  document.body.appendChild(tooltip);

  svg.addEventListener('mousemove', function (e) {
      const target = e.target.closest('path[name]');
      if (target) {
          const name = target.getAttribute('name');
          tooltip.textContent = name;
          tooltip.style.left = e.pageX + 10 + 'px';
          tooltip.style.top = e.pageY + 10 + 'px';
          tooltip.classList.add('show');
      } else {
          tooltip.classList.remove('show');
      }
  });

  var saveBtn = document.getElementById('save-favorite');
  if (saveBtn) {
    saveBtn.onclick = function() {
      var country = document.getElementById('fav-country').value;
      var city = document.getElementById('fav-city').value;
      if (country && city) {
        document.getElementById('favorite-country').textContent = 'Favori Ülke: ' + country;
        document.getElementById('favorite-city').textContent = ' | Favori Şehir: ' + city;
        document.getElementById('favorite-box').style.display = 'block';
      }
    };
  }
});

