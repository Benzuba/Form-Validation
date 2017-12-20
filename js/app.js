
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-title');
const designs = document.getElementById('design');
const checkbox = document.querySelectorAll('input[type="checkbox"]');
const activities = document.querySelector('.activities');
let total = document.querySelector('.total');
let sum = 0;
const colorOptions = document.getElementById('color');
const submit =document.getElementById("submit");
colorOptions.style.display = "none";
$('#paypal').hide();
$('#bitcoin').hide();


activities.addEventListener('change', (e) => {
  if (e.target.checked) {
    let price = parseInt(e.target.value);
    sum += price;
    total.textContent = ('Total = $' + sum);
    return total;
// if already checked box is being "unchecked" subtract "value" from total
  } else {
    let price = parseInt(e.target.value);
    sum -= price;
    total.textContent = ('Total = $' + sum);
  }
});


// hide input for other job
otherJobRole.style.display = "none";

// check to see if "other" is selected in Job Role Drop down if true show other job input box
jobRole.addEventListener('change', (e) => {
  const selectedRole = e.target.value;
  if (selectedRole === 'other'){
    otherJobRole.style.display = '';
  } else {
    otherJobRole.style.display = 'none';
  }
});

// listen for change on the the dropdown list
designs.addEventListener('change', (e) => {
  // store "value" of theme that is selected
  const theme = e.target.value;
  console.log(theme);
  if (theme === 'js puns'){
    for (let i = 0;  i < colorOptions.length; i ++){
      if (colorOptions[i].className === 'JS_puns'){
        colorOptions[i].style.display = '';
      }else {
        colorOptions[i].style.display = 'none';
      }
    }
  } else if (theme === 'heart js'){
    for (let i = 0; i < colorOptions.length; i ++){
      if (colorOptions[i].className === 'heart'){
        colorOptions[i].style.display = '';
      }else {
        colorOptions[i].style.display = 'none';
      }
    }
  }
  colorOptions.style.display = "";
});

// classes assigned conflicting groups "group 1" "group 2"
// check status of checkboxes, if one of conflicting is checked disable other

$('.group1').change(() => {
    if ($('input[name="js-frameworks"]').prop('checked')) {
        $('input[name="express"]').attr('disabled', 'true');
        $('input[name="express"]').parent().css('color', 'grey');
    } else if ($('input[name="express"]').prop('checked')) {
        $('input[name="js-frameworks"]').attr('disabled', 'true');
        $('input[name="js-frameworks"]').parent().css('color', 'grey');
    } else {
        $('input[name="js-frameworks"]').removeAttr('disabled');
        $('input[name="js-frameworks"]').parent().css('color', 'black');
        $('input[name="express"]').removeAttr('disabled');
        $('input[name="express"]').parent().css('color', 'black');
    }
});

$('.group2').change(() => {
    if ($('input[name="js-libs"]').prop('checked')) {
        $('input[name="node"]').attr('disabled', 'true');
        $('input[name="node"]').parent().css('color', 'grey');
    } else if ($('input[name="node"]').prop('checked')) {
        $('input[name="js-libs"]').attr('disabled', 'true');
        $('input[name="js-libs"]').parent().css('color', 'grey');
    } else {
        $('input[name="js-libs"]').removeAttr('disabled');
        $('input[name="js-libs"]').parent().css('color', 'black');
        $('input[name="node"]').removeAttr('disabled');
        $('input[name="node"]').parent().css('color', 'black');
    }
});

//monitors changes in "payment drop down menu"
//shows only payment chosen instructions
  $('#payment').change(() => {
    if ($('#payment').val() === 'paypal') {
      $('#credit-card').hide();
      $('#bitcoin').hide();
      $('#paypal').show();
    }
  });

  $('#payment').change(() => {
    if ($('#payment').val() === 'credit card') {
      $('#credit-card').show();
      $('#bitcoin').hide();
      $('#paypal').hide();
    }
  });

  $('#payment').change(() => {
    if ($('#payment').val() === 'bitcoin') {
      $('#credit-card').hide();
      $('#bitcoin').show();
      $('#paypal').hide();
    }
  });


