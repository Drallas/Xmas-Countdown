// Texts per language
var TEXT = {
  nl: {
    locale: "nl-NL", langLabel: "Taal",
    today: "Vandaag is het ", headline: "Bijna Kerst", xmasHeadline: "Fijne Kerst",
    before: "Nog ", after: ", of precies:",
    week: ["week", "weken"], day: ["dag", "dagen"], and: " en ",
    units: [["dag", "dagen"], ["uur", "uur"], ["minuut", "minuten"], ["seconde", "seconden"]],
    christmas: "Het is zover. Fijne feestdagen!",
    footer: "Maar sommige mensen kunnen niet wachten! Totdat het weer kerstmis is!"
  },
  en: {
    locale: "en-GB", langLabel: "Language",
    today: "Today is ", headline: "Almost Christmas", xmasHeadline: "Merry Christmas",
    before: "Just ", after: " to go, or exactly:",
    week: ["week", "weeks"], day: ["day", "days"], and: " and ",
    units: [["day", "days"], ["hour", "hours"], ["minute", "minutes"], ["second", "seconds"]],
    christmas: "It’s here. Happy holidays!",
    footer: "But some people just can’t wait! Until it’s Christmas again!"
  },
  es: {
    locale: "es-ES", langLabel: "Idioma",
    today: "Hoy es ", headline: "Casi Navidad", xmasHeadline: "Feliz Navidad",
    before: "Faltan ", after: ", o exactamente:",
    week: ["semana", "semanas"], day: ["día", "días"], and: " y ",
    units: [["día", "días"], ["hora", "horas"], ["minuto", "minutos"], ["segundo", "segundos"]],
    christmas: "¡Ya está aquí! ¡Felices fiestas!",
    footer: "¡Pero hay gente que no puede esperar! ¡Hasta que vuelva la Navidad!"
  }
};

// Saved choice first, then the first browser language that is nl, en or es; otherwise English
function detectLanguage() {
  try {
    var saved = localStorage.getItem("lang");
    if (TEXT[saved]) return saved;
  } catch (e) {}
  var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  for (var i = 0; i < list.length; i++) {
    var code = String(list[i]).slice(0, 2).toLowerCase();
    if (TEXT[code]) return code;
  }
  return "en";
}

var lang = detectLanguage();

function plural(pair, n) {
  return pair[n == 1 ? 0 : 1];
}

function two(n) {
  return n < 10 ? "0" + n : "" + n;
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

// Christmas we're counting down to: 25 December, local time of this computer.
// After Christmas Day, count down to next year's Christmas.
function getChristmasYear(today) {
  var year = today.getFullYear();
  if (today > new Date(year, 11, 26)) {
    year++;
  }
  return year;
}

function update() {
  var t = TEXT[lang];
  var today = new Date();
  var christmas = today.getMonth() == 11 && today.getDate() == 25;

  document.documentElement.lang = lang;
  setText("current_date", t.today + today.toLocaleDateString(t.locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
  setText("headline", christmas ? t.xmasHeadline : t.headline);
  setText("christmas", t.christmas);
  setText("footer", t.footer);
  document.getElementById("countdown").hidden = christmas;
  document.getElementById("christmas").hidden = !christmas;
  if (christmas) return;

  // Wall-clock difference: both sides as if they were UTC, so a DST change doesn't add or remove an hour
  var distance =
    Date.UTC(getChristmasYear(today), 11, 25) -
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(),
      today.getHours(), today.getMinutes(), today.getSeconds());

  var day = 1000 * 60 * 60 * 24;
  var days = Math.floor(distance / day);
  var hours = Math.floor((distance % day) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  var weeks = Math.floor(days / 7);
  var rest = days % 7;

  setText("before", t.before);
  setText("weeks", weeks + " " + plural(t.week, weeks) + (rest ? t.and + rest + " " + plural(t.day, rest) : ""));
  setText("after", t.after);
  setText("days", "" + days);
  setText("hours", two(hours));
  setText("minutes", two(minutes));
  setText("seconds", two(seconds));
  setText("days_label", plural(t.units[0], days));
  setText("hours_label", plural(t.units[1], hours));
  setText("minutes_label", plural(t.units[2], minutes));
  setText("seconds_label", plural(t.units[3], seconds));
}

function markLanguage() {
  var buttons = document.querySelectorAll(".lang-switch button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute("aria-pressed", buttons[i].dataset.lang == lang ? "true" : "false");
  }
  document.querySelector(".lang-switch").setAttribute("aria-label", TEXT[lang].langLabel);
}

function setLanguage(code) {
  lang = code;
  try {
    localStorage.setItem("lang", code);
  } catch (e) {}
  markLanguage();
  update();
}

document.querySelector(".lang-switch").addEventListener("click", function (e) {
  var button = e.target.closest("button[data-lang]");
  if (button) setLanguage(button.dataset.lang);
});

// Show the page in the detected language without saving it as a choice
markLanguage();
update();

// Update the count down every 1 second
setInterval(update, 1000);
