document.addEventListener('DOMContentLoaded', () => {
  fetch("travel_recommendation_api.json")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const keyword = document.getElementById('searchbar');
      const search = document.getElementById('btnSearch');
      const clear = document.getElementById('clear');

      search.addEventListener('click', function() {
        const query = keyword.value.toLowerCase();
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ''; // Clear previous results
        const content = document.querySelector('.content');
        content.querySelector('h1').textContent = '';
        content.querySelector('p').textContent = '';
        content.querySelector('button').style.display = 'none';

        if (query === "countries"){
          data.countries.forEach(country => {
            country.cities.forEach(city => {
              const resultItem = document.createElement('div');
              resultItem.innerHTML = `<img src="${city.imageUrl}" alt="${city.name}"> <h3>${city.name}</h3> <p>${city.description}</p>`;
              resultsContainer.appendChild(resultItem);
            });
          });
        }
        else if (query === "temples"){
          data.temples.forEach(temple => {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<img src="${temple.imageUrl}" alt="${temple.name}"> <h3>${temple.name}</h3> <p>${temple.description}</p>`;
            resultsContainer.appendChild(resultItem);
          });
        }
        else if (query === "beaches"){
          data.beaches.forEach(beach => {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<img src="${beach.imageUrl}" alt="${beach.name}"> <h3>${beach.name}</h3> <p>${beach.description}</p>`;
            resultsContainer.appendChild(resultItem);
          });
        }
        else {
          alert("Entered incorrect destination!");
        }
      });

      clear.addEventListener('click', function() {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ''; // Clear previous results
      });
    })
    .catch(error => console.error('Fetch error:', error));
});
