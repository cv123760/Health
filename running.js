<script>
                
                

function main(){
// var distance = 1.5; //disntance in miles
// var time = 10.5; //time in minutes

var distance = document.getElementById("distance").value; //disntance in miles
var time = document.getElementById("time").value; //time in minutes

var pace = get_pace (time,distance);
var quarter_time = pace/4; // Howl long it would take to run 1/4 mile at the same pace

//fast interval
var fast_time = quarter_time-4/60; // time to beat is 4 seconds faster than queater time
var fast_pace = get_pace(fast_time,.25); // Fast interval pace

/* rest interval
calculates the upper and lower time a pace limits for the resting interval*/

var least_rest = fast_time * 2; 
var most_rest = fast_time * 2.5; 

var upper_pace = least_rest*4;
var lower_pace = most_rest*4;





//writes decimals as seconds. ex 1.5 retunrs 1:30 (min:sec)
function get_seconds (x){
    var min = x - x%1
    var sec = (x%1) * 60
    sec = Math.round (sec)

    var str = String(min) + ':' + String(sec) 
    return str
}


function get_pace(time, distance){
    var pace = time/distance
    return pace
}




upper_pace = get_seconds(upper_pace)
fast_time = get_seconds (fast_time)
fast_pace = get_seconds(fast_pace)
fast_pace = get_seconds(fast_pace)
least_rest = get_seconds(least_rest)
lower_pace = get_seconds(lower_pace)






document.getElementById("fast_interval").innerHTML = "Run 1/4 mile in under " + fast_time;
document.getElementById("fast_pace").innerHTML = "maintain a pace of " + fast_pace + " (min/mi) or faster";
document.getElementById("fast_title").innerHTML = "Fast Interval";


document.getElementById("Slow_title").innerHTML = "Slow Interval";
document.getElementById("slow").innerHTML = "run a quarter mile in less than " + least_rest + " but no more than " + most_rest;
document.getElementById("slow_pace").innerHTML = "your pace should be between " + upper_pace + " and " + lower_pace + " (min/mi)";










}
