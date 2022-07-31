
const row = document.querySelector(".row");
const seaBtn = document.querySelector(".searchBtn");

let url="https://gnews.io/api/v4/top-headlines?&lang=en&token=63ace67d51051a132ec93837ee853143";

//Top Headline

window.addEventListener("DOMContentLoaded",() => {
    row.textContent = "Loading............";
    fetch(url).then(rep=>rep.json())
    .then((data)=>{
        console.log(data);
        console.log(data.articles);
        row.innerHTML = "";
        data.articles.forEach(el => {
            makeList(el);
        });
    });
})

function makeList(item) {
    const div1 = document.createElement("div");
    div1.innerHTML = "<img "+ "src=" + item.image + ">"
    row.append(div1);

    const div2 =  document.createElement("div");
    div2.innerHTML = "<a href="+item.url+" target="+"_blank"+">" + item.title + "</a>" + "<br>" + item.publishedAt +"<br>" + item.description ;
    row.append(div2);
};

//Search

seaBtn.addEventListener("click",()=> {
    let inVal = $("#searchValue").val();
    url = "https://gnews.io/api/v4/search?q="+ inVal +"&lang=en&token=63ace67d51051a132ec93837ee853143"; 
    if(inVal=="") {
        alert("Vui long nhap tu khoa");
    } else {        
        closeModal()
        row.textContent = "Loading............";
        mySearch();
        $("#searchValue").val("");
    }
});

function mySearch() {               
    fetch(url).then(rep=>rep.json())
    .then((data)=>{        
        if(data.articles == 0) {
            row.innerHTML = "Result not found!";
        } else {
            row.innerHTML = "";
            data.articles.forEach(el => {
                makeList(el);
            })
        }
    });    
};

// Modal

var modal = document.getElementById("forSearch");
var modalImg = document.getElementById("searchImage");
var closeBtn = document.getElementById("closeBtn");

modalImg.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", clickOut);

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function clickOut(e) {
    if(e.target == modal) {
        modal.style.display = "none";
    }    
}