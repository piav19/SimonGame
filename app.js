/*let inp=document.querySelector("input");
let btn=document.querySelector("#add");
let ul=document.querySelector("ul");

btn.addEventListener("click",function(){
    let item=document.createElement("li");
    item.innerText=inp.value;

    let delbtn=document.createElement("button");
    delbtn.innerText="Delete";
    delbtn.classList.add("delete");
    item.appendChild(delbtn);
    
    ul.appendChild(item);
    inp.value="";
});

ul.addEventListener("click",function(event){
    
    if(event.target.nodeName=="BUTTON"){
        let listItem=event.target.parentElement;
        listItem.remove();
    }
})*/

//------------------->>>>>>>below code is only working for existing elements due to event delegation.

// let delbtns=document.querySelectorAll(".delete");
// for(delbtn of delbtns){
//     delbtn.addEventListener("click",function(){
//         let par=this.parentElement;
//         console.log(par);
//         par.remove();
//     })
// }


//------------------------------------------SIMON GAME--------------------------------------------------------


let gameSeq=[];
let userSeq=[];

let btns=["red","yellow","green","blue"];

let started=false;
let level=0;
let score=0;
let highScore=0;


let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelUp(); 
    }
    });

function GameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
};

function UserFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
};

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);  
    gameSeq.push(randColor);
    console.log(gameSeq);  
    GameFlash(randBtn);    
}

function checkAns(idx){
   // console.log("curr level:",level);
   
   if(userSeq[idx]==gameSeq[idx]){
    if(userSeq.length==gameSeq.length){
        setTimeout(levelUp,1000);
    }
   }else{
    h2.innerHTML=`Game Over! <b>Score:${level}<br>Press any key to start.`;
    updateScore();
     document.querySelector("body").style.backgroundColor="purple";
     setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
     },150);
    reset();
   }

}
function btnPress(){
    let btn=this;
    UserFlash(btn);
    let usercolor=btn.getAttribute("id");
    userSeq.push(usercolor);
      
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function updateScore(){
     if(highScore<level){
       highScore=level;
     }   
     document.querySelector("span").innerText=highScore; 
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
    score=0;
}





