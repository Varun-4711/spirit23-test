const dropdown = document.getElementById("myDropdown");
let selectedIndex = -1; // No option selected initially
var gender = 1;
dropdown.addEventListener("change", function () {
  selectedIndex = dropdown.selectedIndex;
  
  // Get the selected option's value
  const selectedValue = dropdown.options[selectedIndex].value;
  // Get the selected option's text content
  const selectedText = dropdown.options[selectedIndex].textContent;
  //   registrationLogic(selectedIndex);
  console.log("Selected index:", selectedIndex);
  console.log("Selected value:", selectedValue);
  console.log("Selected text:", selectedText);
  registrationLogic();
});
const maleRadio = document.getElementById("maleRadio");
  const femaleRadio = document.getElementById("femaleRadio");

  // Add event listeners to the radio buttons
  maleRadio.addEventListener("change", function () {
    if (maleRadio.checked) {
      console.log("male");
      gender = 1;
      registrationLogic();
    }
  });

  femaleRadio.addEventListener("change", function () {
    if (femaleRadio.checked) {
      gender = 0;
      registrationLogic();
    }
  });
const addButton = document.querySelector(".addMember");
const inputDiv = document.querySelector(".mainDiv");

var countMembers = 1;
function removeMember() {
  countMembers--;
  console.log(countMembers);
  this.parentElement.remove();
  registrationLogic();
}
function addNewMember() {
  countMembers++;
  console.log(countMembers);
  const name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Enter Name";
  name.name="participantname"
  name.setAttribute('class','hello');
  const email = document.createElement("input");
  email.type = "email";
  email.placeholder = "Enter Email";
  email.name="emailname";
  email.setAttribute('class','hello');
  const breaks = document.createElement("div");
  breaks.setAttribute('class','ki');
  breaks.innerHTML = `<label>Enter details of player ${countMembers}</label><br><br>`

  const buttonElement = document.createElement("button");
  buttonElement.className = "delete";
  buttonElement.innerHTML = "<i class='fa-solid fa-trash'></i>";
  buttonElement.setAttribute('class','del');

  buttonElement.addEventListener("click", removeMember);

  const flexElement = document.createElement("div");
  flexElement.className = "flex";
  // inputDiv.appendChild(breaks);
  inputDiv.appendChild(flexElement);
  flexElement.appendChild(name);
  flexElement.appendChild(email);
  flexElement.appendChild(buttonElement);
  registrationLogic();
}

function registrationLogic() {
  const submitEnable = document.querySelector(".submitButton");
  if (selectedIndex == -1) {
      submitEnable.style.display = "none";
  }
  if (selectedIndex == 1 || selectedIndex == 2) {
    if (countMembers >= 11 && countMembers <= 16 && gender == 1) {
      submitEnable.style.display = "block";
    } else {
      submitEnable.style.display = "none";
    }
  } else if (selectedIndex == 3) {
    if (gender == 1) {
      if (countMembers >= 4 && countMembers <= 5) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
    } else if (gender == 0) {
      if (countMembers >= 2 && countMembers <= 3) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
    }
  }
  else if (selectedIndex == 4||selectedIndex == 5||selectedIndex == 8) {
    if (countMembers <= 12) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if (selectedIndex == 6) {
    if (countMembers <= 16) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if (selectedIndex == 7) {
    if (countMembers <= 5&&gender==1) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if (selectedIndex == 9) {
    if (countMembers <= 4) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if (selectedIndex == 10) {
    if (countMembers>=2&&countMembers <= 4) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if (selectedIndex == 11){
      submitEnable.style.display = "block";
  }
  else if (selectedIndex == 12){
    if (countMembers <= 4&&gender==1) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if(selectedIndex == 13)
  {
    if (countMembers <= 5)
    {
      submitEnable.style.display = "block";
    } else {
      submitEnable.style.display = "none";
    }
  }
  else if(selectedIndex == 14)
  {
    if (countMembers <= 5) {
      submitEnable.style.display = "block";
    } else {
      submitEnable.style.display = "none";
    }
  }
  else if(selectedIndex == 15||selectedIndex == 16||selectedIndex == 17||selectedIndex == 18)
  {
    if (countMembers <= 2) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if (selectedIndex == 19) {
    if (countMembers <= 3) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if (selectedIndex == 20) {
    if (countMembers <= 5) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if (selectedIndex == 21||selectedIndex == 22||selectedIndex == 23||selectedIndex == 24) {
    if (countMembers <= 3) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if (selectedIndex == 25) {
    if (countMembers <= 3&&gender==1) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
  else if (selectedIndex == 26) {
    if (countMembers <= 5) {
        submitEnable.style.display = "block";
      } else {
        submitEnable.style.display = "none";
      }
  }
}

addButton.addEventListener("click", addNewMember);
