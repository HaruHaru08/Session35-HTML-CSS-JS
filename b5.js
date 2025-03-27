let editingIndex=-1;

function getData() {
    return JSON.parse(localStorage.getItem('categories')) || [
      { code: 'DM001', name: 'Danh mục 1', status: 'Đang hoạt động' },
      { code: 'DM002', name: 'Danh mục 2', status: 'Ngừng hoạt động' },
      { code: 'DM003', name: 'Danh mục 3', status: 'Đang hoạt động' },
      { code: 'DM004', name: 'Danh mục 4', status: 'Ngừng hoạt động' },
      { code: 'DM005', name: 'Danh mục 5', status: 'Đang hoạt động' },
    ]
  }

  function saveData(data) {
    localStorage.setItem("categories", JSON.stringify(data))
  }

  function renderData() {
    let data = getData();
    let table = document.getElementById('category-table');
    console.log(table);
    table.innerHTML = ''
    console.log(data);
    data.forEach((item, index) => {
      table.innerHTML += `
            <tr> 
              <td>${item.code}</td>  
              <td>${item.name}</td>
              <td class="status ${item.status === "Đang hoạt động" ? "active" : "inactive"}">${item.status}</td> 
              <td class="actions">
                <button class="delete">Xóa</button> 
                <button class="edit">Sửa</button> 
              </td>
            </tr>
        `
    })
  }

  function openModal() {
    document.getElementById("modal").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("modal").style.display = "none"
  }

  function addCategory() {
    let codeInput = document.getElementById("code").value;
    let nameInput = document.getElementById("name").value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let code = codeInput.trim();
    let name = nameInput.trim();

    console.log("test1", code);
    console.log("test2", name);

    let valid = true;
    let codeError = document.getElementById("code-error")
    let nameError = document.getElementById("name-error")

    if (!code) {
      codeError.style.display = "block"
      valid = false
    }

    if (!name) {
      nameError.style.display = "block"
      valid = false
    }

    let data = getData()
    if (data.find(item => item.code === code)) {
      codeError.textContent = "Mã Danh mục đã tồn tại";
      codeError.style.display = "block"
      return
    }

    if(!valid) return;

    data.push({code,name,status})

    saveData(data)
    renderData()
    closeModal()
  }

  function deleteCategory(index){
    if(confirm("Bạn có muốn xóa không ???")){
      let data = getData();
      data.splice(index,1);
      saveData(data);
      renderData()
    }
  }
  function editCategory(index){
    let data =getData()[index];
    document.getElementById("code").value=data.code;
    document.getElementById("name").value=data.name;
    document.querySelector("")
}
  renderData()