// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
//  delete 버튼을 누르면 할 일이 삭제된다
//  check 버튼을 누르면 할 일이 끝나면서 밑줄이 그어진다.
//  진행중 끝남 탭을 누르면, 언더바가 이동한다
//  끝남 탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
//  전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("button-add");
let tabs = document.querySelectorAll(".tab-type div")
let taskList = [];
let filterList = [];
let mode = 'all'

addButton.addEventListener("click", addTask);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}


function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    render()
}

function togglecomplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            break
        }
    }
    render()
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break
        }
    }
    filter(event)
}

function filter(event){
    filterList = []
    mode = event.target.id
    if(mode == "all"){
        // 전체 리스트를 보여준다.
        render()
    }
    else if(mode == "ongoing"){
        // 진행중인 아이템을 보여준다.
        // task.isComplet=false
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render()
    }
    else if(mode == "done"){
        // 끝나는 케이스
        // task.isComplet=true
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}
function render(){
    let list=[]
    // 1. 내가 선택한 탭에 따라서
    if(mode == "all"){
        list = taskList;
    }else if(mode == "ongoing" || mode == "done"){
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다.
    // all은 taskList
    // ongoing, done은 filterList
    let resultHTML = "";
    for(let i=0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class = "task-done">${list[i].taskContent}</div>
                <div class = "button">
                    <button onclick="togglecomplete('${list[i].id}')" type="button">check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
                <div class = "button">
                    <button onclick="togglecomplete('${list[i].id}')" type="button">check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`
        }
    }
 
    document.getElementById("task-board").innerHTML = resultHTML
}

function randomIDGenerate(){
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}