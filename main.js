// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
//  delete 버튼을 누르면 할 일이 삭제된다
//  check 버튼을 누르면 할 일이 끝나면서 밑줄이 그어진다.
//  진행중 끝남 탭을 누르면, 언더바가 이동한다
//  끝남 탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
//  전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("button-add");
let taskList = [];
addButton.addEventListener("click", addTask);




function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    render()
    console.log(taskList)
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
    render()
}
function render(){
    let resultHTML = "";
    for(let i=0; i < taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class = "task-done">${taskList[i].taskContent}</div>
                <div class = "button">
                    <button onclick="togglecomplete('${taskList[i].id}')" type="button">check</button>
                    <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                </div>
            </div>`
        }else{
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
                <div class = "button">
                    <button onclick="togglecomplete('${taskList[i].id}')" type="button">check</button>
                    <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                </div>
            </div>`
        }
    }
 
    document.getElementById("task-board").innerHTML = resultHTML
}

function randomIDGenerate(){
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}