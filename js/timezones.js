// This timezone object will allow for adding additional clocks with just a few pieces of information
// these pieces are fed to the Clock class and they procedurally generate each clock's stylng and the appropriate time
export const timezonesObj = {
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
    EST : {
        regionName: "Eastern",
        abbr: "EST",
        offset: -5
    },
    UTC : {
        regionName: "Universal",
        abbr: "UTC",
        offset: 0
    }
}
