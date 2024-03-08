export const generalConfig = {
pattern: {
    'ALPHANUMERICANDSPECIALCHAR':/^[a-zA-Z]+([',.-][a-zA-Z]+)*$/,
    'NUMERIC': /^[0-9]*$/,
    "EMAIL": /^(([^<>()\[\]\\.,,:\s@"]+(\.[^<>()\[\]\\.,,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "MOB_NO": /^(?!(\d)\1+$)\d{3}[-\s]?\d{3}[-\s]?\d{4}\s?$/,
    "NAMEMAXLENGTH": 20,
    "EMAILMAXLENGTH": 90,
    "NAMEMINLENGTH": 3,
    "MOBILEMAX": 10,
    "MOBILEMIN": 10,
},

patternMessages: {
    minLength: "Minimum required length is ",
    maxLength: "Maximum required length is ",
    numeric: "Please enter numeric values only.",
    validEmail: "Please enter valid email address.",
},
}