let job = document.getElementById("btn-job");
let tasks = JSON.parse(localStorage.getItem("task")) || [];
let ul = document.getElementById("myUl");
tasks.forEach((task) => {
  let li = document.createElement("li");
  li.classList.add("text");
  li.innerHTML = `${task} <span><button>Sửa</button> <button class="delete-btn">Xóa</button></span>`;
  ul.appendChild(li);
});
job.onclick = function () {
  let input = document.getElementById("job").value;
  if (input === "") {
    alert("Vui lòng nhập công việc!");
    return;
  } else {
    let li = document.createElement("li");
    li.innerHTML = `${input} <span><button class="btn-fix">Sửa</button> <button class="btn-del">Xóa</button></span>`;
    ul.appendChild(li);
    tasks.push(input);
    localStorage.setItem("task", JSON.stringify(tasks));
  }

  let fix=document.getElementsByClassName("btn-fix");
  let listItems = document.getElementsByTagName("li"); 
  for(let i=0;i<fix.length;i++){
    fix[i].onclick=function(){
        let fixInput=prompt("Chỉnh sửa công việc:",tasks[i]);
        if (fixInput) {
            listItems[i].firstChild.textContent = fixInput;
            tasks[i] = fixInput;
            localStorage.setItem("task", JSON.stringify(tasks));
          }
      }
  }
  
  let deleteBtn=document.getElementsByClassName("btn-del");
  for(let i=0;i<deleteBtn.length;i++){
    deleteBtn[i].onclick=function(){
        if (confirm("Bạn có chắc muốn xóa công việc này không?")) {
            ul.removeChild(listItems[i]);
            tasks.splice(i, 1);
            localStorage.setItem("task", JSON.stringify(tasks));
          }
      }
  }
  document.getElementById("job").value = "";
};
