var numPlayers = 8;
var resultColors = ["#e6194b", "#f58231", "#808000", "#bfef45", "#3cb44b", "#42d4f4", "#4363d8", "#911eb4", "#f032e6", "#a9a9a9", "#000000"];

function initSoccer()
{
    console.log(data[0]);
    maxPasses = 0;
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.translate(canvas.width/2,canvas.height/2);

    function drawRotatedRect(x, y, width, height, degrees, paddleColor, text)
    {
        height = height * 2;
        width = width * 2;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x+width/2, y+height/2);
        ctx.rotate(degrees*Math.PI/180);
        ctx.rect(-width/2, -height/2, width, height);
        ctx.fillStyle=paddleColor;
        ctx.fill();
        if (paddleColor == "#000000")
        {
            ctx.fillStyle="#FFFFFF";
        }
        else
        {
            ctx.fillStyle="#000000";
        }
        ctx.font = "20px Arial";
        ctx.fillText(text,-9,7);
        ctx.closePath();
        ctx.restore();
    }
    
    var ballRadius = 10;
    var x = 0;
    var y = 0;


    function drawBall(passedX, passedY) {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    currentIndex = 1;
    var zoom = 5; // was 5
    var resultsZoom = 40;
    var leftTeamColor = "red";
    var rightTeamColor = "blue";
    var ballColor = "green";

    var curBPTeam = 1;
    var curPass = 0;

    var prevPlayerPos;
    var curPlayerPos;

    var leftTeam = [11,12,15,16,19,20,22,23,25,29,30];
    var rightTeam = [41,43,45,46,47,60,61,64,65,72,73];
    var leftTeamPasses = 0;
    var rightTeamPasses = 0;

    var rightPosDict = {
        41: {x: 0, y: 0}, 43: {x: 0, y: 0}, 45: {x: 0, y: 0}, 46: {x: 0, y: 0}, 47: {x: 0, y: 0}, 60: {x: 0, y: 0}, 61: {x: 0, y: 0}, 64: {x: 0, y: 0}, 65: {x: 0, y: 0}, 72: {x: 0, y: 0}, 73: {x: 0, y: 0}
    };
    var leftPosDict = {
        11: {x: 0, y: 0}, 12: {x: 0, y: 0}, 15: {x: 0, y: 0}, 16: {x: 0, y: 0}, 19: {x: 0, y: 0}, 20: {x: 0, y: 0}, 22: {x: 0, y: 0}, 23: {x: 0, y: 0}, 25: {x: 0, y: 0}, 29: {x: 0, y: 0}, 30: {x: 0, y: 0}
    };

    var rightPassDict = {
        41: {}, 43: {}, 45: {}, 46: {}, 47: {}, 60: {}, 61: {}, 64: {}, 65: {}, 72: {}, 73: {}
    };

    var leftPassDict = {
        11: {}, 12: {}, 15: {}, 16: {}, 19: {}, 20: {}, 22: {}, 23: {}, 25: {}, 29: {}, 30: {}
    };
    leftPassDict[11] = {
        12: 0, 15: 0, 16: 0, 19: 0, 20: 0, 22: 0, 23: 0, 25: 0, 29: 0, 30: 0
    };
    leftPassDict[12] = {
        11: 0, 15: 0, 16: 0, 19: 0, 20: 0, 22: 0, 23: 0, 25: 0, 29: 0, 30: 0
    };
    leftPassDict[15] = {
        11: 0, 12: 0, 16: 0, 19: 0, 20: 0, 22: 0, 23: 0, 25: 0, 29: 0, 30: 0
    };
    leftPassDict[16] = {
        11: 0, 12: 0, 15: 0, 19: 0, 20: 0, 22: 0, 23: 0, 25: 0, 29: 0, 30: 0
    };
    leftPassDict[19] = {
        11: 0, 12: 0, 15: 0, 16: 0, 20: 0, 22: 0, 23: 0, 25: 0, 29: 0, 30: 0
    };
    leftPassDict[20] = {
        11: 0, 12: 0, 15: 0, 16: 0, 19: 0, 22: 0, 23: 0, 25: 0, 29: 0, 30: 0
    };
    leftPassDict[22] = {
        11: 0, 12: 0, 15: 0, 16: 0, 19: 0, 20: 0, 23: 0, 25: 0, 29: 0, 30: 0
    };
    leftPassDict[23] = {
        11: 0, 12: 0, 15: 0, 16: 0, 19: 0, 20: 0, 22: 0, 25: 0, 29: 0, 30: 0
    };
    leftPassDict[25] = {
        11: 0, 12: 0, 15: 0, 16: 0, 19: 0, 20: 0, 22: 0, 23: 0, 29: 0, 30: 0
    };
    leftPassDict[29] = {
        11: 0, 12: 0, 15: 0, 16: 0, 19: 0, 20: 0, 22: 0, 23: 0, 25: 0, 30: 0
    };
    leftPassDict[30] = {
        11: 0, 12: 0, 15: 0, 16: 0, 19: 0, 20: 0, 22: 0, 23: 0, 25: 0, 29: 0
    };

    var rightPassDict = {
        41: {}, 43: {}, 45: {}, 46: {}, 47: {}, 60: {}, 61: {}, 64: {}, 65: {}, 72: {}, 73: {}
    };
    rightPassDict[41] = {
        43: 0, 45: 0, 46: 0, 47: 0, 60: 0, 61: 0, 64: 0, 65: 0, 72: 0, 73: 0
    };
    rightPassDict[43] = {
        41: 0, 45: 0, 46: 0, 47: 0, 60: 0, 61: 0, 64: 0, 65: 0, 72: 0, 73: 0
    };
    rightPassDict[45] = {
        41: 0, 43: 0, 46: 0, 47: 0, 60: 0, 61: 0, 64: 0, 65: 0, 72: 0, 73: 0
    };
    rightPassDict[46] = {
        41: 0, 43: 0, 45: 0, 47: 0, 60: 0, 61: 0, 64: 0, 65: 0, 72: 0, 73: 0
    };
    rightPassDict[47] = {
        41: 0, 43: 0, 45: 0, 46: 0, 60: 0, 61: 0, 64: 0, 65: 0, 72: 0, 73: 0
    };
    rightPassDict[60] = {
        41: 0, 43: 0, 45: 0, 46: 0, 47: 0, 61: 0, 64: 0, 65: 0, 72: 0, 73: 0
    };
    rightPassDict[61] = {
        41: 0, 43: 0, 45: 0, 46: 0, 47: 0, 60: 0, 64: 0, 65: 0, 72: 0, 73: 0
    };
    rightPassDict[64] = {
        41: 0, 43: 0, 45: 0, 46: 0, 47: 0, 60: 0, 61: 0, 65: 0, 72: 0, 73: 0
    };
    rightPassDict[65] = {
        41: 0, 43: 0, 45: 0, 46: 0, 47: 0, 60: 0, 61: 0, 64: 0, 72: 0, 73: 0
    };
    rightPassDict[72] = {
        41: 0, 43: 0, 45: 0, 46: 0, 47: 0, 60: 0, 61: 0, 64: 0, 65: 0, 73: 0
    };
    rightPassDict[73] = {
        41: 0, 43: 0, 45: 0, 46: 0, 47: 0, 60: 0, 61: 0, 64: 0, 65: 0, 72: 0
    };

    resultsPrinted = false;

    function update()
    {
        // Gap from 29450 to 38000
        // Skip to 39060
        // If > 52070
        // Set to 52070
        if (currentIndex > 29450 && currentIndex < 38000)
        {
            currentIndex = 39060;
        }
        if (currentIndex > 50000) // Set to 50000
        {
            // End
            if (!resultsPrinted)
            {
                ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
                DisplayFindings();
                resultsPrinted = true;
            }
            currentIndex = 50000; // Set to 50000
        }

        if (data[currentIndex]['calc']['curBPTeam'] == curBPTeam)
        {
            if (data[currentIndex]['calc']['curPass'] != curPass)
            {
                curPlayerPos = returnCurrentPos(currentIndex);
                curPass = data[currentIndex]['calc']['curPass'];
                if (leftTeam.includes(prevPlayerPos) && leftTeam.includes(curPlayerPos))
                {
                    if (prevPlayerPos != curPlayerPos)
                    {
                        //console.log(prevPlayerPos + " passed to " + curPlayerPos);

                        if (leftTeam.includes(prevPlayerPos))
                        {
                            leftPassDict[prevPlayerPos][curPlayerPos] += 1;
                            if (leftPassDict[prevPlayerPos][curPlayerPos] > maxPasses)
                            {
                                maxPasses = leftPassDict[prevPlayerPos][curPlayerPos];
                            }
                            // Update leftPassDict here for ALL players
                            for (z = 0; z < leftTeam.length; z++) 
                            {
                                number = leftTeam[z]
                                for (value in data[currentIndex]['data'])
                                {
                                    if (data[currentIndex]['data'][value]['id'] == number)
                                    {
                                        leftPosDict[number].x = leftPosDict[number].x + data[currentIndex]['data'][value]['x'];
                                        leftPosDict[number].y = leftPosDict[number].y + data[currentIndex]['data'][value]['y'];
                                    }
                                }
                            }
                            leftTeamPasses += 1;
                        }
                    }
                }
                if (rightTeam.includes(prevPlayerPos) && rightTeam.includes(curPlayerPos))
                {
                    if (prevPlayerPos != curPlayerPos)
                    {
                        //console.log(prevPlayerPos + " passed to " + curPlayerPos);
                       
                        if (rightTeam.includes(prevPlayerPos))
                        {
                            rightPassDict[prevPlayerPos][curPlayerPos] += 1;
                            if (rightPassDict[prevPlayerPos][curPlayerPos] > maxPasses)
                            {
                                maxPasses = rightPassDict[prevPlayerPos][curPlayerPos];
                            }
                            // Update rightPassDict here for ALL players
                            for (z = 0; z < rightTeam.length; z++) 
                            {
                                number = rightTeam[z]
                                for (value in data[currentIndex]['data'])
                                {
                                    if (data[currentIndex]['data'][value]['id'] == number)
                                    {
                                        rightPosDict[number].x = rightPosDict[number].x + data[currentIndex]['data'][value]['x'];
                                        rightPosDict[number].y = rightPosDict[number].y + data[currentIndex]['data'][value]['y'];
                                    }
                                }
                            }
                            rightTeamPasses += 1;
                        }

                    }
                }
                prevPlayerPos = curPlayerPos;
            }
        }
        else
        {
            prevPlayer = null;
        }
        curBPTeam = data[currentIndex]['calc']['curBPTeam'];
        

        var possNum = returnCurrentPos(currentIndex);
        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        if (resultsPrinted)
        {
            var i = 0;
            for (value in rightPosDict)
            {
                for (recipient in rightPassDict[value])
                {
                    ctx.beginPath();
                    lineWidth = (rightPassDict[value][recipient]/maxPasses)*12;
                    ctx.moveTo((rightPosDict[value].x)*resultsZoom, (rightPosDict[value].y)*resultsZoom);
                    ctx.lineTo((rightPosDict[recipient].x)*resultsZoom, (rightPosDict[recipient].y)*resultsZoom);
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = resultColors[i];
                    ctx.stroke();
                }
                i++
            }
            i = 0;
            for (value in rightPosDict)
            {
                currentColor = resultColors[i];
                drawRotatedRect(rightPosDict[value].x*resultsZoom, rightPosDict[value].y*resultsZoom,10,10,0,currentColor,value);
                i++;
            }
        }
        else
        {
            for (i = 0; i < data[currentIndex]['data'].length; i++)
            {
                var currentColor = "purple";
                switch (data[currentIndex]['data'][i]['id']) 
                {
                    // Red / Left Team
                    case 11:
                    case 12:
                    case 15:
                    case 16:
                    case 19:
                    case 20:
                    case 22:
                    case 23:
                    case 25:
                    case 29:
                    case 30:
                        currentColor = leftTeamColor;
                    break;
                    // Right / Blue Team
                    case 41:
                    case 43:
                    case 45:
                    case 46:
                    case 47:
                    case 60:
                    case 61:
                    case 64:
                    case 65:
                    case 72:
                    case 73:
                        currentColor = rightTeamColor;
                    break;
                    case 5:
                        currentColor = ballColor
                    break;
                    default:
                    break;
                }
                drawRotatedRect(data[currentIndex]['data'][i]['x']*zoom, data[currentIndex]['data'][i]['y']*zoom,10,10,0,currentColor, data[currentIndex]['data'][i]['id']);
                drawRotatedRect(-400,250,1,1,0,"black","Poss: " + String(possNum));
                drawRotatedRect(-400,275,1,1,0,"black","Index: " + String(currentIndex));
                drawRotatedRect(200,250,1,1,0,"black","curPass: " + String(data[currentIndex]['calc']['curPass']));
                drawRotatedRect(200,275,1,1,0,"black","curBPTeam: " + String(data[currentIndex]['calc']['curBPTeam']));
            }
        }
           
            // ctx.beginPath();
            // ctx.lineWidth = 10;
            // ctx.stroke();

            // drawRotatedRect(currentXPos[i], currentYPos[i], 10 ,10, 0, "purple"); // (DRAW INITIAL PADDLE COLLISION POINT)

        // if (rightPressed)
        // {
        //     if (shiftPressed)
        //     {
        //         currentIndex += 5;
        //     }
        //     else
        //     {
        //         currentIndex++;
        //     }
        // }
        // if (leftPressed && currentIndex > 0)
        // {
        //     if (shiftPressed)
        //     {
        //         currentIndex -= 5;
        //     }
        //     else
        //     {
        //         currentIndex--;
        //     }
        // }
        if (rightPressed)
        {
            resultsZoom++;
        }
        else if (leftPressed)
        {
            resultsZoom--;
        }
        currentIndex++;
    }
    setInterval(update, 0);

    var rightPressed = false;
    var leftPressed = false;
    var shiftPressed = false;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        //console.log(e.keyCode);
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
        else if (e.keyCode == 16){
            shiftPressed = true;
        }
        else if (e.keyCode == 32){
            DisplayFindings();
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
        else if (e.keyCode == 16) {
            shiftPressed = false;
        }
    }

    function returnCurrentPos(frame)
    {
        for (i = 0; i < data[frame]['data'].length; i++)
        {
            if (data[currentIndex]['data'][i]['poss'])
            {
                return data[frame]['data'][i]['id'];
            }
        }
        return null;
    }

    function DisplayFindings()
    {
        console.log(leftPassDict);
        console.log(rightPassDict);
        // Indegree Centrality = number of passes coming in
        // Outdegree Centrality = number of passes going out

        for (i = 0; i < leftTeam.length; i++)
        {
            thisDictionary = leftPassDict[leftTeam[i]];
            outDegree = 0;
            for (var key in thisDictionary)
            {
                outDegree += thisDictionary[key];
            }
            console.log(leftTeam[i] + " outDegree: " + outDegree);
        
            inDegree = 0;
            for (j = 0; j < leftTeam.length; j++)
            {
                if (leftTeam[j] != leftTeam[i])
                {
                    currentDictionary = leftPassDict[leftTeam[j]];
                    inDegree += currentDictionary[leftTeam[i]];
                }
            }
            console.log(leftTeam[i] + " inDegree: " + inDegree);
        }

        for (i = 0; i < rightTeam.length; i++)
        {
            thisDictionary = rightPassDict[rightTeam[i]];
            outDegree = 0;
            for (var key in thisDictionary)
            {
                outDegree += thisDictionary[key];
            }
            console.log(rightTeam[i] + " outDegree: " + outDegree);

            inDegree = 0;
            for (j = 0; j < rightTeam.length; j++)
            {
                if (rightTeam[j] != rightTeam[i])
                {
                    currentDictionary = rightPassDict[rightTeam[j]];
                    inDegree += currentDictionary[rightTeam[i]];
                }
            }
            console.log(rightTeam[i] + " inDegree: " + inDegree);
        }
        for (i = 0; i < leftTeam.length; i++)
        {
            avgX = leftPosDict[leftTeam[i]].x / leftTeamPasses;
            avgY = leftPosDict[leftTeam[i]].y / leftTeamPasses;

            console.log(leftTeam[i] + " avgX : " + avgX + " avgY: " + avgY);

            leftPosDict[leftTeam[i]].x = avgX;
            leftPosDict[leftTeam[i]].y = avgY;
        }
        for (i = 0; i < rightTeam.length; i++)
        {
            avgX = rightPosDict[rightTeam[i]].x / rightTeamPasses;
            avgY = rightPosDict[rightTeam[i]].y / rightTeamPasses;

            console.log(rightTeam[i] + " avgX : " + avgX + " avgY: " + avgY);

            rightPosDict[rightTeam[i]].x = avgX;
            rightPosDict[rightTeam[i]].y = avgY;
        }

        resultsPrinted = true;
    }
}