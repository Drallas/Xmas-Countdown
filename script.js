// Set the date we're counting down to: 25 December 00:00 local time.
// new Date(year, 11, 25) uses local time; a "YYYY-12-25" string is parsed as UTC.
// After Christmas Day, count down to next year's Christmas.
function getCountDownDate(today) {
  var year = today.getFullYear();
  if (today > new Date(year, 11, 26)) {
    year++;
  }
  return new Date(year, 11, 25).getTime();
}

// Update the count down every 1 second
var x = setInterval(function () {
  // Get todays date and time
  var today = new Date();

  // Display the current time in id="current_date"
  document.getElementById("current_date").innerHTML = "Vandaag is het : " + today.toLocaleDateString();

  // On Christmas Day, write some text
  if (today.getMonth() == 11 && today.getDate() == 25) {
    document.getElementById("counter").innerHTML = "Fijne Kerst";
    document.getElementById("weeks").innerHTML = "";
    return;
  }

  // Find the distance between now an the count down date, in wall-clock time:
  // both sides as if they were UTC, so a DST change doesn't add or remove an hour.
  var target = new Date(getCountDownDate(today));
  var distance =
    Date.UTC(target.getFullYear(), target.getMonth(), target.getDate()) -
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(),
      today.getHours(), today.getMinutes(), today.getSeconds());

  // Time calculations for days, hours, minutes and seconds
  var weeks = Math.floor(distance / (1000 * 60 * 60 * 24) / 7);
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in an element with id="weeks"
  document.getElementById("counter").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  document.getElementById("weeks").innerHTML = "nog " + weeks + " weken!";
}, 1000);
