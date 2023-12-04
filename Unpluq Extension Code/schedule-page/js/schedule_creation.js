document.addEventListener('DOMContentLoaded', function () {
    // Add click event listener to the 'Submit' label
    var save_button = document.getElementById('schedule_save');

    save_button.addEventListener('click', function (event) {
        // save_button is actually a link. the line below is to prevent it from navigating before it fetches input
        event.preventDefault();
        fetchInputs();
    });
});

function fetchInputs(){
    var scheduleName = document.getElementById('schedule_name').value;
    var startTimeHHmm = document.getElementById('start_time').value;
    var endTimeHHmm = document.getElementById('end_time').value;
    var checkedDays = fetchDays();
    var blockedWebsites = fetchBlockedWebsites();
    var barrierType = 4;
    var barrierDifficulty = parseInt(document.getElementById('difficulty_range').value);
    createNewSchedule(scheduleName,startTimeHHmm,endTimeHHmm,checkedDays,blockedWebsites, barrierType, barrierDifficulty);
}

function createNewSchedule(name,start,end, days, websites, barrierType, barrierDifficulty){
    var newSchedule = [name,start, end, days, websites, barrierType, barrierDifficulty];
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