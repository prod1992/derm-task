import * as d3 from "d3";

////////////////////////////////////////////////////////////
//////////////////////// Set-up ////////////////////////////
////////////////////////////////////////////////////////////

var screenWidth = window.innerWidth;

var margin = { left: 0, top: 0, right: 0, bottom: 0 },
    width = Math.min(screenWidth, 320) - margin.left - margin.right,
    height = Math.min(screenWidth, 320) - margin.top - margin.bottom;

var svg = d3.select("#donut").append("svg")
    .attr("width", (width + margin.left + margin.right))
    .attr("height", (height + margin.top + margin.bottom))
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("style", "width: 100%;max-width: 320px")
    .append("g").attr("class", "wrapper")
    
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

////////////////////////////////////////////////////////////// 
///////////////////// Data &  Scales ///////////////////////// 
////////////////////////////////////////////////////////////// 

// Some random data
var donutData = [
    { name: "Consultation", value: 20 },
    { name: "In Review", value: 20 },
    { name: "Compounding", value: 20 },
    { name: "Dispensing", value: 20 },
    { name: "Dispatched", value: 20 }
];

//Create an arc function   
var arc = d3.arc()
    .innerRadius(width * 0.75 / 2)
    .outerRadius(width * 0.75 / 2 + 40);

//Turn the pie chart 90 degrees counter clockwise, so it starts at the left	
var pie = d3.pie()
    .startAngle(-90 * Math.PI / 180)
    .endAngle(-90 * Math.PI / 180 + 2 * Math.PI)
    .value(function (d) { return d.value; })
    .padAngle(.03)
    .sort(null);

////////////////////////////////////////////////////////////// 
//////////////////// Create Donut Chart ////////////////////// 
////////////////////////////////////////////////////////////// 

//Create the donut slices and also the invisible arcs for the text 
svg.selectAll(".donutArcs")
    .data(pie(donutData))
    .enter().append("path")
    .attr("class", "donut__arcs")
    .attr("d", arc)
    .style("fill", function (d, i) {
        if (i >= 3 ) return "#e7eef1"; //Other
        else return "#ff9a80";
    })
    .each(function (d, i) {
        //Search pattern for everything between the start and the first capital L
        var firstArcSection = /(^.+?)L/;

        //Grab everything up to the first Line statement
        var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
        //Replace all the comma's so that IE can handle it
        newArc = newArc.replace(/,/g, " ");

        //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2) 
        //flip the end and start position
        if (d.endAngle > 90 * Math.PI / 180) {
            var startLoc = /M(.*?)A/,		//Everything between the first capital M and first capital A
                middleLoc = /A(.*?)0 0 1/,	//Everything between the first capital A and 0 0 1
                endLoc = /0 0 1 (.*?)$/;	//Everything between the first 0 0 1 and the end of the string (denoted by $)
            //Flip the direction of the arc by switching the start en end point (and sweep flag)
            //of those elements that are below the horizontal line
            var newStart = endLoc.exec(newArc)[1];
            var newEnd = startLoc.exec(newArc)[1];
            var middleSec = middleLoc.exec(newArc)[1];

            //Build up the new arc notation, set the sweep-flag to 0
            newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
        }//if

        //Create a new invisible arc that the text can flow along
        svg.append("path")
            .attr("class", "hiddenDonutArcs")
            .attr("id", "donutArc" + i)
            .attr("d", newArc)
            .style("fill", "none");
    });

//Append the label names on the outside
svg.selectAll(".donutText")
    .data(pie(donutData))
    .enter().append("text")
    .attr("class", "donut__text")
    //Move the labels below the arcs for those slices with an end angle greater than 90 degrees
    .attr("dy", function (d, i) { return (d.endAngle > 90 * Math.PI / 180 ? -18 : 26); })
    .append("textPath")
    .attr("startOffset", "50%")
    .style("text-anchor", "middle")
    .style("fill", function (d, i) {
        if (i >= 3 ) return "#abacad"; //Other
        else return "#ffffff";
    })
    .attr("xlink:href", function (d, i) { return "#donutArc" + i; })
    .text(function (d) { return String(d.data.name).toUpperCase(); });