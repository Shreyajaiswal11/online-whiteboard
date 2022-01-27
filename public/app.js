let toolscontainer=document.querySelector('.tools-container');
let penciltools=document.querySelector('.pencil-container');
let options= document.querySelector('.options-container');
let erasertool= document.querySelector('.eraser-container');
let pencil=document.querySelector('.pencil');
let eraser=document.querySelector('.eraser');
let sticky=document.querySelector('.stickynote');
let upload=document.querySelector('.upload');

let pencilflag=false;
let eraserflag=false;
let flag=true;
// flag->true means show options ad false means show cross
options.addEventListener('click',(e) =>{
    flag=!flag;
    if(flag)
        opentools();
        else 
        closetools();
});
function opentools(){
    let iconEle=options.children[0];
    iconEle.classList.remove('fa-times');
    iconEle.classList.add('fa-bars');
    toolscontainer.style.display="flex";
    
}
function closetools(){
    let iconEle=options.children[0];
    iconEle.classList.remove('fa-bars');
    iconEle.classList.add('fa-times');
    toolscontainer.style.display="none";

    penciltools.style.display="none";
    erasertool.style.display="none";
}
pencil.addEventListener('click', (e)=>{
    pencilflag=!pencilflag;
    if(pencilflag)
penciltools.style.display="block";
else 
penciltools.style.display="none";
})
eraser.addEventListener('click', (e)=>{
    eraserflag=!eraserflag;
    if(eraserflag)erasertool.style.display="flex";
     else erasertool.style.display="none";
    })

// function to minimize and maximize sticky notes
    function Noteaction(minimize, remove, cont){
        remove.addEventListener('click', () =>{
            cont.remove();
        })
        minimize.addEventListener('click', () =>{
        let notecont=cont.querySelector('.note-con');
        let display=getComputedStyle(notecont).getPropertyValue("display");
        if(display==='none') notecont.style.display="block";
        else notecont.style.display="none";})
        
    }
    // for uploading img
    upload.addEventListener('click',(e) =>{
        // open file explorer
        let input=document.createElement("input");
        input.setAttribute('type','file');
        input.click();

        input.addEventListener('change', (e) =>{
            let file=input.files[0];
            let url=URL.createObjectURL(file);
            let stickyTemplateHTML= 
            ` <div class="sticky-header">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
            <div class="note-con">
                <img src="${url}">
        </div>`;
           
            createSticky(stickyTemplateHTML)  
       
        })
            
    })

    sticky.addEventListener('click', (e) =>{
        let stickyTemplateHTML= `
         <div class="sticky-header">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
        <div class="note-con">
        <textarea spellcheck="false"></textarea>
    </div>`;
    createSticky(stickyTemplateHTML)  
      })
  
 function createSticky(stickyTemplateHTML){
        let cont = document.createElement('div');
        cont.setAttribute("class","sticky-con");
        cont.innerHTML= stickyTemplateHTML;
        document.body.appendChild(cont);

        let minimize=cont.querySelector('.minimize');
        let remove=cont.querySelector('.remove');
        Noteaction(minimize, remove, cont)

           cont.onmousedown=function(event){
            dragAndDrop(cont,event)
           };
           cont.ondragstart=function (){
               return false;
           };
  }
    function dragAndDrop(element, event) {
        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;
    
        element.style.position = 'absolute';
        element.style.zIndex = 1000;
    
        moveAt(event.pageX, event.pageY);
        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }
    
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
    
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
    
        // drop the ball, remove unneeded handlers
        element.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
        };
    }
             
    
