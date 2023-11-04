var input, temp, temp2;
window.onload = async () => {
    localStorage.setItem("check", 1);

    //updating score board
    const text = 'basketball';
    let sport = {
        name: text
    };
    const card = document.getElementsByClassName('sportnameLEAD');
    card[0].textContent = `${text}(Mens)`;
    card[1].textContent = `${text}(Womens)`;

    // get ranking data from database

    const response = await fetch(`/api/admin/get`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(sport)
    });
    const res = await response.json();
    const men_ranking = document.getElementsByClassName("men_ranking");
    men_ranking[0].textContent = res[0].rank1;
    men_ranking[1].textContent = res[0].rank2;
    men_ranking[2].textContent = res[0].rank3;
    men_ranking[3].textContent = res[0].rank4;

    if (res.length == 2) {
        const women_ranking = document.getElementsByClassName("women_ranking");
        women_ranking[0].textContent = res[1].rank1;
        women_ranking[1].textContent = res[1].rank2;
        women_ranking[2].textContent = res[1].rank3;
        women_ranking[3].textContent = res[1].rank4;
    }
    else {
        const element = document.getElementsByClassName("bars-women");
        card[1].style.visibility = "hidden";
        element[0].style.visibility = "hidden";
        // console.log(element);
    }
}
if (window.screen.width > 1200) {
    input = document.getElementById("input");
} else {
    input = document.getElementById("input1");
    console.log("hello");
}
const a = document.getElementsByClassName("sportname")[0];
const cardtext = document.querySelectorAll(".card1 .name h1");
const cardimg = document.getElementsByClassName("sportsimg");
const clickable = document.querySelectorAll('._sport');

const find = (text) => {
    if (input.value.length == 0) {
        document.getElementsByClassName(`${temp}`)[0].style.color = "white";
        document.getElementsByClassName("athletics")[0].style.color = "yellow";
        cardtext[0].innerHTML = "Athletics";
        cardtext[1].innerHTML = "Athletics";
        cardimg[0].setAttribute('src', `../../images/events-imgs/athletics.jpg`);
        cardimg[1].setAttribute('src', `../../images/events-imgs/athletics.jpg`);
        a.innerHTML = "Athletics";
    }
    if (document.getElementsByClassName(`${text}`)[0] != null) {
        document.getElementsByClassName("athletics")[0].style.color = "white";
        var node = document.getElementsByClassName(`${text}`)[0];
        node.style.color = "yellow";
        cardtext[0].innerHTML = node.textContent;
        cardtext[1].innerHTML = node.textContent;
        temp = node.textContent;
        cardimg[0].setAttribute('src', `../../images/events-imgs/${text}.jpg`);
        cardimg[1].setAttribute('src', `../../images/events-imgs/${text}.jpg`);
        text = node.textContent;
        a.innerHTML = node.textContent;
    }

}

const f1 = document.getElementById('togglerId');
const find2 = async (text) => {
    let sport = {
        name: text
    };
    f1.checked = false;
    if (document.getElementsByClassName(`${text}`)[0] != null) {
        localStorage.setItem("check", 0);
        var text2 = text;
        var node = document.getElementsByClassName(`${text}`)[0];
        node.style.color = "yellow";
        if (temp2 != text2 && document.getElementsByClassName(`${temp2}`)[0] != null) {
            document.getElementsByClassName(`${temp2}`)[0].style.color = "white";
        }
        temp2 = text;
        cardtext[0].innerHTML = node.textContent;
        cardtext[1].innerHTML = node.textContent;
        temp = node.textContent;
        cardimg[0].setAttribute('src', `../../images/events-imgs/${text}.jpg`);
        cardimg[1].setAttribute('src', `../../images/events-imgs/${text}.jpg`);
        text = node.textContent;
        a.innerHTML = node.textContent;

        const url = `/register`
        document.getElementById("register").setAttribute("href", url)
        document.getElementById("registerfe").setAttribute("href", url)
        text2 = text2.charAt(0).toUpperCase() + text2.slice(1);
        // console.log(text2);
        localStorage.setItem("name", text2);


        //updating score board
        const card = document.getElementsByClassName('sportnameLEAD');
        card[0].textContent = `${text}(Mens)`;
        card[1].textContent = `${text}(Womens)`;

        // get ranking data from database

        const response = await fetch(`/api/admin/get`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sport)
        });
        const res = await response.json();
        // console.log(res); 
        const men_ranking = document.getElementsByClassName("men_ranking");
        const women_ranking = document.getElementsByClassName("women_ranking");

        let menRanking = {
            rank1: "NA",
            rank2: "NA",
            rank3: "NA",
            rank4: "NA",
        };
        let womenRanking = {
            rank1: "NA",
            rank2: "NA",
            rank3: "NA",
            rank4: "NA",
        }
        if (res.length == 1) {
            if (res[0].gender == 'male') {
                menRanking = res[0];
               
            }
            else {
                womenRanking = res[0];
               
            }
        }
        if (res.length == 2) {//random comment
            if (res[0].gender == 'male') {
                menRanking = res[0];
                womenRanking=res[1];
               
            }
            else {
                womenRanking = res[0];
               menRanking=res[1];
            }
        }

        men_ranking[0].textContent = menRanking.rank1;
        men_ranking[1].textContent = menRanking.rank2;
        men_ranking[2].textContent = menRanking.rank3;
        men_ranking[3].textContent = menRanking.rank4;
        women_ranking[0].textContent = womenRanking.rank1;
        women_ranking[1].textContent = womenRanking.rank2;
        women_ranking[2].textContent = womenRanking.rank3;
        women_ranking[3].textContent = womenRanking.rank4;

    }

}




input.onkeyup = () => {
    find(input.value);
}

// const func = ()=>{
//     const var_ = document.getElementsByClassName("sportname")[0].innerHTML;
//     document.getElementById("register").setAttribute("href",`../desktop15/${var_}.html`)
// }
