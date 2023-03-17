// import Swal from 'sweetalert2/dist/sweetalert2';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.min.css';
import './style.css';

const inputCoin = document.getElementById('input-coin');
const searchBtn = document.getElementById('search');
const listCoin = document.getElementById('list');
const p = document.getElementById('text-p');

searchBtn.addEventListener('click', () => {
  const moeda = inputCoin.value.toUpperCase();
  const apiURL = `https://api.exchangerate.host/latest?base=${moeda}`;
  const maxDec = 3;

  if (!moeda) {
    Swal.fire({
      title: 'Ops...',
      text: 'Você precisa passar uma moeda',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  } else {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        // console.log(Object.entries(data));
        if (data.base === moeda) {
          listCoin.innerHTML = '';
          p.innerHTML = `Valores referentes a 1 ${moeda}`;
          const arrayCoins = Object.entries(data.rates);
          arrayCoins.forEach((pairCoinValue) => {
            const [coin, value] = pairCoinValue;
            const li = document.createElement('li');
            const emoji = '&#x1FA99;';
            const coinValue = Number(value).toFixed(maxDec);
            li.innerHTML = `${emoji} ${coin}: <span>${coinValue}</span>`;
            listCoin.appendChild(li);
          });
        } else {
          throw new Error('Moeda não existente!');
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Ops...',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  }
});
