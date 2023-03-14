fetch("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=835363c661e46bff1d1636adbea274c0&hash=dd899fadbaa137caa829b2bb40d975f6")
  .then(response => response.json())
  .then(result => createHtml(result));

  function createHtml(result) {
    const container = document.querySelector('#container');
    const heroDescriptions = {};

    result.data.results.forEach(hero => {
      const option = document.createElement('option');
      option.value = hero.id;
      option.text = hero.name;
      container.appendChild(option);

      heroDescriptions[hero.id] = hero.description;
    });

    container.addEventListener('change', () => {
      const selectedId = container.value;
      const selectedHeroDescription = heroDescriptions[selectedId];

      const heroName = document.querySelector('.hero-description h2');
      heroName.innerText = container.options[container.selectedIndex].text;

      const heroDescription = document.querySelector('.hero-description p');
      heroDescription.innerText = selectedHeroDescription;

      const heroImage = document.querySelector('.hero-image img');
      heroImage.src = `${result.data.results[container.selectedIndex].thumbnail.path}.${result.data.results[container.selectedIndex].thumbnail.extension}`;
    });
  }


