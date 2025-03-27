let add = document.getElementById("btn-add");
let save = document.getElementById("save");
let container = document.getElementsByClassName("container")[0];
let bookmarkListContainer = document.querySelector(".bookmark-list-container");

add.onclick = function () {
    container.style = "display:block";
    document.getElementsByTagName("body")[0].style = "background-color: #382b48;";
};

save.onclick = function () {
    let name = document.getElementById("name").value;
    let url = document.getElementById("url").value;

    if (!name || !url) {
        alert("Please fill in both fields!");
        return;
    }

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.push({ name, url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    document.getElementById("name").value = "";
    document.getElementById("url").value = "";
    container.style = "display:none";

    displayBookmarks();
};

function displayBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarkListContainer.innerHTML = "";

    bookmarks.forEach((bookmark, index) => {
        let div = document.createElement("div");
        div.className = "bookmark-item";
        // let faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${new URL(bookmark.url).hostname}`;
         // <img src="${faviconUrl}" alt="favicon" style="width: 20px; height: 20px; border-radius: 3px;">;
        // let faviconUrl = new URL(bookmark.url).origin + "/favicon.ico";
        // <img src="${faviconUrl}" alt="favicon" style="width: 20px; height: 20px; border-radius: 3px;">
        div.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
            <i class="fa-solid fa-xmark" onclick="deleteBookmark(${index})"></i>
        `;
        bookmarkListContainer.appendChild(div);
    });
}

function deleteBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
}

displayBookmarks();