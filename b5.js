let editingIndex=-1;

function getData() {
    return JSON.parse(localStorage.getItem("categories")) || [];
}

function saveData(data) {
    localStorage.setItem("categories", JSON.stringify(data));
}

function renderData() {
    let data = getData();
    let table = document.getElementById("category-table");
    table.innerHTML = ""; // Xóa nội dung cũ trước khi render

    data.forEach((item, index) => {
        table.innerHTML += `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td class="status ${
                  item.status === "Đang hoạt động" ? "active" : "inactive"
                }">${item.status}</td>
                <td class="actions">
                    <button class="delete" onclick="deleteCategory('${item.code}')">Xóa</button>
                    <button class="edit" onclick="editCategory(${index})">Sửa</button>
                </td>
            </tr>
        `;
    });
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

function deleteCategory(code) {
    if(confirm("Bạn có muốn xóa không ???")){
        let data = getData();
        data.splice(index,1);
        saveData(data);
        renderData()
      }
}

function editCategory(index) {
    let data = getData(); // Lấy toàn bộ dữ liệu từ localStorage
    let category = data[index]; // Lấy danh mục theo chỉ số

    if (category) {
        document.getElementById("code").value = category.code; // Gán giá trị mã danh mục
        document.getElementById("name").value = category.name; // Gán giá trị tên danh mục
        document.querySelector(`input[name="status"][value="${category.status}"]`).checked = true; // Gán trạng thái
        editingIndex = index; // Lưu chỉ số danh mục đang chỉnh sửa
        openModal(); // Mở modal để chỉnh sửa
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderData();
});
renderData()