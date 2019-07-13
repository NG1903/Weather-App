console.log('Client side Javascript Loaded');

const form = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {

  msg2.textContent = 'Loading...'
  fetch(`/weather?location=${search.value}`).then((response) => {
    response.json().then((data) => {
      if(data.error){
        msg2.textContent = data.error;
      }
      else{
        msg2.textContent = data.Weather_Report;
      }  
    });
  });
  e.preventDefault();
})

