console.log("connected to javascript");

const clocks = document.querySelectorAll(".clock");
console.log(clocks)


let timezonesObj = {
  JST: {
    abbr: "JST",
    offset: 9
  },
  HST: {
    abbr: "HST",
    offset: -10
  },
  // AKDT: {
  //   abbr: "AKDT",
  //   offset: -8
  // },
  // PST: {
  //   abbr: "PST",
  //   offset: -7
  // },
  // MDT: {
  //   abbr: "MDT",
  //   offset: -6
  // },
  // EST: {
  //   abbr: "EST",
  //   offset: -5
  // },
  // UTC: {
  //   abbr: "UTC",
  //   offset: 0
  // }
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
    this._timezoneAbbrv = timezoneAbbrv;
    this._UTCOffset = UTCOffset;

    console.log(`UTCOffset`, UTCOffset);

    // TIME VALUES
    this.date = new Date();
    // console.log(`date`, this.date);
    this.seconds = this.date.getUTCSeconds();
    // console.log(`timezone seconds`, this.seconds);
    this.minutes = this.date.getUTCMinutes();
    // console.log(`timezone minutes`, this.minutes);
    this.hours = Math.abs(this.date.getUTCHours() + this._UTCOffset);
    // console.log(`timezone hours`, this.hours);

    if (this.hours > 23) {
      this.hours = 0;
    }

    // DIGITAL FORMAT
    this.digitalFormat = `${this.hours}:${this.minutes}:${this.seconds}`;

    // STYLING HANDS
    this.secondHand = document.querySelector(`.second-hand[data-timezone="${this._timezoneAbbrv}"]`);
    this.minuteHand = document.querySelector(`.min-hand[data-timezone="${this._timezoneAbbrv}"]`);
    this.hourHand = document.querySelector(`.hour-hand[data-timezone="${this._timezoneAbbrv}"]`);
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
  clocks.forEach((clock) => {
    Object.keys(timezonesObj).forEach(timezone => {
      const TIMEZONE_ABBR = timezonesObj[timezone].abbr;
      const TIMEZONE_OFFSET = timezonesObj[timezone].offset;

      // console.log(`obj`, timezone);
      const NEW_CLOCK = new Clock(TIMEZONE_ABBR, TIMEZONE_OFFSET);
      console.log(NEW_CLOCK);
      NEW_CLOCK.setStyle();
      const DIGITAL_FORMAT = NEW_CLOCK.digitalFormat;

      // console.log(`newClock.digitalFormat`, DIGITAL_FORMAT);
      // console.log(`newClock`, NEW_CLOCK);

      document.querySelector(`.digitalFormat[data-${TIMEZONE_ABBR}]`).innerText = DIGITAL_FORMAT;
    })
  })
}


// setDate();
setInterval(setDate, 1000);
