console.log("connected to javascript");

// A variable is created for body so that each following element can be appended to it
const BODY = document.querySelector('body');

// This timezone object will allow for adding additional clocks with just a few pieces of information
// these pieces are fed to the Clock class and they procedurally generate each clock's stylng and the appropriate time
let timezonesObj = [
  JST = {
    regionName: "Japan",
    abbr: "JST",
    offset: 9
  },
  HST = {
    regionName: "Hawaiian-Aleutian",
    abbr: "HST",
    offset: -10
  },
  AKDT = {
    regionName: "Alaska",
    abbr: "AKDT",
    offset: -8
  },
  PST = {
    regionName: "Pacific",
    abbr: "PST",
    offset: -7
  },
  MDT = {
    regionName: "Mountain",
    abbr: "MDT",
    offset: -6
  },
  EST = {
    regionName: "Eastern",
    abbr: "EST",
    offset: -5
  },
  UTC = {
    regionName: "Universal",
    abbr: "UTC",
    offset: 0
  }
]

class Clock {
  constructor(timezoneAbbrv, UTCOffset) {
    this.timezoneAbbrv = timezoneAbbrv;
    this.UTCOffset = UTCOffset;

    // TIME VALUES
    this.date = new Date();
    // converts the local date's seconds to Universal Time
    this.seconds = this.date.getUTCSeconds();
    // converts the local date's minutes to Universal Time
    this.minutes = this.date.getUTCMinutes();
    // converts the local date's seconds to Universal Time
    // since major time differences are usually based on the hour
    // we use each timezone's offset from Universal time to set each clock
    // Math.abs ensures no number is returned negative
    this.hours = Math.abs(this.date.getUTCHours() + this.UTCOffset);
    // console.log(`timezone hours`, this.hours);
    
    // // DIGITAL FORMAT
    if (this.hours > 24) {
      this.hours -= 24;
      this.digitalFormat = `${this.hours} ${this.minutes} ${this.seconds} AM`;
    }
    else {
      this.digitalFormat = `${this.hours} ${this.minutes} ${this.seconds} PM`;
    }
    
    if (this.hours >= 12) {
      this.hours -= 12;
      this.digitalFormat = `${Math.abs(this.hours)} ${this.minutes} ${this.seconds} PM`;
    }

    this.body = BODY;

    // Adds an div element to our DOM
    this.CLOCK_SPACE = document.createElement("div");

    // Adds an h1 element to our DOM
    this.title = document.createElement("h1");

    // Adds an div element to our DOM
    this.CLOCK_CLASS = document.createElement("div");

    // Adds an div element to our DOM
    this.CLOCK_FACE = document.createElement("div");

    // The following adds a new div per clock hand, then appends each to the clock face
    // Adds an div element to our DOM
    this.secondsElement = document.createElement("div");

    // Adds an div element to our DOM
    this.minutesElement = document.createElement("div");

    // Adds an div element to our DOM
    this.hoursElement = document.createElement("div");

    // Appaends a div to the clock space to display thi digital format of the clock's time
    // Adds an div element to our DOM
    this.DIGITAL_CLASS = document.createElement("div");
  }

  addClasses() {
    // adds a class to be styled in our CSS
    this.CLOCK_SPACE.classList.add("clockSpace");
    this.CLOCK_CLASS.classList.add("clock");
    this.CLOCK_FACE.classList.add("clock-face");

    this.secondsElement.classList.add("hand");
    this.secondsElement.classList.add("second-hand");
    this.secondsElement.setAttribute('data-timezone', `${this.timezoneAbbrv}`);

    this.minutesElement.classList.add("hand");
    this.minutesElement.classList.add("min-hand");
    this.minutesElement.setAttribute('data-timezone', `${this.timezoneAbbrv}`);

    this.hoursElement.classList.add("hand");
    this.hoursElement.classList.add("hour-hand");
    this.hoursElement.setAttribute('data-timezone', `${this.timezoneAbbrv}`);

    this.DIGITAL_CLASS.classList.add("digitalFormat");
  }

  appendElements() {
    // appaends the clockSpace element to the body
    this.body.appendChild(this.CLOCK_SPACE);

    // Title is appended to the clock space
    this.CLOCK_SPACE.appendChild(this.title);
    this.CLOCK_SPACE.appendChild(this.CLOCK_CLASS);
    this.CLOCK_SPACE.appendChild(this.DIGITAL_CLASS);

    this.CLOCK_CLASS.appendChild(this.CLOCK_FACE);

    this.CLOCK_FACE.appendChild(this.secondsElement);
    this.CLOCK_FACE.appendChild(this.minutesElement);
    this.CLOCK_FACE.appendChild(this.hoursElement);
  }

  // these methods determine the rate each hand should spin
  getSecondsDegrees() {
    return (this.seconds / 60) * 360 + 90;
  };

  getMinutesDegrees() {
    return (this.minutes / 60) * 360 + 90;
  };

  getHoursDegrees() {
    return (this.hours / 24) * 360 + 90;
  };

    // this method was created to allow for conditions
  setStyle() {
      // if the seconds exceed their limit, this ensures the animation does not loop back to the beginning
      // simply smoothens the animation
      if (this.getSecondsDegrees() > 60) {
        this.secondsElement.style.transition = "none";
      }
      this.secondsElement.style.transform = `rotate(${this.getSecondsDegrees()}deg)`;

      if (this.getMinutesDegrees() > 60) {
        this.minutesElement.style.transition = "none";
      }
      this.minutesElement.style.transform = `rotate(${this.getMinutesDegrees()}deg)`;

      if (this.getHoursDegrees() > 12) {
        this.hoursElement.style.transition = "none";
      }
      this.hoursElement.style.transform = `rotate(${this.getHoursDegrees()}deg)`;
    
      this.DIGITAL_CLASS.innerText = this.digitalFormat;

    };
}

function setDate() {
  // We store our timezoneObj's keys to an array so that we can determine the length of the object
  // let timeZoneArr = Object.keys(timezonesObj);
  // console.log(`timeZoneArr`, timeZoneArr);

  // Here, we use that length to reset the HTML in the body
  for (let i = 0; i < timezonesObj.length; i++){
    if (i === timezonesObj.length - 1) {
      BODY.innerHTML = " ";
    }
  }
  // if not the code below will continuously add new elements to the DOM each time we loop through the timezoneObj

  // Here, we create each clock by looping through the keys in timezoneObj
  timezonesObj.forEach(timezone => {
    const TIMEZONE_REGION_NAME = timezone.regionName;
    const TIMEZONE_ABBR = timezone.abbr;
    // creates and styles each new clock
    const TIMEZONE_OFFSET = timezone.offset;

    const NEW_CLOCK = new Clock(TIMEZONE_ABBR, TIMEZONE_OFFSET);
    // Depending on the timezone the title changes
    NEW_CLOCK.title.innerText = `${TIMEZONE_REGION_NAME} Daylight Time`;

    NEW_CLOCK.addClasses();
    NEW_CLOCK.appendElements();
    NEW_CLOCK.setStyle();
  })
}

// setDate();
setInterval(setDate, 1000);

