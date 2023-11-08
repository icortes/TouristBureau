'use strict';

/**
 * Fills categories select element with categories array.
 * @param {HTMLElement} activityCategory
 */
function fillActivityCategories(activityCategory) {
  //for each item in categories append to activity category dropdown
  categories.forEach((category) => {
    activityCategory.appendChild(new Option(category, category));
  });
}

/**
 * Listens for change event in activityCategory and fill activities
 * dropdown with activities with same category property.
 * @param {HTMLElement} activityCategory
 * @param {HTMLElement} activityNameGroup
 * @param {HTMLElement} activityName
 * @param {HTMLElement} activityFooter
 */
function showActivitiesAndFill(
  activityCategory,
  activityNameGroup,
  activityName,
  activityFooter
) {
  // get value of selected category
  let selectedCategory = activityCategory.value;
  // change event listener for category dropdown
  activityCategory.addEventListener('change', () => {
    // get new value of selected category
    selectedCategory = activityCategory.value;
    console.log(`Activity Category Selected: ${activityCategory.value}`);
    // hide element whenever new category is selected
    hideElement(activityFooter);
    // if selected category has a value
    if (selectedCategory != '') {
      // show activity category
      showElement(activityNameGroup);
      // fill the activity dropdown with activity with same category property
      fillBasedOnCategory(selectedCategory, activityName);
    } else {
      //if selected category has no value hide the activity dropdown
      hideElement(activityNameGroup);
    }
  });
}

/**
 * Filters activities array and appends activities equal to the selected category.
 * @param {string} selectedCategory
 * @param {HTMLElement} activityName
 */
function fillBasedOnCategory(selectedCategory, activityName) {
  // every time activity dropdown fills, reset the children to only one option element
  activityName.innerHTML = `<option value="" selected>Select One...</option>`;
  // filter activities's categories that are equal to the selected category and return to new array
  let filteredActivities = activities.filter((activity) => {
    //condition to filter array
    return activity.category == selectedCategory;
  });
  // for every item in the array
  filteredActivities.forEach((activity) => {
    // append new option element with activity name and id to activity dropdown
    activityName.appendChild(new Option(activity.name, activity.id));
  });
}
/**
 * When the user selects an activity, details of that activity (id, name, description, location, price,
 *will be displayed on the page. If the price is more than $0.00, the page will also display a
 *form with fields that can be used to buy an e-ticket.
 * @param {HTMLElement} activityName
 * @param {HTMLElement} activityFooter
 */
function showSelectedActivityAndPaymentForm(activityName, activityFooter) {
  // activity id
  let activityId = activityName.value;
  // empty object for selected activity
  let selectedActivity = {};
  // change event listener for activity dropdown
  // whenever user selects new activity
  activityName.addEventListener('change', () => {
    // get new activity id
    activityId = activityName.value;
    console.log(`Activity Selected: ${activityId}`);
    // if activity is not empty
    if (activityId != '') {
      // show information about activity
      showElement(activityFooter);
      // fill the card and return selected activity object
      selectedActivity = fillCard(activityId);
      console.log(`Selected Activity Name: ${selectedActivity.name}`);
      //display payment if price is > 0
      if (selectedActivity.price > 0) {
        console.log(`Price: $${selectedActivity.price}`);
        // hide confirmation element with confirmation text
        hideElement(document.getElementById('confirmation'));
        // display payment form and handle form submit
        displayPaymentForm(selectedActivity.price, selectedActivity.name);
      } else {
        // if payment is 0 hide the payment form
        hideElement(document.getElementById('payment-form'));
      }
    } else {
      // hide activity information if no activity is selected
      hideElement(activityFooter);
    }
  });
}
/**
 * Fills card content with selected activity information
 * @param {string} activity
 * @returns selected activity object
 */
function fillCard(activityId) {
  // filter activities and return activity equal to activity id
  let selectedActivity = activities.filter((item) => {
    return activityId == item.id;
  })[0];

  //get card elements and fill them with activity information
  document.getElementById('card-name').textContent = selectedActivity.name;
  document.getElementById('card-id').textContent = selectedActivity.id;
  document.getElementById('card-title').textContent = selectedActivity.category;
  document.getElementById('card-location').textContent = selectedActivity.location;
  document.getElementById('card-price').textContent = `$${selectedActivity.price}`;
  document.getElementById('card-description').textContent = selectedActivity.description;

  //return activity object
  return selectedActivity;
}
/**
 * Displays payment form and handles onSubmit event
 * @param {number} activityPrice
 * @param {string} activityName
 */
function displayPaymentForm(activityPrice, activityName) {
  let paymentForm = document.getElementById('payment-form');
  // shoes payment form
  showElement(paymentForm);
  // submit event listener on form
  paymentForm.addEventListener('submit', (event) => {
    //prevent page from reloading
    event.preventDefault();
    //get form values from DOM
    const numberTickets = +document.getElementById('number-tickets').value;
    const email = document.getElementById('email').value;
    // show confirmation message for buying tickets
    showElement(document.getElementById('confirmation'));
    // show message to DOM
    document.getElementById(
      'confirmation-text'
    ).textContent = `Your credit card has been charged $${
      activityPrice * numberTickets
    } for ${numberTickets} to
${activityName}. A confirmation email has been sent to ${email}.
`;
  });
}

/**
 * Hides element in DOM adding bootstrap class 'd-none'
 * @param {HTMLElement} element
 */
function hideElement(element) {
  element.classList.add('d-none');
}
/**
 * Shows element in DOM by removing bootstrap class 'd-none'
 * @param {HTMLElement} element
 */
function showElement(element) {
  element.classList.remove('d-none');
}

//run this code on page load
onload = () => {
  let activityCategory = document.getElementById('activityCategory');
  let activityNameGroup = document.getElementById('activityNameGroup');
  let activityName = document.getElementById('activityName');
  let activityFooter = document.getElementById('activity-footer');

  fillActivityCategories(activityCategory);
  showActivitiesAndFill(
    activityCategory,
    activityNameGroup,
    activityName,
    activityFooter
  );
  showSelectedActivityAndPaymentForm(activityName, activityFooter);
};
