const jokesCategories = document.getElementById('jokesCategories');
const jokesList = document.getElementById('jokesList');

function populateCategories(categories) {
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    jokesCategories.appendChild(option);
  });
}

async function fetchJoke(category) {
  try {
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
    const data = await response.json();

    const listItem = document.createElement('li');
    const categoryText = document.createElement('p');
    const jokeText = document.createElement('p');
    const removeButton = document.createElement('button');

    categoryText.innerHTML = `<b>${category}</b>`;
    jokeText.textContent = data.value;
    removeButton.textContent = 'Remove joke';

    listItem.appendChild(categoryText);
    listItem.appendChild(jokeText);
    listItem.appendChild(removeButton);

    jokesList.appendChild(listItem);

    const selectedOption = jokesCategories.querySelector(`option[value="${category}"]`);
    selectedOption.disabled = true;

    removeButton.addEventListener('click', () => {
      jokesList.removeChild(listItem);
      selectedOption.disabled = false;
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

fetch('https://api.chucknorris.io/jokes/categories')
  .then(response => response.json())
  .then(categories => {
    populateCategories(categories);

    jokesCategories.addEventListener('change', () => {
      const selectedCategory = jokesCategories.value;
      jokesList.innerHTML = '';
      fetchJoke(selectedCategory);
    });
  })
  .catch(error => console.error('Error:', error));
