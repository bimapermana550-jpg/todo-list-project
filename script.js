// =================
// GLOBAL VARIABLE
// =================

let editIndex = null;




// =================
// REGISTER
// =================

function register(){

let user =
document.getElementById("regUser").value;

let pass =
document.getElementById("regPass").value;


localStorage.setItem(user,pass);


alert("Register berhasil!");

window.location.href="index.html";

}





// =================
// LOGIN
// =================


function login(){


let user =
document.getElementById("loginUser").value;


let pass =
document.getElementById("loginPass").value;


let storedPass =
localStorage.getItem(user);



if(storedPass === pass){


localStorage.setItem(
"currentUser",
user
);


window.location.href="home.html";


}else{


alert("Login gagal!");

}


}




// =================
// CEK LOGIN
// =================


function checkLogin(){


let user =
localStorage.getItem("currentUser");


if(!user){

window.location.href="index.html";

}

}





// =================
// DEADLINE REMINDER
// =================


function checkDeadline(date){


if(!date){
return "";
}



let today = new Date();

let deadline = new Date(date);



today.setHours(0,0,0,0);
deadline.setHours(0,0,0,0);



let diff =
Math.ceil(
(deadline - today)
/ 
(1000*60*60*24)
);




if(diff < 0){


return `
<span class="late">
🚨 Terlambat
</span>
`;


}



if(diff <= 1){


return `
<span class="warning">
⚠️ Deadline dekat
</span>
`;

}



return "";

}




// =================
// LOAD TASK
// =================


function loadTasks(){


let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];



displayTasks(
tasks,
"all"
);


updateDashboard();


}







// =================
// TAMBAH TASK
// =================


function addTask(){


let input =
document.getElementById("taskInput");


let priority =
document.getElementById("priority").value;



let deadline =
document.getElementById("deadline").value;



if(input.value==""){


alert(
"Tugas tidak boleh kosong!"
);

return;

}



let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];



tasks.push({

text:input.value,

priority:priority,

deadline:deadline,

done:false

});



localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



input.value="";


loadTasks();


}





// =================
// DISPLAY TASK
// =================


function displayTasks(tasks,filter){


let list =
document.getElementById("taskList");


list.innerHTML="";



tasks.forEach((task,index)=>{



if(filter=="done" && !task.done)
return;



if(filter=="undone" && task.done)
return;





let li =
document.createElement("li");



li.innerHTML = `



<div>


<b style="
${task.done?
'text-decoration:line-through;color:gray;'
:''}
">

${task.text}

</b>


<br>


📅 Deadline:
${task.deadline || "-"}


<br>


${checkDeadline(task.deadline)}



<br>


⭐ Priority:
${task.priority}



</div>





<div class="task-buttons">


<button onclick="doneTask(${index})">
✔
</button>



<button onclick="editTask(${index})">
✏️
</button>



<button onclick="deleteTask(${index})">
❌
</button>


</div>


`;



list.appendChild(li);



});


}







// =================
// EDIT TASK
// =================


function editTask(index){


let tasks =
JSON.parse(localStorage.getItem("tasks"));



editIndex=index;



document.getElementById("editInput")
.value =
tasks[index].text;



document.getElementById("editBox")
.style.display="block";



}







function saveEdit(){


let tasks =
JSON.parse(localStorage.getItem("tasks"));



let value =
document.getElementById("editInput")
.value;



if(value!=""){


tasks[editIndex].text=value;



localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



loadTasks();



}


cancelEdit();


}







function cancelEdit(){


document.getElementById("editBox")
.style.display="none";


document.getElementById("editInput")
.value="";


}







// =================
// DONE
// =================


function doneTask(index){



let tasks =
JSON.parse(localStorage.getItem("tasks"));



tasks[index].done =
!tasks[index].done;



localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



loadTasks();


}






// =================
// DELETE
// =================


function deleteTask(index){


let tasks =
JSON.parse(localStorage.getItem("tasks"));


tasks.splice(index,1);



localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



loadTasks();


}






// =================
// FILTER
// =================


function filterTask(){


let filter =
document.getElementById("filter").value;



let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];



displayTasks(
tasks,
filter
);


}








// =================
// SEARCH
// =================


function searchTask(){


let keyword =
document
.getElementById("searchInput")
.value
.toLowerCase();



let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];



let result =
tasks.filter(task =>

task.text
.toLowerCase()
.includes(keyword)

);



displayTasks(
result,
"all"
);



}








// =================
// DEADLINE REMINDER
// =================

function checkDeadline(date){

    if(!date){
        return "";
    }


    let today = new Date();
    let deadline = new Date(date);


    today.setHours(0,0,0,0);
    deadline.setHours(0,0,0,0);


    let diff = Math.ceil(
        (deadline - today) /
        (1000*60*60*24)
    );


    if(diff < 0){

        return `
        <span class="late">
        🚨 Terlambat
        </span>
        `;

    }


    if(diff <= 1){

        return `
        <span class="warning">
        ⚠️ Deadline dekat
        </span>
        `;

    }


    return "";

}





// =================
// DASHBOARD
// =================

function updateDashboard(){


    let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];



    let total =
    tasks.length;



    let done =
    tasks.filter(
        task => task.done
    ).length;



    let pending =
    total - done;



    // angka dashboard

    document.getElementById("totalTask")
    .innerHTML = total;



    document.getElementById("doneTask")
    .innerHTML = done;



    document.getElementById("pendingTask")
    .innerHTML = pending;





    // =================
    // PROGRESS BAR
    // =================


    let percent = 0;



    if(total > 0){

        percent =
        Math.round(
            (done / total) * 100
        );

    }




    let bar =
    document.getElementById("progressBar");


    let text =
    document.getElementById("progressText");



    if(bar && text){

        bar.style.width =
        percent + "%";


        text.innerHTML =
        percent + "%";

    }


}
// =================
// LOGOUT
// =================


function logout(){


localStorage.removeItem(
"currentUser"
);



alert("Logout berhasil!");



window.location.href="index.html";


}
