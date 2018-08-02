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
var pathMarkerBrown = "#f4a460";
var startGateOrange = "#ff6614";
var channelBlk = "#0a0807";
var d1 = "#d1f442";
var d2 = "#ad42f4";
var d5 = "#4e42f4";
var d6 = "#f4ce42";
var dX = "#7f65f2";
var claw = "#e2dfd3";
var rWheel = "#a59045";
var redSide = "#870a1f";
var blackSide = "#111166";
var slotMachine = "#51dbc6";
var handle = "#ff00ff";
var rTarget = "#ce2b2b";
var yTarget = "#c1bc1d";
var rBallTray = "#c11d59";
var gBallTray = "#2aff0a";
var floatArea = "#3f3d29";
var rFunnel = "#a51021";
var gFunnel = "#254727";
var yFunnel = "#c2c902";
var gcDis = "#c6a22b";
var gcPlate = "#565656";

var curColor = startGateOrange;
var image;
var curImgURL = "";
var imageURLFile = "https://ksu-auv-team.github.io/url.txt";
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


$("#PMBtn").click(function(){curColor = pathMarkerBrown});
$("#SGBtn").click(function(){curColor = startGateOrange});
$("#CHANbtn").click(function(){curColor = channelBlk});
$("#d1btn").click(function(){curColor = d1});
$("#d2btn").click(function(){curColor = d2});
$("#d5btn").click(function(){curColor = d5});
$("#d6btn").click(function(){curColor = d6});
$("#dXbtn").click(function(){curColor = dX});
$("#Clbtn").click(function(){curColor = claw});
$("#RWbtn").click(function(){curColor = rWheel});
$("#RSbtn").click(function(){curColor = redSide});
$("#BSbtn").click(function(){curColor = blackSide});
$("#SMbtn").click(function(){curColor = slotMachine});
$("#Hbtn").click(function(){curColor = handle});
$("#RTbtn").click(function(){curColor = rTarget});
$("#YTbtn").click(function(){curColor = yTarget});
$("#RBTbtn").click(function(){curColor = rBallTray});
$("#GBTbtn").click(function(){curColor = gBallTray});
$("#FAbtn").click(function(){curColor = floatArea});
$("#RFbtn").click(function(){curColor = rFunnel});
$("#GFbtn").click(function(){curColor = gFunnel});
$("#YFbtn").click(function(){curColor = yFunnel});
$("#GDbtn").click(function(){curColor = gcDis});
$("#GPbtn").click(function(){curColor = gcPlate});

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
    if (color === pathMarkerBrown) return "path_marker";
    else if (color === startGateOrange) return "start_gate";
    else if (color === channelBlk) return "channel";
    else if (color === claw) return "claw";
    else if (color === d1) return "die1";
    else if (color === d2) return "die2";
    else if (color === d5) return "die5";
    else if (color === d6) return "die6";
    else if (color === dX) return "dieX";
    else if (color === rWheel) return "roulette_wheel";
    else if (color === redSide) return "red_wheel_side";
    else if (color === blackSide) return "black_wheel_side";
    else if (color === slotMachine) return "slot_machine";
    else if (color === handle) return "slot_handle";
    else if (color === rTarget) return "r_slot_target";
    else if (color === yTarget) return "y_slot_target";
    else if (color === rBallTray) return "r_ball_tray";
    else if (color === gBallTray) return "g_ball_tray";
    else if (color === floatArea) return "floating_area";
    else if (color === rFunnel) return "r_funnel";
    else if (color === gFunnel) return "g_funnel";
    else if (color === yFunnel) return "y_funnel";
    else if (color === gcDis) return "g_chip_dispenser";
    else if (color === gcPlate) return "g_chip_plate";
}

});

});
