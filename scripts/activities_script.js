'use strict';

function fillActivityCategories(activityCategory) {
  categories.forEach((category) => {
    activityCategory.appendChild(new Option(category, category));
  });
}

function showActivitiesAndFill(
  activityCategory,
  activityNameGroup,
  activityName,
  activityFooter
) {
  let selectedCategory = activityCategory.value;
  activityCategory.addEventListener('change', () => {
    selectedCategory = activityCategory.value;
    console.log(`Activity Category Selected: ${activityCategory.value}`);
    activityFooter.classList.add('d-none');
    if (selectedCategory != '') {
      activityNameGroup.classList.remove('d-none');
      fillBasedOnCategory(selectedCategory, activityName);
    } else {
      activityNameGroup.classList.add('d-none');
    }
  });
}

function fillBasedOnCategory(selectedCategory, activityName) {
  activityName.innerHTML = `<option value="" selected>Select One...</option>`;
  let filteredActivities = activities.filter((activity) => {
    return activity.category == selectedCategory;
  });
  filteredActivities.forEach((activity) => {
    activityName.appendChild(new Option(activity.name, activity.id));
  });
}

function showSelectedActivityAndPaymentForm(activityName, activityFooter) {
  let activityId = activityName.value;
  let selectedActivity = {};
  activityName.addEventListener('change', () => {
    activityId = activityName.value;
    console.log(`Activity Selected: ${activityId}`);
    if (activityId != '') {
      activityFooter.classList.remove('d-none');
      selectedActivity = fillCard(activityId);
      //display payment if price is > 0
      console.log(`Selected Activity Name: ${selectedActivity.name}`);
      if (selectedActivity.price > 0) {
        console.log(`Price: $${selectedActivity.price}`);
        displayPaymentForm();
      }
    } else {
      activityFooter.classList.add('d-none');
    }
  });
}
/**
 * Fills card content with selected activity information
 * @param {string} activity
 * @returns selected activity object
 */
function fillCard(activity) {
  let selectedActivityArray = activities.filter((item) => {
    return activity == item.id;
  });

  let selectedActivityObj = selectedActivityArray[0];

  //get card elements
  document.getElementById('card-name').textContent = selectedActivityObj.name;
  document.getElementById('card-id').textContent = selectedActivityObj.id;
  document.getElementById('card-title').textContent = selectedActivityObj.category;
  document.getElementById('card-location').textContent = selectedActivityObj.location;
  document.getElementById('card-price').textContent = `$${selectedActivityObj.price}`;
  document.getElementById('card-description').textContent =
    selectedActivityObj.description;

  return selectedActivityObj;
}

function displayPaymentForm() {
  
}

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
