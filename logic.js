var trainData = new Firebase("https://train-scheduleweek7.firebaseio.com/");
var dataRef = newFirebase(url);

var newTrain ={
	name: trainName,
	destination: destName,
	firstTrainTime: trainTime,
	frequency: freq,
};

//button to add trains to schedule
$("#addtrainButton").on("click", function(){

	var trainName = $("#trainNameInput").val().trim();
	var dest = $("#destInput").val().trim();
	var trainTime = $("#trainTimeInput").val().trim();
	var freq = $("#freqInput").val().trim();


var newTrain ={
	name: trainName,
	dest: dest,
	trainTime: trainTime,
	freq: freq,
}

trainData.push(newTrain);

console.log(newTrain.name);
console.log(newTrain.dest);
console.log(newTrain.trainTime);
console.log(newTrain.freq);

//clears text boxes

$("#trainNameInput").val("");
$("#destInput").val("");
$("#trainTimeInput").val("");
$("#freqInput").val("");

//Prevents moving to another page
	return false;
});

//Firebase event to add train info to database and the new row to html

trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	//store it all into variable

	var trainName= childSnahpshot.val().name;
	var dest= childSnapshot.val().dest;
	var trainTime= childSnapshot.val().time;
	var freq= childSnapshot.val().freq;

	//consolelog it all

	console.log(trainName);
	console.log(dest);
	console.log(trainTime);
	console.log(freq);

	//format train time
	var trainTimeFormat = moment.unix(trainTime).format("HH:mm");

	//next train calculation
	
	// train time pushed back a year
	var trainTimeConverted = moment(trainTime,"HH:mm").subtract(1, "years");
	console.log(trainTimeConverted);
	
	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
	
	// Difference between the times
	var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);
	
	// Time apart (remainder)
	var tRemainder = diffTime % freq;
	console.log(tRemainder);
	
	// Minutes Until Train
	var tMinutesTillTrain = freq - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
	
	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"))

	//add train data to table
	$("#trainTable > tbody").append("<tr><td>" +trainName + "</td><td>" + dest + "</td><td>" + trainTime + "</td><td>" + freq + "</td></tr>");


});


