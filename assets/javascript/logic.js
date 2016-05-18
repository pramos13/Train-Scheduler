$(document).ready(function(){

    var db = new Firebase("https://traintymes.firebaseio.com/")

    // Submit Button Click 
    $("#submitButton").on("click", function(){
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").format("X");
      var frequency = $("#frequencyInput").val().trim();

      

      console.log(firstTrain)
      //Firebase pushes
      db.push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      })

      //Empty input boxes after submit
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainTimeInput").val("");
      $("#frequencyInput").val("");

      //No clue ; )
      return false;

    });

  //data pushed to firebase.
  db.on("child_added", function(childSnapshot) {

    //Firebase Variables
    var fireName = childSnapshot.val().trainName;
    var fireDestination = childSnapshot.val().destination;
    var fireFirstTrain = childSnapshot.val().firstTrain;
    var fireFrequency = childSnapshot.val().frequency;

  

    var time = fireFirstTrain 
    time = time.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);
    var timeValue = "" + ((hours >12) ? hours - 12 : hours); 
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; 
    timeValue += (hours >= 12) ? "pm" : "am"; 

    var minutesAway = "";

    var nextArrival = "";


    var firstTimeConverted = moment(fireFirstTrain,"hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % fireFrequency; 
    var tMinutesTillTrain = fireFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm")

    $("#trainTable > tbody").append("<tr class='active'><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + "Every " + fireFrequency + " Minutes" + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  });

});

function startTime() {

    var currentTime = moment().format('HH:mm:ss');
    $('#time').html(currentTime);

    // run "startTime" on a timeout
    var t = setTimeout(startTime, 500);

}

// show the clock at page load
$(document).ready(function() {
  startTime();
});