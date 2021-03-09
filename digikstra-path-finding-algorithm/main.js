
function getRandomArbitrary(min, max){
    return Math.random() * (max-min) + min;
}

function createNode(row, col, weight){
    var node = document.createElement("div");
    node.setAttribute("class", "node");
    node.setAttribute("row", row);
    node.setAttribute("col", col);
    node.setAttribute("cost", Number.POSITIVE_INFINITY);
    node.setAttribute("parent", null);
    node.setAttribute("weight", weight);
    node.setAttribute("onClick","getValue(($(this).attr('class')),($(this).attr('row')),($(this).attr('col')));");

    return node;
}

 function getValue(node,x,y){
   
    var sn = document.getElementsByName('setnode'); 
    if(sn[0].checked)  {
        console.log(x+"|"+y);
        var startnode = document.querySelector(`div[row="${x}"][col="${y}"]`);
        startnode.style.backgroundColor = "#e5edb7";
        startnode.setAttribute("startnode",true);  
        startnode.setAttribute("cost",0);
        sn[0].checked=false;
        sn[0].style.visibility="hidden";
    }
    if(sn[1].checked)  {
        console.log(x+"|"+y);
        var endnode = document.querySelector(`div[row="${x}"][col="${y}"]`);
        endnode.style.backgroundColor = "#e5edb7";
        endnode.setAttribute("endnode",true) ; 
        sn[1].checked=false;
        sn[1].style.visibility="hidden";
    }
    if(sn.visibility="hidden"){
        var btn = document.querySelector(".start");
        btn.style.visibility="visible";
    }
   
};

function createBoard(){
    var btn = document.querySelector(".start");
    btn.style.visibility="hidden";
    var grid = document.querySelector(".container");
    grid.innerHTML = "";

    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 20; col++) {
            let weight = Math.round(getRandomArbitrary(2,100));
            let temp = createNode(row, col, weight);
            grid.appendChild(temp);
        }
        
    }
}

//path finding algorithm

function start() {
    var startNode = document.querySelector("div[startnode='true']");
    var endNode = document.querySelector("div[endnode='true']");

    
  var refreshBtn = document.querySelector(".refresh");
    var seen = [startNode];
    var checker = [startNode];
    var counter = 1;

    while(checker.length!=0){
        checker.sort(function (a,b){
        
            if (parseInt(a.getAttribute("cost")) < parseInt(b.getAttribute("cost"))) {
                return 1;
            }
            if (parseInt(a.getAttribute("cost")) > parseInt(b.getAttribute("cost"))) {
                return -1;
            }
           
        });
        console.log(checker);
        let curr = checker.pop();

        let row = parseInt(curr.getAttribute("row"));
        let col = parseInt(curr.getAttribute("col"));

        let nextRow = row + 1;
        let prevRow = row - 1;
        let leftCol = col - 1;
        let rightCol = col + 1;

        let a = checkNode(nextRow, col, curr, checker, seen, counter);
        let b = checkNode(prevRow, col, curr, checker, seen, counter);
        let c = checkNode(row, leftCol, curr, checker, seen, counter);
        let d = checkNode(row, rightCol, curr, checker, seen, counter);
        counter++;
    }

    setTimeout(() => {
        startNode.style.backgroundColor = "#faf0af";

        while (endNode.getAttribute("parent") != "null") {
            endNode.style.backgroundColor = "#faf0af";
            var coor = endNode.getAttribute("parent").split("|");
            var prow = parseInt(coor[0]);
            var pcol = parseInt(coor[1]);
            endNode = document.querySelector(`div[row="${prow}"][col="${pcol}"]`);
            
        }
    }, counter * 100 + 100);

    setTimeout(() => {
        
    }, counter * 100 + 100);
  
}


function checkNode(row, col, curr, checker, seen, counter){
    if (row >= 0 && col >= 0 && row <= 19 && col <=19 ) {
        var node = document.querySelector(`div[row="${row}"][col="${col}"]`);

        var cost = Math.min(parseInt(curr.getAttribute("cost")) + parseInt(node.getAttribute("weight")),node.getAttribute("cost"));

        if (cost < node.getAttribute("cost")) {
            node.setAttribute("parent",curr.getAttribute("row")+"|"+curr.getAttribute("col"));
            node.setAttribute("cost",cost);
        }

        changeColor(node, counter, cost);
        changeColor(curr, counter, false);

        if (!seen.includes(node)) {
            checker.push(node);
        }
        seen.push(node);
        return node;
    } else {
        return false;
    }
}

function changeColor(node, counter, cost) {
    setTimeout(() => {
      node.style.backgroundColor = "#e5edb7";
    }, counter * 100);
    setTimeout(() => {
      node.style.backgroundColor = "#00ffaa";
    }, counter * 100 + 100);
  }

window.onload = () => {
    createBoard();
}

function refresh() {

    createBoard();
    var sn = document.getElementsByName('setnode');
    sn[0].style.visibility="visible"; 
    sn[1].style.visibility="visible"; 
  }