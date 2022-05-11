console.log("connected to javascript");

// This timezone object will allow for adding additional clocks with just a few pieces of information
// these pieces are fed to the Clock class and they procedurally generate each clock's stylng and the appropriate time
let timezonesObj = {
  JST: {
    regionName: "Japan",
    abbr: "JST",
    offset: 9
  },
  HST: {
    regionName: "Hawaiian-Aleutian",
    abbr: "HST",
    offset: -10
  },
  AKDT: {
    regionName: "Alaska",
    abbr: "AKDT",
    offset: -8
  },
  PST: {
    regionName: "Pacific",
    abbr: "PST",
    offset: -7
  },
  MDT: {
    regionName: "Mountain",
    abbr: "MDT",
    offset: -6
  },
  EST: {
    regionName: "Eastern",
    abbr: "EST",
    offset: -5
  },
  UTC: {
    regionName: "Universal",
    abbr: "UTC",
    offset: 0
  }
}

class Clock {
  constructor(timezoneAbbrv, UTCOffset) {
    this.timezoneAbbrv = timezoneAbbrv;
    console.log(`timezoneAbbrv`, this.timezoneAbbrv);
    this.UTCOffset = UTCOffset;

    console.log(`UTCOffset`, UTCOffset);

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

    // Universal time does not use the 24th hour, it replaces it with 0
    if (this.hours > 23) {
      this.hours = 0;
    }

    // DIGITAL FORMAT
    this.digitalFormat = `${this.hours}:${this.minutes}:${this.seconds}`;


    // STYLING HANDS
    // each hand has a dedicated value per object so that the animations run according to each individual clock
    this.secondHand = document.querySelector(`.second-hand[data-timezone="${this.timezoneAbbrv}"]`);
    this.minuteHand = document.querySelector(`.min-hand[data-timezone="${this.timezoneAbbrv}"]`);
    this.hourHand = document.querySelector(`.hour-hand[data-timezone="${this.timezoneAbbrv}"]`);
  }

    // these methods determine the rate each hand should spin
    getSecondsDegrees() {
      return (this.seconds / 60) * 360 + 90;
    };

    getMinutesDegrees() {
      return (this.minutes / 60) * 360 + 90;
    };

    getHoursDegrees() {
      return (this.hours / 12) * 360 + 90;
    };

    // this method was created to allow for conditions
  setStyle() {
      // if the seconds exceed their limit, this ensures the animation does not loop back to the beginning
      // simply smoothens the animation
      if (this.getSecondsDegrees() > 60) {
        this.secondHand.style.transition = "none";
      }
      this.secondHand.style.transform = `rotate(${this.getSecondsDegrees()}deg)`;

      if (this.getMinutesDegrees() > 60) {
        this.minuteHand.style.transition = "none";
      }
      this.minuteHand.style.transform = `rotate(${this.getMinutesDegrees()}deg)`;

      if (this.getHoursDegrees() > 12) {
        this.hourHand.style.transition = "none";
      }
      this.hourHand.style.transform = `rotate(${this.getHoursDegrees()}deg)`;
    };
}

function setDate() {
  // A variable is created for body so that each following element can be appended to it
  const BODY = document.querySelector('body');
  // We store our timezoneObj's keys to an array so that we can determine the length of the object
  let timeZoneArr = Object.keys(timezonesObj);
  console.log(`timeZoneArr`, timeZoneArr);

  // Here, we use that length to reset the HTML in the body
  for (let i = 0; i < timeZoneArr.length; i++){
    if (i === timeZoneArr.length - 1) {
      BODY.innerHTML = " ";
    }
  }
  // if not the code below will continuously add new elements to the DOM each time we loop through the timezoneObj

  // Here, we create each clock by looping through the keys in timezoneObj
  timeZoneArr.forEach(timezone => {
    const TIMEZONE_REGION_NAME = timezonesObj[timezone].regionName;
    const TIMEZONE_ABBR = timezonesObj[timezone].abbr;
  
    // Adds an div element to our DOM
    const CLOCK_SPACE = document.createElement("div");
    // adds a class to be styled in our CSS
    CLOCK_SPACE.classList.add("clockSpace");
    // appaends the clockSpace element to the body
    BODY.appendChild(CLOCK_SPACE);
  
    // Adds an h1 element to our DOM
    let title = document.createElement("h1");
    // Depending on the timezone the title changes
    title.innerText = `${TIMEZONE_REGION_NAME} Daylight Time`;
    // Title is appended to the clock space
    CLOCK_SPACE.appendChild(title);

    // Adds an div element to our DOM
    const CLOCK_CLASS = document.createElement("div");

    CLOCK_SPACE.appendChild(CLOCK_CLASS);
    CLOCK_CLASS.classList.add("clock");

    // Adds an div element to our DOM
    const CLOCK_FACE = document.createElement("div");
    CLOCK_FACE.classList.add("clock-face")
    CLOCK_CLASS.appendChild(CLOCK_FACE);

    // The following adds a new div per clock hand, then appends each to the clock face
    // Adds an div element to our DOM
    const secondsHand = document.createElement("div");
    // adding a data attribute so that each hand's animations relies on the adata attribute
    // rather than the styling selectors
    secondsHand.setAttribute('data-timezone', `${TIMEZONE_ABBR}`)
    secondsHand.classList.add("hand");
    secondsHand.classList.add("second-hand");
    CLOCK_FACE.appendChild(secondsHand);

    // Adds an div element to our DOM
    const minutesHand = document.createElement("div");
    minutesHand.setAttribute('data-timezone', `${TIMEZONE_ABBR}`)
    minutesHand.classList.add("hand");
    minutesHand.classList.add("min-hand");
    CLOCK_FACE.appendChild(minutesHand);

    // Adds an div element to our DOM
    const hoursHand = document.createElement("div");
    hoursHand.setAttribute('data-timezone', `${TIMEZONE_ABBR}`)
    CLOCK_FACE.appendChild(hoursHand);
    hoursHand.classList.add("hand");
    hoursHand.classList.add("hour-hand");

    // Appaends a div to the clock space to display thi digital format of the clock's time
    // Adds an div element to our DOM
    const DIGITAL_CLASS = document.createElement("div");
    DIGITAL_CLASS.classList.add("digitalFormat");
    DIGITAL_CLASS.setAttribute('data-timezone', `${TIMEZONE_ABBR}`)
    CLOCK_SPACE.appendChild(DIGITAL_CLASS);

    // creates and styles each new clock
    const TIMEZONE_OFFSET = timezonesObj[timezone].offset;
    const NEW_CLOCK = new Clock(TIMEZONE_ABBR, TIMEZONE_OFFSET);
    NEW_CLOCK.setStyle();
    const DIGITAL_FORMAT = NEW_CLOCK.digitalFormat;

    // document.querySelector(`'.digitalFormat[${DIGITAL_CLASS.dataset}]'`).innerText = DIGITAL_FORMAT;
  })
}


// setDate();
setInterval(setDate, 1000);

