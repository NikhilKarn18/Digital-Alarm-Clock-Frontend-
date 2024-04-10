// Create some basic variable here
let digClock = document.getElementById("alarmClock");
//  initializes an empty array alarmList to store alarm times.
let alarmList = [];
let alarmTime = null;

// Create function to update the clock display as per current time
function updateTime() {
    const date = new Date();
    let hour = timeFormat(date.getHours());
    const minutes = timeFormat(date.getMinutes());
    const seconds = timeFormat(date.getSeconds());
    const ampm = (hour >= 12) ? 'PM' : 'AM'; // Determine AM/PM
    // Convert hours to 12-hour format
    hour = (hour % 12) || 12; 
    hour = timeFormat(hour);
    // Link all these and attach with digClock 
   digClock.innerText = hour + ":" + minutes + ":" + seconds +  " " + ampm;
}
// To ensure single digit values are padded with a leading zero
function timeFormat(time) {
    if (time < 10) return "0" + time;
    return time;
}

// import audio file from URL and create an "Audio" object.
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/4383");
audio.loop = true;
let alarmTimeout = null;

// setInterval = for updating the time at every second
setInterval(updateTime, 1000);

function setAlarmTime(value) {
    alarmTime = value;
}

function setAlarm() {
    if (alarmTime) {
        const present = new Date();
        const timeOfAlarm = new Date(alarmTime);
// Condition as we can't set the time in past
        if (timeOfAlarm > present) {
            const timeout = timeOfAlarm.getTime() - present.getTime();
            alarmTimeout = setTimeout(function() {
                audio.play();
            }, timeout);

            alarmList.push(timeOfAlarm);
            updateAlarmList();
            // A pop-up will come to show that alarm is set
            alert("Alarm Set!");
        }
    }
}

function deleteAlarm(index) {
    alarmList.splice(index, 1);
    updateAlarmList();
}
// function to update the displayed list of alarms
function updateAlarmList() {
    const alarmsDiv = document.getElementById("alarms");
    alarmsDiv.innerHTML = "";

   //Here it iterates over each alarm in the alarmlist array using forEach()
    alarmList.forEach((alarm, index) => {
        // For each alarm, it creates a new <div> element to represent the alarm item.
        const alarmItem = document.createElement("div");
        const deleteButton = document.createElement("button");

        alarmItem.textContent = "Alarm at " + alarm.toLocaleTimeString();
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteAlarm(index);
        // The delete button is appended as a child to the alarm item <div>.
        alarmItem.appendChild(deleteButton);
        alarmsDiv.appendChild(alarmItem);
    });
}
function clearAlarm() {
    audio.pause();
    alarmTime = null;
    clearTimeout(alarmTimeout);
    // Popup for alarm cleared will show here 
    alert("Alarm Cleared!");
}
