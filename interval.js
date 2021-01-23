
function main(){
var distance = document.getElementById("distance").value;
var time = document.getElementById("time").value;
var sessionDuration = document.getElementById("sessionDuration").value;
var intervalLength = document.getElementById("intervalLength").value
 
if(distance <= 0){
    console.log("null ")
    document.getElementById("fastInterval").innerHTML = ("Please enter values greater than zero");
    document.getElementById("runFast").innerHTML = "";
    document.getElementById("slowInterval").innerHTML = "";
    document.getElementById("runSlow").innerHTML = "";
    document.getElementById("total").innerHTML = "";

    return

    
}

var pace = time/distance;   // determines comfortable pace
var fastTime = pace/4 - 4/60 //caculates fast interval Time
var fastPace = fastTime/.25 // calculate time it takes to run the desired interval length. 

// Calculates slow interaval pace and time range
var slowPace = fastPace*2 ;
var slowerPace = fastPace *2.5;
var slowTime = slowPace * intervalLength;
var slowerTime = slowerPace * intervalLength;


function getSeconds(t){
    if (t > 1){
        sec = Math.round((t%1)*60)
        min = t - (t%1)
        return String(min) + ":" + String(sec);
    }
    t= String(Math.round(t*60))

    return "0:" + t
}


function totalIntervals(sessionDuration, fastTime, slowTime){
    var x = fastTime + slowTime;
    var i = 0;
    while(x < sessionDuration){
        x = x + x;
        i = i + 2;
        console.log(i)
    }
    return String(i);
}


var ti = totalIntervals(sessionDuration, fastTime, slowTime)
fastPace = getSeconds(fastPace);
fastTime = getSeconds(fastTime);
slowPace =getSeconds(slowPace);
slowerPace =getSeconds(slowerPace);
slowTime =getSeconds(slowTime);
slowerTime =getSeconds(slowerTime);


console.log(fastTime, fastPace, ti)


document.getElementById("fastInterval").innerHTML = ("Fast Interval");
document.getElementById("runFast").innerHTML = "Run " + intervalLength + " miles in under " + fastTime + "(min:sec) at a pace of " + fastPace + " (min/mi)";
document.getElementById("slowInterval").innerHTML = "Slow Interval";
document.getElementById("runSlow").innerHTML = "Run " + intervalLength + " miles between " + slowTime + " and " + slowerTime + " (min:sec) at a pace between " + slowPace + " and " + slowerPace + " (min/mi).";
document.getElementById("total").innerHTML = "Run a total of " + ti + " intervals";

}