// listen for submit button, on click run all validations, check validitions if any of them
// return true prevent button from submiting and return to top of page
submit.addEventListener('click', (e) =>{
  valName();
  valEmail();
  valActivities();
  valCC();
  valZip();
  valCVV();
  if (valName() || (valEmail()) || (valActivities()) || (valCC()) || (valZip()) || (valCVV())){
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  }
});


  //valide Name filed to make sure it isnt blank
  function valName () {
    let nameInput = document.getElementById("name");
    let nameLabel = document.getElementById("nameLabel");
    if (nameInput.value.length === 0){
      nameLabel.innerText = "Name: Must Enter A Valid Name";
      nameLabel.style.color = 'red';
      nameLabel.style.background = 'black';
      return true;
    } else {
      nameLabel.innerText = "Name:";
      nameLabel.style.color = 'black';
      nameLabel.style.background = '';
    }
  }

//validate email address us standard regression
  function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
  }



  function valEmail () {
    let emailInput = document.getElementById("mail");
    let emailLabel = document.getElementById("mailLabel")
    if (!validateEmail(emailInput.value)){
      emailLabel.innerText = "Email: Must Enter A Valid Email Address";
      emailLabel.style.color = 'red';
      emailLabel.style.background = 'black';
      return true;
    }else {
      emailLabel.innerText = "Email:";
      emailLabel.style.color = 'black';
      emailLabel.style.background = '';
    }
  }

//validate that at least 1 activites has been selected
//by looping through the check boxes and using "checked" as a counter
//to see if at least 1 box is checked
  function valActivities () {
    checked = 0;
    let activitiesText = document.getElementById("activites");
    for (let i = 0; i < checkbox.length; i ++){
      if(checkbox[i].checked){
        checked += 1;
      }
    }
      if (checked === 0){
          activitiesText.innerText = "Register for Activites: You Must Select At Least One";
          activitiesText.style.color = 'red';
          activitiesText.style.background = 'black';
          return true
      } else {
        activitiesText.innerText = "Register for Activites";
        activitiesText.style.color = 'black';
        activitiesText.style.background = '';
      }
    }

  function valCC () {
//initial if statemnt only attempts to validate CVV is paying with Credit Card
    if ($('#payment').val() === 'credit card' || $('#payment').val() === 'select_method'){
      let ccInput = document.getElementById("cc-num");
      let ccLabel = document.getElementById("ccLabel");
      if ((ccInput.value.length) < 13 || (ccInput.value.length) > 16){
        ccLabel.innerText = "Card Number: Must Enter Valid CC";
        ccLabel.style.color = 'red';
        ccLabel.style.background = 'black';
        return true;
      } else {
        ccLabel.innerText = "Card Number:";
        ccLabel.style.color = 'black';
        ccLabel.style.background = '';
      }
    }
  }

  function valZip () {
    //initial if statemnt only attempts to validate CVV is paying with Credit Card
    if ($('#payment').val() === 'credit card' || $('#payment').val() === 'select_method'){
      let zipInput = document.getElementById("zip");
      let zipLabel = document.getElementById("zipLabel");
      if ((zipInput.value.length) != 5){
        zipLabel.innerText = "Zip Code: 5 digits";
        zipLabel.style.color = 'red';
        zipLabel.style.background = 'black';
        return true;
      } else {
        zipLabel.innerText = "Zip Code:";
        zipLabel.style.color = 'black';
        zipLabel.style.background = '';
      }
    }
  }

  function valCVV () {
    //initial if statemnt only attempts to validate CVV is paying with Credit Card
    if ($('#payment').val() === 'credit card' || $('#payment').val() === 'select_method'){
      let cvvInput = document.getElementById("cvv");
      let cvvLabel = document.getElementById("cvvLabel");
      if ((cvvInput.value.length) != 3){
        cvvLabel.innerText = "CVV: 3 Digits";
        cvvLabel.style.color = 'red';
        cvvLabel.style.background = 'black';
        return true;
      } else {
        cvvLabel.innerText = "CVV:";
        cvvLabel.style.color = 'black';
        cvvLabel.style.background = '';
        }
    }
  }
