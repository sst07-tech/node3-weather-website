console.log('Client side javascript file is loaded.');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })



const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const location = searchElement.value;
    console.log('Location '+location);

    messageOne.textContent = 'Loading Message...';
    messageTwo.textContent = '';

    //fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log('Error returned is '+data.error);
                //Rendering the data in the p tag to be show on UI
                messageOne.textContent = data.error;
            }else{
                console.log(data.address);
                messageTwo.textContent = `It is currently ${data.temperature} degrees out. Overall forecast is ${data.forecast}.`;
                messageOne.textContent = data.address;
            }
        }) 
    })
})