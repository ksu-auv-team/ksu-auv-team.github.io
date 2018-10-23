/**************************************************************
 * This code was adapted from a tutorial by William Malone
 *  explaining how to make a javascript drawing app.
 * I would like to thank the many people of the internet 
 *  for helping me on this journey.
 * The purpose of this project is to create a javascript app
 *  to speed up the labeling of picture data.
 * 
 * required document at "https://raw.githubusercontent.com/shadySource/DATA/master/url.txt"
 *     needs format of: 
 *     dataset1 dataset2 ... datasetN
 *     <dataset1 URLs seperated by ' '>
 *     <dataset2 URLs seperated by ' '>
 *     ...
 *     <datasetN URLs seperated by ' '>
 **************************************************************/
var context;

var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();

var paint;

//colors
var pink = "#ff00ff";
var red = "#ff0000";
var orange = "#ffa500";
var yellow = "#ffff00";
var green = "#0000ff";


var curColor = pink;
var image;
var curImgURL = "";
var imageURLFile = "https://ksu-auv-team.github.io/labeling-tool/url.txt";
var imageURLs = new Array();
var dataset = 0;
var imageIdx = 0;
var imageSet = false;

var tmpLabel;
var labels = new Array();


function updateDescription(){
    document.getElementById("canvasDescription").innerHTML = "Number of labels: "+labels.length.toString()+"\t\tCurrent Dataset: "+dataset.toString()+"\tImage: "+imageIdx.toString();
}

