// $(document).ready(function () {

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDDrbJJsZNL_2Evw_0A6SuMTKgxp5YiaPE",
    authDomain: "train-scheduler-ckf.firebaseapp.com",
    databaseURL: "https://train-scheduler-ckf.firebaseio.com",
    projectId: "train-scheduler-ckf",
    storageBucket: "",
    messagingSenderId: "18225435426"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Capture Button Click
$("#add-train").on("click", function (event) {
    event.preventDefault();

// Grabbed values from text boxes
var trainName = $("#train-name").val().trim();
var destination = $("#destination").val().trim();
var trainTime = $("#train-time").val().trim();
var frequency = $("#frequency").val().trim();

// Code for handling the push
database.ref().push({
  trainName: trainName,
  destination: destination,
  trainTime: trainTime,
  frequency: frequency
});
// });


// Firebase watcher + initial loader
database.ref().on("child_added", function (childSnapshot) {

var newTrain = childSnapshot.val().trainName;
var newDestination = childSnapshot.val().destination;
var newTrainTime = childSnapshot.val().trainTime;
var newFrequency = childSnapshot.val().frequency;
console.log(trainName);

// Train Time 
var startTimeConverted = moment(newTrainTime, "hh:mm").subtract(1, "years");

// Current Time
var currentTime = moment.locale ();

// Difference between the times
var diffTime = moment().diff(moment(startTimeConverted), "minutes");

// Time apart (remainder)
var tRemainder = diffTime % newFrequency;

// Minute(s) Until Train
var tMinutesTillTrain = newFrequency - tRemainder;

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
var catchTrain = moment(nextTrain).format("HH:mm");

// Display On Page
$("#display").append(
  ' <tr><td>' + newTrain +
  ' </td><td>' + newDestination +
  ' </td><td>' + newFrequency +
  ' </td><td>' + catchTrain +
  ' </td><td>' + tMinutesTillTrain + ' </td></tr>');

// Clear input fields
$("#trainName, #destination, #trainTime, #frequency").val("");
// return false;
},
//Handle the errors
function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

}); 