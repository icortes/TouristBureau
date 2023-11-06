'use strict';

function fillActivityCategories(activityCategory) {
  categories.forEach((category) => {
    activityCategory.appendChild(new Option(category, category));
  });
}

function showActivitiesAndFill(activityCategory, activityNameGroup, activityName) {
  let selectedActivity = activityCategory.value;
  activityCategory.addEventListener('change', () => {
    selectedActivity = activityCategory.value;
    console.log(`Activity Selected: ${activityCategory.value}`);
    if (selectedActivity != '') {
      activityNameGroup.classList.remove('d-none');
      fillBasedOnCategory(selectedActivity, activityName);
    } else {
      activityNameGroup.classList.add('d-none');
    }
  });
}

function fillBasedOnCategory(selectedActivity, activityName) {
  activityName.innerHTML = `<option value="" selected>Select One...</option>`;
  let filteredActivities = activities.filter((activity) => {
    return activity.category == selectedActivity;
  });
  filteredActivities.forEach((activity) => {
    activityName.appendChild(new Option(activity.name, activity.id));
  });
}

function showSelectedActivityAndPaymentForm(){
  
}

onload = () => {
  let activityCategory = document.getElementById('activityCategory');
  let activityNameGroup = document.getElementById('activityNameGroup');
  let activityName = document.getElementById('activityName');

  fillActivityCategories(activityCategory);
  showActivitiesAndFill(activityCategory, activityNameGroup, activityName);
  showSelectedActivityAndPaymentForm();
};
