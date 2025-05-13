// main.js

window.addEventListener("DOMContentLoaded", init);

function init() {
	let recipes = getRecipesFromStorage();
	addRecipesToDocument(recipes);
	initFormHandler();
}

function getRecipesFromStorage() {
	const stored = localStorage.getItem('recipes');
	return stored ? JSON.parse(stored) : [];
}

function addRecipesToDocument(recipes) {
	const main = document.querySelector('main');
	for (const recipe of recipes) {
		const recipeCard = document.createElement('recipe-card');
		recipeCard.data = recipe;
		main.appendChild(recipeCard);
	}
}

function saveRecipesToStorage(recipes) {
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

function initFormHandler() {
	const form = document.getElementById('new-recipe');

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const formData = new FormData(form);
		const recipeObject = {};
		for (const [key, value] of formData.entries()) {
			recipeObject[key] = value;
		}

		const recipeCard = document.createElement('recipe-card');
		recipeCard.data = recipeObject;

		const main = document.querySelector('main');
		main.appendChild(recipeCard);

		const recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);

		form.reset();
	});

	const clearButton = document.querySelector('button.danger');
	clearButton.addEventListener('click', () => {
		localStorage.clear();
		const main = document.querySelector('main');
		main.innerHTML = '';
	});
}