let URL = "https://www.donornepal.com/search?group=A+%2Bve&location=35&searchGroup=Search";
let URL1 = URL.split("group=");
let URL2 = URL1[1].split("&",1);
console.log(URL1);
console.log(URL2.toString());