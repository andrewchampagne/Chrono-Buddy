



let workTime = 0;
let workHours = 0;
let seconds = 0;
let workMinutes = workTime;
let breakCount = 0;
let stop = false;
let timerInterval;



let promptInput;

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workMinutes < 10 ? "0" + workMinutes : workMinutes;
    document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;
}

async function fetchResponse(prompt) {
    const response = await fetch(`/api/response?prompt=${encodeURIComponent(prompt)}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.response)
    return data.response;
}

async function createPrompt() {
    // Get the value from the text input
    const inputValue = document.getElementById('myTextInput').value;

    // Store the value in a variable
    let storedValue = inputValue;

    
    console.log(storedValue);
    promptInput = storedValue;
    document.getElementById('myTextInput').value=''
    let response = await fetchResponse(promptInput);
    let numbers = response.split(" ");
    workHours = numbers[0];
    workMinutes = numbers[1];
    seconds = numbers[2];
    clearInterval(timerInterval);
    if(document.getElementById('pause').style.display == "block"){
        document.getElementById('pause').style.display = "none";
        document.getElementById('start').style.display = "block";
    }
    if(workHours > 20){ workHours = 20};
    if(workHours == 20){
        workMinutes = 0;
        seconds = 0;
        document.getElementById('sub').innerHTML = '"You should not do any task for this long! Max Limit is 20 hours"';
    }
    else if(workHours == 0 && workMinutes == 0 && seconds == 0){
        console.log("reached");
        document.getElementById('sub').innerHTML = '"Try entering a task or certain time"';
    }
    else{
        document.getElementById('sub').innerHTML = '"What should we do today?"';
    }
    document.getElementById('hours').innerHTML =  workHours < 10 ? "0" + workHours : workHours;
    document.getElementById('minutes').innerHTML = workMinutes < 10 ? "0" + workMinutes : workMinutes;
    document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;
}


// start timer
function start(event) {
    
    if (event) event.preventDefault();

    // change button
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "block";

    clearInterval(timerInterval);

    stop = false;

    // countdown
    let timerFunction = () => {
        if(stop){
            clearInterval(timerInterval);
            return;
        }
        seconds -= 1;

        if (seconds === -1) {
            workMinutes -= 1;
            seconds = 59;
            
        }
        if (workMinutes === -1) {
            workHours -= 1;
            workMinutes = 59;
        }
        if(workHours === -1){
            clearInterval(timerInterval);
            return;
        }

        // change the display
        document.getElementById('hours').innerHTML =  workHours < 10 ? "0" + workHours : workHours;
        document.getElementById('minutes').innerHTML = workMinutes < 10 ? "0" + workMinutes : workMinutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

        
    }

    // start countdown
    
    timerInterval = setInterval(timerFunction, 1000); 
}

function pause(event) {
    if (event) event.preventDefault();

    document.getElementById('pause').style.display = "none";
    document.getElementById('start').style.display = "block";

    stop = true;
}

// Adding event listeners for buttons to handle form submission prevention
document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('myTextInput').addEventListener('keydown', function(event) {
        // Check if the key pressed is the Enter key
        if (event.key === 'Enter') {
            createPrompt();
        }
    });
});