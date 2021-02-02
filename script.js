const quoteDiv = document.getElementById('quote');
const authorDiv = document.getElementById('author');
const mainWrappperDiv = document.querySelector('.main');
const backImage = document.querySelector('.back-img');
const API_URL = 'https://quotes.rest/qod.json';

const getQuote = () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(res => {
      const quoteData = res.contents.quotes[0];
      quoteDiv.innerText = quoteData.quote;
      authorDiv.innerText = quoteData.author;
      mainWrappperDiv.style.backgroundImage = `url(${quoteData.background})`;
    })
    .catch(err => console.log(err));
};

window.onload = function () {
  // Call the function initially
  getQuote();
};

const downloadImage = () => {
  html2canvas(mainWrappperDiv, {
    // allowTaint: true,
    logging: true
    // taintTest: false
  }).then(canvas => {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.download = 'html_image.png';
    link.href = canvas.toDataURL('image/png');
    link.target = '_blank';
    link.click();

    // document.body.appendChild(canvas);
    // window.open(canvas.toDataURL());
  });
};

const downloadBtn = document.querySelector('.download-image');
downloadBtn.addEventListener('click', downloadImage);