$(window).on("load",function() {

updateDescription();

context = document.getElementById('pictureCanvas').getContext("2d");

$.get(imageURLFile,function(data){
    imageURLs = data.split("\n");
    newImage(false);


// Get datasets and add them to the dropdown menu
dropdown = document.getElementById("dataList");
datasets = imageURLs[0].split(' ');
for(var i = 0; i < datasets.length; i++){
    var lin = document.createElement("a");
    lin.setAttribute("href","#data-labeling");
    lin.setAttribute("id","dataset" + i.toString());
    var node = document.createTextNode(datasets[i]);
    lin.appendChild(node);
    dropdown.appendChild(lin);
    dropdownCB(i);
}

function dropdownCB(i){
    $("#dataset" + i.toString()).click(function(){
        document.getElementById("dataBtn").click()
        dataset = i;
        imageIdx = 0;
        newImage(false);
        resetVars();
        updateDescription();
    });
}

$("#dataBtn").click(function(){document.getElementById("dataList").classList.toggle("show");});


function enableDrawing(){
    //on mouse click in canvas
    $("#pictureCanvas").mousedown(function(e){
        paint = true;
        clickY.push(e.pageY - this.offsetTop);
        clickX.push(e.pageX - this.offsetLeft);
        clickColor.push(curColor);
        return false;
    });

    //on mouse movement in canvas
    $("#pictureCanvas").mousemove(function(e){
        if(paint){
            clickX.push(e.pageX - this.offsetLeft);
            clickY.push(e.pageY - this.offsetTop);
            redraw(context);
            clickX.pop();
            clickY.pop();
            return false;
        }
    });

    //mouse unclick action
    $("#pictureCanvas").mouseup(function(e){
        if(paint){
            clickY.push(e.pageY - this.offsetTop);
            clickX.push(e.pageX - this.offsetLeft);
            redraw(context);
            paint = false;
            return false;
        }
    });

    //mouse leaves the canvas
    $("#pictureCanvas").mouseleave(function(e){
        if(paint){
            clickX.pop();
            clickY.pop();
            clickColor.pop();
            paint = false;
            redraw(context);
            return false;
        }
    });

    $("#undoButton").click(function(){
        clickX.pop();
        clickY.pop();
        clickX.pop();
        clickY.pop();
        clickColor.pop();
        redraw(context);
    });

    $("#clearButton").click(function(){
        context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
        resetVars();
    });

    $("#submitButton").click(function(){
        tmpLabel = getLabel();
        if(tmpLabel != "EMPTY"){
            labels.push(tmpLabel)
        }
        newImage();
        resetVars();
        updateDescription();
    });

    $(document).keydown(function(e){
        if(e.which == 13 || e.which == 32) {// enter or space keys
            document.getElementById("submitButton").click();
            return false;
        } if (e.which == 39){ // right arrow
            //next image
            newImage(1);
            resetVars();
            updateDescription();
            return false;
        } if (e.which == 37){ // left arrow
            // previous image
            newImage(-1);
            resetVars();
            updateDescription();1
            return false;
        } if (e.which == 52){ // 4
            curColor = pathMarkerBrown;
            return false;
        } if (e.which == 53){ // 5
            curColor = startGateOrange;
            return false;
        } if (e.which == 90){ // z
            document.getElementById("undoButton").click();
            return false;
        }

    });
}


$("#pbtn").click(function(){curColor = pink});
$("#rbtn").click(function(){curColor = red});
$("#obtn").click(function(){curColor = orange});
$("#ybtn").click(function(){curColor = yellow});
$("#gbtn").click(function(){curColor = green});

$("#unSubmitButton").click(function(){
    resetVars();
    var exists = labels.pop();
    if (exists){
        newImage(-1);
    }
    updateDescription();
});

$("#newImageButton").click(function(){
    newImage();
    resetVars();
    updateDescription();
});

$("#prevImageButton").click(function(){
    newImage(-1);
    resetVars();
    updateDescription();
});

$("#downloadButton").click(function(){
    if (labels.length > 0){
        var d = new Date();
        var filename = "DATA" + d.getFullYear().toString() + "y" + d.getMonth().toString() + "m" + d.getDate().toString() 
                    + "d" + d.getHours().toString() + "h" + d.getMinutes().toString() + "m" + d.getSeconds().toString()
                    + "s" + d.getMilliseconds().toString();
        var labelsString = labels[0];
        for (i = 1; i < labels.length; i++)
            labelsString += "\n\n" + labels[i];
        var blob =  new Blob([labelsString],{type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
        //cool, but not necesary
        //$("#abortButton").click(function(){filesaver.abort();});
        tmpLabels = new Array();
        labels = new Array();
        updateDescription();
}});

function redraw(ctx){
    context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
    ctx.lineJoin = "round";
    ctx.lineWidth = 1;
    for(var i=0; i < clickX.length; i+=2){
        ctx.beginPath()
        // console.log(clickX[i], clickY[i], clickX[i+1]-clickX[i], clickY[i+1]-clickY[i]);
        ctx.rect(clickX[i], clickY[i], clickX[i+1]-clickX[i], clickY[i+1]-clickY[i]);
        ctx.strokeStyle = clickColor[i/2];
        ctx.stroke();
    }

}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function newImage(incriment=1){
    urls = imageURLs[dataset + 1].split(' ');
    imageIdx = mod(imageIdx + incriment, urls.length)
    var newImg = new Image();
    newImg.onload = function(){
        image = newImg;
        curImgURL = urls[imageIdx];
        context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
        if (imageSet === false){
            enableDrawing();
            imageSet = true;
        }
    }
    newImg.src = urls[imageIdx];
}

function resetVars(){
    clickX = new Array();
    clickY = new Array();
    clickColor = new Array();
    paint = false;
}

function getLabel(){
    //create label:
    len = clickX.length
    if(len<2)
        return "EMPTY";
    var label = curImgURL;
    for(var i = 0; i < len; i+=2){
        label += '\n' + nameColor(clickColor[i/2]) + ' ';
        label += clickX[i].toString() + ' ';
        label += clickY[i].toString() + ' ';
        label += clickX[i+1].toString() + ' ';
        label += clickY[i+1].toString();
    }
    return label;
}

function nameColor(color){
    if (color === pink) return "pink-balloon";
    else if (color === red) return "red-balloon";
    else if (color === orange) return "orange-balloon";
    else if (color === yellow) return "yellow-balloon";
    else if (color === green) return "green-balloon";
}

});

});
