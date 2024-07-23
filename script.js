let search = document.querySelector("#search");
let btn = document.querySelector("button");
let main = document.querySelector("main");


//
const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "FBbnvpZh3fuMC2eu-ogjjS8vUUHEoIRYHEVnb0iXpoZaKQkDBa");
myHeaders.append("x-apihub-host", "Video-Downloader.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "61cd9229-ed75-4f09-84ed-5da30e4881be");

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow"
};

//
async function getData() {
    let searchValue = search.value;
    try {
        if (searchValue !== "") {
            main.classList.add("loader");
            let res = await fetch(`https://Video-Downloader.proxy-production.allthingsdev.co/youtube/download?url=${searchValue}`, requestOptions)
            let data = await res.json();
            let display = data;
            main.classList.remove("loader");
            let arr = data.downloadLinks
            arr.forEach(element => {
                console.log(element);

                let div = document.createElement("div");
                main.appendChild(div);
                let img = document.createElement("img");
                img.src = display.imageUrl;
                div.appendChild(img);
                let span = document.createElement("span")
                span.textContent = element.resolution;
                div.appendChild(span);
                let a = document.createElement("a");
                div.appendChild(a);
                a.href = element.link;
                a.target = "_blank";
                a.textContent = "Download Now";

                // let button1 = document.createElement("button");
                // div.appendChild(button1);
                // let a = document.createElement("a");
                // button1.appendChild("a");
                // a.href = element.downloadLinks;
                // a.textContent = "Download Now";



            });
        }
        else {
            alert("plz enter the url");
        }

    } catch (error) {
        console.log(error);

    }
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    main.innerHTML = "";
    getData();
});
