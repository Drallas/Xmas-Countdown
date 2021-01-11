// Set the date we're counting down to

var currentYear = new Date().getFullYear();
var countDownDate = new Date(currentYear + "-12-25").getTime();
//also good is var countDownDate = new Date("Dec 25, 2017 00:00:00");

// Update the count down every 1 second
var x = setInterval(function () {
  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var weeks = Math.floor(distance / (1000 * 60 * 60 * 24) / 7);
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in an element with id="weeks"
  document.getElementById("counter").innerHTML =
    days + "d " + (hours -1) + "h " + minutes + "m " + seconds + "s ";
  document.getElementById("weeks").innerHTML = "nog " + weeks + " weken!";

  // Display the current time in id="current_date"
  var todayItis = new Date()
  document.getElementById("current_date").innerHTML = "Vandaag is het : " +  (todayItis.toLocaleDateString());

  // If the count down is finished, write some text
  if (distance == 0) {
    clearInterval(x);
    document.getElementById("counter").innerHTML = "Fijne Kerst";
  }
}, 1000);
