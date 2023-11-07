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
    console.log(`Activity Category Selected: ${activityCategory.value}`);
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

function showSelectedActivityAndPaymentForm(activityName, activityFooter) {
  let activity = activityName.value;
  activityName.addEventListener('change', () => {
    activity = activityName.value;
    console.log(`Activity Selected: ${activity}`);
    if (activity != '') {
      activityFooter.classList.remove('d-none');
    } else {
      activityFooter.classList.add('d-none');
    }
  });
}

onload = () => {
  let activityCategory = document.getElementById('activityCategory');
  let activityNameGroup = document.getElementById('activityNameGroup');
  let activityName = document.getElementById('activityName');
  let activityFooter = document.getElementById('activity-footer');

  fillActivityCategories(activityCategory);
  showActivitiesAndFill(activityCategory, activityNameGroup, activityName);
  showSelectedActivityAndPaymentForm(activityName, activityFooter);
};
