console.log("connected to javascript");

// 
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

// // function constructor
// function TimeZone(timezoneAbbrv, UTCoffset) {
//   this.UTCoffset = UTCoffset;
//   this.timezoneAbbrv = timezoneAbbrv;

//   // TIME VALUES
//   this.date = new Date();
//   // console.log(`date`, this.date);
//   this.seconds = this.date.getUTCSeconds();
//   // console.log(`timezone seconds`, this.seconds);
//   this.minutes = this.date.getUTCMinutes();
//   // console.log(`timezone minutes`, this.minutes);
//   this.hours = Math.abs(this.date.getUTCHours() + this.UTCoffset);
//   // console.log(`timezone hours`, this.hours);

//   if (this.hours > 23) {
//     this.hours = 0;
//   }

//   // DIGITAL FORMAT
//   this.digitalFormat = `${this.hours}:${this.minutes}:${this.seconds}`;

//   // STYLING HANDS
//   this.secondHand = document.querySelector(`.second-hand[data-timezone="${timezoneAbbrv}"]`);
//   this.minuteHand = document.querySelector(`.min-hand[data-timezone="${timezoneAbbrv}"]`);
//   this.hourHand = document.querySelector(`.hour-hand[data-timezone="${timezoneAbbrv}"]`);

//   this.getSecondsDegrees = function () {
//     return (this.seconds / 60) * 360 + 90;
//   };

//   this.getMinutesDegrees = function () {
//     return (this.minutes / 60) * 360 + 90;
//   };

//   this.getHoursDegrees = function () {
//     return (this.hours / 12) * 360 + 90;
//   };

//   this.setStyle = function () {
//     if (this.getSecondsDegrees() > 60) {
//       this.secondHand.style.transition = "none";
//     }
//     this.secondHand.style.transform = `rotate(${this.getSecondsDegrees()}deg)`;

//     if (this.getMinutesDegrees() > 60) {
//       this.minuteHand.style.transition = "none";
//     }
//     this.minuteHand.style.transform = `rotate(${this.getMinutesDegrees()}deg)`;

//     if (this.getHoursDegrees() > 60) {
//       this.hourHand.style.transition = "none";
//     }
//     this.hourHand.style.transform = `rotate(${this.getHoursDegrees()}deg)`;
//   };

//   this.setStyle();
// }

class Clock {
  constructor(timezoneAbbrv, UTCOffset) {
    this.timezoneAbbrv = timezoneAbbrv;
    console.log(`timezoneAbbrv`, this.timezoneAbbrv);
    this.UTCOffset = UTCOffset;

    console.log(`UTCOffset`, UTCOffset);

    // TIME VALUES
    this.date = new Date();
    // console.log(`date`, this.date);
    this.seconds = this.date.getUTCSeconds();
    // console.log(`timezone seconds`, this.seconds);
    this.minutes = this.date.getUTCMinutes();
    // console.log(`timezone minutes`, this.minutes);
    this.hours = Math.abs(this.date.getUTCHours() + this.UTCOffset);
    // console.log(`timezone hours`, this.hours);

    if (this.hours > 23) {
      this.hours = 0;
    }

    console.log(this.hours)

    // DIGITAL FORMAT
    this.digitalFormat = `${this.hours}:${this.minutes}:${this.seconds}`;

    // STYLING HANDS
    this.secondHand = document.querySelector(`.second-hand[data-timezone="${this.timezoneAbbrv}"]`);
    this.minuteHand = document.querySelector(`.min-hand[data-timezone="${this.timezoneAbbrv}"]`);
    this.hourHand = document.querySelector(`.hour-hand[data-timezone="${this.timezoneAbbrv}"]`);
  }

    getSecondsDegrees() {
      return (this.seconds / 60) * 360 + 90;
    };

    getMinutesDegrees() {
      return (this.minutes / 60) * 360 + 90;
    };

    getHoursDegrees() {
      return (this.hours / 12) * 360 + 90;
    };

    setStyle() {
      if (this.getSecondsDegrees() > 60) {
        this.secondHand.style.transition = "none";
      }
      this.secondHand.style.transform = `rotate(${this.getSecondsDegrees()}deg)`;

      if (this.getMinutesDegrees() > 60) {
        this.minuteHand.style.transition = "none";
      }
      this.minuteHand.style.transform = `rotate(${this.getMinutesDegrees()}deg)`;

      if (this.getHoursDegrees() > 60) {
        this.hourHand.style.transition = "none";
      }
      this.hourHand.style.transform = `rotate(${this.getHoursDegrees()}deg)`;
    };

    // setStyle();
}

function setDate() {
  // CREATING THE CLOCK
  const BODY = document.querySelector('body');
  let timeZoneArr = Object.keys(timezonesObj);
  console.log(`timeZoneArr`, timeZoneArr);

  for (let i = 0; i < timeZoneArr.length; i++){
    if (i === timeZoneArr.length - 1) {
      BODY.innerHTML = " ";
    }
  }

  timeZoneArr.forEach(timezone => {
    const TIMEZONE_REGION_NAME = timezonesObj[timezone].regionName;
    const TIMEZONE_ABBR = timezonesObj[timezone].abbr;
  
    const CLOCK_SPACE = document.createElement("div");
    CLOCK_SPACE.classList.add("clockSpace");
    BODY.appendChild(CLOCK_SPACE);
  
    let title = document.createElement("h1");
    title.innerText = `${TIMEZONE_REGION_NAME} Daylight Time`;
    CLOCK_SPACE.appendChild(title);

    const CLOCK_CLASS = document.createElement("div");
    CLOCK_SPACE.appendChild(CLOCK_CLASS);
    CLOCK_CLASS.classList.add("clock");

    const CLOCK_FACE = document.createElement("div");
    CLOCK_FACE.classList.add("clock-face")
    CLOCK_CLASS.appendChild(CLOCK_FACE);

    const secondsHand = document.createElement("div");
    secondsHand.setAttribute('data-timezone', `${TIMEZONE_ABBR}`)
    secondsHand.classList.add("hand");
    secondsHand.classList.add("second-hand");
    CLOCK_FACE.appendChild(secondsHand);

    const minutesHand = document.createElement("div");
    minutesHand.setAttribute('data-timezone', `${TIMEZONE_ABBR}`)
    minutesHand.classList.add("hand");
    minutesHand.classList.add("min-hand");
    CLOCK_FACE.appendChild(minutesHand);

    const hoursHand = document.createElement("div");
    hoursHand.setAttribute('data-timezone', `${TIMEZONE_ABBR}`)
    CLOCK_FACE.appendChild(hoursHand);
    hoursHand.classList.add("hand");
    hoursHand.classList.add("hour-hand");

    const DIGITAL_CLASS = document.createElement("div");
    DIGITAL_CLASS.classList.add("digitalFormat");
    DIGITAL_CLASS.setAttribute('data-timezone', `${TIMEZONE_ABBR}`)
    CLOCK_SPACE.appendChild(DIGITAL_CLASS);

    const TIMEZONE_OFFSET = timezonesObj[timezone].offset;
    const NEW_CLOCK = new Clock(TIMEZONE_ABBR, TIMEZONE_OFFSET);
    NEW_CLOCK.setStyle();
    const DIGITAL_FORMAT = NEW_CLOCK.digitalFormat;

    // document.querySelector(`'.digitalFormat[${DIGITAL_CLASS.dataset}]'`).innerText = DIGITAL_FORMAT;
  })
  // })
}


// setDate();
setInterval(setDate, 1000);
