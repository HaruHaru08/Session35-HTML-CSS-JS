const products = [
  {
    id: 1,
    name: "Laptop Dell XPS 15",
    price: 35990000,
    image:
      "https://th.bing.com/th/id/R.dd66a48254aca2d1e37b8887993a100c?rik=Ileg6QdLFs2iTA&pid=ImgRaw&r=0",
    description:
      "Laptop cao cấp với màn hình 15 inch, CPU Intel Core i7 và RAM 16GB.",
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: 32990000,
    image:
      "https://th.bing.com/th/id/OIP.PO8M08Vxndz_455at0qGawHaFj?rs=1&pid=ImgDetMain",
    description:
      "Điện thoại flagship của Apple với camera 48MP và chip A17 Pro.",
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    price: 28990000,
    image:
      "https://th.bing.com/th/id/OIP.n5ZE0e4C910Ed2cLhNKjPAHaEK?rs=1&pid=ImgDetMain",
    description:
      "Điện thoại Android mạnh mẽ với bút S-Pen và camera siêu zoom.",
  },
  {
    id: 4,
    name: "Tai nghe Sony WH-1000XM5",
    price: 7990000,
    image:
      "https://file.hstatic.net/1000146770/file/wh-1000xm4_trang__2__0f6c8b32d18d49f8b9d8b231b3b80fe6.jpg",
    description:
      "Tai nghe chống ồn tốt nhất với thời lượng pin lên đến 30 giờ.",
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    price: 11990000,
    image:
      "https://bgr.com/wp-content/uploads/2023/09/Apple-Watch-Series-9.jpg?quality=82&strip=all",
    description:
      "Đồng hồ thông minh cao cấp với tính năng đo nhịp tim và hỗ trợ thể thao.",
  },
  {
    id: 6,
    name: "Loa JBL Charge 5",
    price: 3990000,
    image:
      "https://th.bing.com/th/id/OIP.kNp66Lw41hQJBWsxrddSZQHaHa?rs=1&pid=ImgDetMain",
    description: "Loa Bluetooth chống nước với âm bass mạnh mẽ và pin 20 giờ.",
  },
];
function displayList(products) {
  let productList = document.getElementById("container");
  productList.innerHTML = "";
  for (const i of products) {
    let productsCard = document.createElement("div");
    productsCard.classList.add("card");
    productsCard.innerHTML = `
      <img src="${i.image}" alt="">
      <h4>${i.name}</h4>
      <p>${i.description}</p>
      <p class="price">${i.price.toLocaleString("vi-VN")} VNĐ</p>
      <button class="btn-buy">Buy</button>
      `;
    productList.appendChild(productsCard);
  }
}
document.getElementById("btn-search").onclick = function () {
  let searchInput = document.getElementById("search").value.toLowerCase();
  if (searchInput === "") {
    alert("Hãy nhập sản phẩm muốn tìm kiếm");
    return;
  } else {
    let findIndex = null;
    for (const i of products) {
      if (
        i.name.toLowerCase().includes(searchInput) ||
        i.description.toLowerCase().includes(searchInput)
      ) {
        findIndex = i;
        break;
      }
    }
    if (findIndex === null) {
      localStorage.setItem("searchResults", JSON.stringify(products));
      displayList(products);
    } else {
      localStorage.setItem("searchResults", JSON.stringify([findIndex]));
      displayList([findIndex]);
    }
  }
  document.getElementById("search").value = "";
};
function loadFromLocalStorage() {
    let savedResults = localStorage.getItem("searchResults");
    if (savedResults) {
        displayList(JSON.parse(savedResults));
    } else {
        displayList(products);
    }
}
loadFromLocalStorage();