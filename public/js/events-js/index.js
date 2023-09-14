var input,temp,temp2;
window.onload = ()=>{
  localStorage.setItem("check", 1);
}
if(window.screen.width > 1200){
     input = document.getElementById("input");
}else{
    input = document.getElementById("input1");
    console.log("hello");
}
const a = document.getElementsByClassName("sportname")[0];
const cardtext = document.querySelectorAll(".card1 .name h1");
const cardimg = document.getElementsByClassName("sportsimg");
const clickable = document.querySelectorAll('._sport');

const find = (text)=>{
    if(input.value.length == 0 ){
        document.getElementsByClassName(`${temp}`)[0].style.color = "white";
        document.getElementsByClassName("athletics")[0].style.color = "yellow";
        cardtext[0].innerHTML = "Athletics";
        cardtext[1].innerHTML = "Athletics";
        cardimg[0].setAttribute('src',`../../images/events-imgs/athletics.jpg`);
        cardimg[1].setAttribute('src',`../../images/events-imgs/athletics.jpg`);
        a.innerHTML = "Athletics";
    }
    if(document.getElementsByClassName(`${text}`)[0] != null){
        document.getElementsByClassName("athletics")[0].style.color = "white";
        var node = document.getElementsByClassName(`${text}`)[0];
        node.style.color = "yellow";
        cardtext[0].innerHTML = node.textContent;
        cardtext[1].innerHTML = node.textContent;
        temp = node.textContent;
        cardimg[0].setAttribute('src',`../../images/events-imgs/${text}.jpg`);
        cardimg[1].setAttribute('src',`../../images/events-imgs/${text}.jpg`);
        text = node.textContent;
        a.innerHTML = node.textContent;
    }    

}

const f1 = document.getElementById('togglerId');
const find2 = (text)=>{
    f1.checked = false;
    if(document.getElementsByClassName(`${text}`)[0] != null){
        localStorage.setItem("check", 0);
        var text2 = text;
        var node = document.getElementsByClassName(`${text}`)[0];
        node.style.color = "yellow";
        if(temp2 != text2 && document.getElementsByClassName(`${temp2}`)[0] != null){
            document.getElementsByClassName(`${temp2}`)[0].style.color = "white";
        }
        temp2 = text;
        cardtext[0].innerHTML = node.textContent;
        cardtext[1].innerHTML = node.textContent;
        temp = node.textContent;
        cardimg[0].setAttribute('src',`../../images/events-imgs/${text}.jpg`);
        cardimg[1].setAttribute('src',`../../images/events-imgs/${text}.jpg`);
        text = node.textContent;
        a.innerHTML = node.textContent;

        const url = `../desktop15/desktop15.html`
        document.getElementById("register").setAttribute("href",url)
        document.getElementById("registerfe").setAttribute("href",url)
        text2 = text2.charAt(0).toUpperCase() + text2.slice(1);
        console.log(text2);
        localStorage.setItem("name", text2);
    }    

}


input.onkeyup = ()=>{
    find(input.value);
}

// const func = ()=>{
//     const var_ = document.getElementsByClassName("sportname")[0].innerHTML;
//     document.getElementById("register").setAttribute("href",`../desktop15/${var_}.html`)
// }
