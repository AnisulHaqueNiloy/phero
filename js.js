// show categories

// (create load categories, display categories)

// time tare convert kora hoise
function time(time) {
  const hour = parseInt(time / 3600);
  const remainSec = time % 3600;
  const min = parseInt(remainSec / 60);
  const sec = remainSec % 60;
  return `${hour} hour ${min} minute ${sec} seconds ago`;
}
// time tare convert kora hoise
const removeActiveclass = () => {
  const activebtn = document.getElementsByClassName("category_button");
  for (let btn of activebtn) {
    btn.classList.remove("active");
  }
};
//

const loadCategories = async () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data));
};
const displayCategories = async (data) => {
  const category = document.getElementById("categories");
  data.categories.forEach((item) => {
    console.log(item);
    // create a button
    // const button = document.createElement("button");
    // button.classList = "btn";
    // button.innerText = item.category;

    const btnContainer = document.createElement("div");
    // btnContainer.classList = "btn";
    btnContainer.innerHTML = `
    <button id="btn-${item.category_id}" class="category_button p-4" onclick="categoryVideo(${item.category_id})">
    ${item.category}</button>`;

    category.append(btnContainer);
  });
  // eta amar method
  // const btns = document.getElementsByClassName("btn");
  // for (let b of btns) {
  //   b.addEventListener("click", function (event) {
  //     click();
  //   });
  // }
};

// function click() {
//   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
//     .then((res) => res.json())
//     .then((data) => displayCategories(data.categories));
// }

// categoryId diye video load kora jonno data load kora hoise erpor etar vitor r ekta function call hoise jeta asole video er title egula set kore show kore
function categoryVideo(id) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveclass();
      const activebtn = document.getElementById(`btn-${id}`);
      activebtn.classList.add("active");
      displayVideos(data.category);
    });
}

// categoryId diye video load kora jonno data load kora hoise erpor etar vitor r ekta function call hoise jeta asole video er title egula set kore show kore
const loadDetails = async (id) => {
  console.log(id);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  const res = await fetch(uri);
  const data = await res.json();

  displayDetails(data.video);
};

const displayDetails = (video) => {
  const detailsContainer = document.getElementById("modal-content");
  // way1
  document.getElementById("my_modal_1").showModal();
  detailsContainer.innerHTML = `
  <img src="${video.thumbnail}">
  <p>${video.description}</p>`;
};
// videos
const loadVideos = async (search = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
};

const displayVideos = (data) => {
  const videocontainer = document.getElementById("videos");
  videocontainer.innerText = "";

  if (data.length == 0) {
    videocontainer.classList.remove("grid");
    videocontainer.innerHTML = `
    <div class="min-[500px] flex flex-col gap-5 justify-center items-center">
    <img src="/Icon.png"/>
    <p class="text-center text-xl font-bold"> No Content Here in this Category</p>
    </div>`;
    return;
  } else {
    videocontainer.classList.add("grid");
  }

  data.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact  ";
    card.innerHTML = `<figure class="h-[200px] relative">
    <img
      src="${video.thumbnail}"
      alt="Shoes" 
      class="w-full h-full object-cover"/>
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute right-2 bottom-2 bg-black rounded p-1  text-xs text-white">${time(
              video.others.posted_date
            )}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
      <img class="w-10 h-10 rounded-full object-cover" src="${
        video.authors[0].profile_picture
      }" alt="">
    </div>
    <div>
      <h1 class="font-bold">${video.title}</h1>
      <div class="flex gap-2">
      <p> ${video.authors[0].profile_name} </p>
      ${
        video.authors[0].verified
          ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">'
          : ""
      }
      
      </div>
      
      <p><button onclick="loadDetails('${
        video.video_id
      }')" class="btn btn-sm btn-error">Details</button></p>
    </div>
   
  </div>
        `;

    videocontainer.append(card);
  });
};
// videos

document.getElementById("search-input").addEventListener("keyup", function (e) {
  loadVideos(e.target.value);
});

loadCategories();
loadVideos();
