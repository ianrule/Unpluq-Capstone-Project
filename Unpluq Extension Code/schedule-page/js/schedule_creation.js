document.addEventListener('DOMContentLoaded', function () {
    // Add click event listener to the 'Submit' label
    var save_button = document.getElementById('schedule_save');

    save_button.addEventListener('click', function (event) {
        // save_button is actually a link. the line below is to prevent it from navigating before it fetches input
        event.preventDefault();
        newSchedule = fetchInputs();
        checkValidInput(newSchedule, function (isValid) {
            if (isValid) {
                console.log("Input is valid.");
                createNewSchedule(newSchedule);
                
            } else {
                console.log("Input is not valid.");
            }
        });
    });
});

function fetchInputs(){
    var scheduleName = document.getElementById('schedule_name').value;
    if(!document.getElementById('all_day').checked){
        var startTimeHHmm = document.getElementById('start_time').value;
        var endTimeHHmm = document.getElementById('end_time').value;
    }
    else{
        var startTimeHHmm = "00:00";
        var endTimeHHmm = "23:59";
    }
    var checkedDays = fetchDays();
    var blockedWebsites = fetchBlockedWebsites();
    var barrierType = 4;
    var barrierDifficulty = parseInt(document.getElementById('difficulty_range').value);
    var newSchedule = [scheduleName, startTimeHHmm, endTimeHHmm, checkedDays, blockedWebsites, barrierType, barrierDifficulty];
    return newSchedule;
}

function createNewSchedule(newSchedule){
    console.log(newSchedule);

    chrome.storage.sync.get(['blockSchedules'], function(result){
        var blockSchedules = result.blockSchedules || [];
        blockSchedules.push(newSchedule);
        chrome.storage.sync.set({blockSchedules: blockSchedules }, function() {
            console.log('Updated block schedules saved');
        });
    });
}

function fetchDays(){
    var checkboxes = document.querySelectorAll('input[name="day"]');
    var checkedDays = [];
    
    checkboxes.forEach(function(checkbox){
        if(checkbox.checked){
            checkedDays.push(true);
        }
        else{
            checkedDays.push(false);
        }
    });

    return checkedDays;
}

function fetchBlockedWebsites(){
    var checkboxes = document.querySelectorAll('input[name="blocked_website"]:checked');
    var blockedWebsites = [];
    
    checkboxes.forEach(function(checkbox){
        blockedWebsites.push(checkbox.value);
    });

    return blockedWebsites;
}

function checkValidInput(newSchedule, callback) {
    if (newSchedule[0].trim() === "") {
        callback(false);
        return;
    }

    // test for 24-hour time format
    const pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!pattern.test(newSchedule[1]) || !pattern.test(newSchedule[2])) {
        callback(false);
        return;
    }

    if(!newSchedule[3].includes(true)){
        callback(false);
        return;
    }
    if (newSchedule[4].length === 0) {
        callback(false);
        return;
    }

    chrome.storage.sync.get(['blockSchedules'], function (result) {
        var existingblockSchedules = result.blockSchedules || [];

        // Check if the first entry of the input array matches any in existingblockSchedules
        var isDuplicate = existingblockSchedules.some(function (schedule) {
            return schedule[0].trim() === newSchedule[0].trim();
        });

        if (isDuplicate) {
            callback(false);
            return;
        }
        callback(true);
    });   
}