import { timezonesObj } from "./timezones.js";
import React from "react"
import ReactDOM from "react-dom"
console.log(timezonesObj);

const timezonesArr = Object.values(timezonesObj);

console.log(timezonesArr);

console.log("connected to react-test");

// A variable is created for body so that each following element can be appended to it
const BODY = document.querySelector("body");

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
            this.digitalFormat = `${this.hours}:${this.minutes}:${this.seconds} AM`;
        } else {
            this.digitalFormat = `${this.hours}:${this.minutes}:${this.seconds} PM`;
        }

        if (this.hours >= 12) {
            this.hours -= 12;
            this.digitalFormat = `${Math.abs(this.hours)} ${this.minutes} ${this.seconds
                } PM`;
        }

        this.body = BODY;
    }

    // these methods determine the rate each hand should spin
    getSecondsDegrees() {
        return (this.seconds / 60) * 360 + 90;
    }

    getMinutesDegrees() {
        return (this.minutes / 60) * 360 + 90;
    }

    getHoursDegrees() {
        return (this.hours / 24) * 360 + 90;
    }

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
    }

}

const clockStyle = (
        <div className="clockSpace">
            <h2 className="timeTitle">Japan Daylight Time</h2>
            <div className="clock" id="JSTTime" data-timezone="JST">
                <div className="clock-face">
                    <div className="hand hour-hand" data-timezone="JST"></div>
                    <div className="hand min-hand" data-timezone="JST"></div>
                    <div className="hand second-hand" data-timezone="JST"></div>
                </div>
            </div>
            <div className="digitalFormat" data-JST><span className="digitalHours">Hours</span>:<span
                className="digitalMinutes">Minutes</span>:<span className="digitalSeconds">Seconds</span>
            </div>
        </div>
    )


function setDate() {
    // We store our timezoneObj's keys to an array so that we can determine the length of the object
    // let timeZoneArr = Object.keys(timezonesObj);
    // console.log(`timeZoneArr`, timeZoneArr);

    // Here, we use that length to reset the HTML in the body
    for (let i = 0; i < timezonesArr.length; i++) {
        if (i === timezonesArr.length - 1) {
            BODY.innerHTML = " ";
        }
    }
    // if not the code below will continuously add new elements to the DOM each time we loop through the timezoneObj

    // Here, we create each clock by looping through the keys in timezoneObj
    timezonesArr.forEach((timezone) => {
        const TIMEZONE_REGION_NAME = timezone.regionName;
        const TIMEZONE_ABBR = timezone.abbr;
        // creates and styles each new clock
        const TIMEZONE_OFFSET = timezone.offset;

        const NEW_CLOCK = new Clock(TIMEZONE_ABBR, TIMEZONE_OFFSET);
        // Depending on the timezone the title changes
        NEW_CLOCK.title.innerText = `${TIMEZONE_REGION_NAME} Daylight Time`;
    });
}

const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(clockStyle));
setInterval(setDate, 1000);
