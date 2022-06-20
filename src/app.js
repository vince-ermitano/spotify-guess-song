const button1 = document.querySelector('.button1');
const button2 = document.querySelector('.button2');
const button3 = document.querySelector('.button3');
const button4 = document.querySelector('.button4');

button1.querySelector('p').innerHTML = '20 Min';
button2.querySelector('p').innerHTML = 'Houstonfornication';
button3.querySelector('p').innerHTML = 'TSU';
button4.querySelector('p').innerHTML = 'Bound 2';

console.log(button1.querySelector('p').innerHTML);

const answer = 'TSU';

const buttons = document.querySelectorAll('.button');

function checkIfAnswerCorrect(event) {
    if (event.currentTarget.querySelector('p').innerHTML === answer) {
        event.currentTarget.style.backgroundColor = 'green';
    } else {
        event.currentTarget.style.backgroundColor = 'red';
    }
    buttons.forEach(button => {
        button.removeEventListener('click', checkIfAnswerCorrect);
        button.removeEventListener('mouseenter', changeBackgroundToAqua);
        button.removeEventListener('mouseleave', changeBackgroundRevert)
    })
}

function changeBackgroundToAqua(event) {
    event.currentTarget.style.backgroundColor = 'aquamarine';
}

function changeBackgroundRevert(event) {
    event.currentTarget.style.backgroundColor = 'white';
}

//add event listener for all buttons
buttons.forEach(button => {
    button.addEventListener('mouseenter', changeBackgroundToAqua);
    button.addEventListener('mouseleave', changeBackgroundRevert);
    button.addEventListener('click', checkIfAnswerCorrect);
});
