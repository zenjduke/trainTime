// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyAnoy9Afc8CsyMKGxYnECdOKUT0DdFkxZo",
  authDomain: "train-schedule-project-zjd.firebaseapp.com",
  databaseURL: "https://train-schedule-project-zjd.firebaseio.com",
  projectId: "train-schedule-project-zjd",
  storageBucket: "train-schedule-project-zjd.appspot.com",
  messagingSenderId: "983434592459"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFirst = $("#first-train-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data

  var newTrain = {
    name: trainName,
    destination: trainDest,
    firstTrain: trainFirst,
    frequency: trainFreq,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().firstTrain;
  var trainFreq = childSnapshot.val().frequency;

    //Calculate next arrival and minutes away.

    var firstTimeConverted = moment(trainFirst, 'HH:mm').subtract(1, "years");


    console.log(trainFirst);

    // console.log(firstTimeConverted);
  
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
  
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
  
    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);
  
    // Minute Until Train
    var minAway = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minAway);
  
    // Next Train
    var trainArrival = moment().add(minAway, "minutes");
    var nextTrain = moment(trainArrival).format("LT");
    console.log("ARRIVAL TIME: " + moment(minAway).format("hh:mm"));

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>");

});









