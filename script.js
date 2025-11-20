// Get DOM elements
const mealName = document.getElementById("mealName");
const mealCost = document.getElementById("mealCost");
const addMealBtn = document.getElementById("addMeal");
const mealList = document.getElementById("mealList");
const totalCostEl = document.getElementById("totalCost");
const generatePlanBtn = document.getElementById("generatePlan");
const weeklyPlan = document.getElementById("weeklyPlan");
const costFilter = document.getElementById("costFilter");
const applyFilterBtn = document.getElementById("applyFilter");
const feedback = document.getElementById("feedback");

// Load meals from localStorage
let meals = JSON.parse(localStorage.getItem("meals")) || [];

// Function to render meals
function renderMeals(filter = null) {
    mealList.innerHTML = "";
    let total = 0;

    meals.forEach((meal, index) => {
        if (filter !== null && meal.cost > filter) return; // skip filtered out meals
        total += meal.cost;

        const li = document.createElement("li");
        li.innerHTML = `
            ${meal.name} - KES ${meal.cost}
            <span class="delete" onclick="deleteMeal(${index})">❌</span>
        `;
        mealList.appendChild(li);
    });

    totalCostEl.innerText = `KES ${total}`;
}

// Add meal
addMealBtn.addEventListener("click", () => {
    const name = mealName.value.trim();
    const cost = parseFloat(mealCost.value);

    if (!name || isNaN(cost) || cost <= 0) {
        feedback.innerText = "Please enter valid meal name and cost!";
        feedback.style.color = "red";
        setTimeout(() => feedback.innerText = "", 3000);
        return;
    }

    meals.push({ name, cost });
    localStorage.setItem("meals", JSON.stringify(meals));

    mealName.value = "";
    mealCost.value = "";

    renderMeals();
});

// Delete meal
window.deleteMeal = function(index) {
    meals.splice(index, 1);
    localStorage.setItem("meals", JSON.stringify(meals));
    renderMeals();
};

// Filter meals
applyFilterBtn.addEventListener("click", () => {
    const maxCost = parseFloat(costFilter.value);
    if (isNaN(maxCost)) {
        renderMeals();
    } else {
        renderMeals(maxCost);
    }
});

// Generate weekly plan
generatePlanBtn.addEventListener("click", () => {
    if (meals.length === 0) {
        alert("Add some meals first!");
        return;
    }

    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    weeklyPlan.innerHTML = "";
    weeklyPlan.style.display = "block";

    days.forEach(day => {
        const randomMeal = meals[Math.floor(Math.random() * meals.length)];

        const div = document.createElement("div");
        div.classList.add("weekly-item");
        div.innerHTML = `<strong>${day}:</strong> ${randomMeal.name} (KES ${randomMeal.cost})`;

        weeklyPlan.appendChild(div);
    });
});

