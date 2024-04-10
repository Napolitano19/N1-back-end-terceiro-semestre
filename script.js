// Função para buscar detalhes do filme e locais de filmagem
async function searchMovie() {
    // Obtém o título do filme digitado pelo usuário
    const movieTitle = document.getElementById("header__container__input-pesquisa").value;
    let teste = document.getElementById("header__container__input-pesquisa")
    teste.value = ''
    // Chave de API do OMDb
    const omdbApiKey = "2d83b506";
    
    // Chave de API do Unsplash
    const unsplashApiKey = "8PGPkNE_XE3YBAtrkV7HQf7aPEXXXKeGu5X1tNEedg8";

    try {
        // Busca detalhes do filme na API do OMDb
        const omdbResponse = await fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=${omdbApiKey}`);
        const searchData = await omdbResponse.json();

        // Verifica se a pesquisa retornou resultados
        if (!searchData || searchData.Response === "False") {
            throw new Error("Filmes não encontrados");
        }
        

        // Limpa o resultado anterior
        const resultContainer = document.getElementById("resposta__api");
        resultContainer.innerHTML = "";
        
        // Itera sobre os resultados da pesquisa
        for (const movie of searchData.Search) {
            const imdbID = movie.imdbID;
            const movieResponse = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}`);
            const movieData = await movieResponse.json();
            console.log(movieData)
            // Exibe os detalhes do filme
            const movieDiv = document.createElement("div");
            movieDiv.innerHTML = `
            <div class="Teste">
                <div class="Teste__Lado-esquerdo">
                    <h2>${movie.Title}</h2>
                    <div class="Teste__linha">
                        <h3>Lançamento:</h3> <p>${movieData.Released}</p>
                    </div>
                    <div class="Teste__linha">
                        <h3>Gênero:</h3> <p>${movieData.Genre}</p>
                    </div>
                    <div class="Teste__linha">
                        <h3>Enredo:</h3> <p>${movieData.Plot}</p>
                    </div>
                    
                </div>
                <div class="Teste__Lado-direito">
                <div class="Teste__lado-direito__container-img" id="image-container-${imdbID}"></div>
                </div>
            </div>
            `;
            resultContainer.appendChild(movieDiv);

            // Busca imagens dos locais de filmagem (supondo que a Unsplash tenha imagens desses locais)
            const countries = movieData.Country.split(',').map(country => country.trim());
            for (const country of countries) {
                try {
                    const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
                    const countryData = await countryResponse.json();
                    const countryName = countryData[0].name.common;
                    const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?query=${countryName}&client_id=${unsplashApiKey}`);
                    const unsplashData = await unsplashResponse.json();
                    const imageContainer = document.getElementById(`image-container-${imdbID}`);
                    if (unsplashData.results.length > 0) {
                        const imageDiv = document.createElement("div");
                        imageDiv.classList.add("image-div");
                        imageDiv.innerHTML = `
                            <h3>${countryName}</h3>
                            <img src="${unsplashData.results[0].urls.regular}" alt="${countryName}">
                        `;
                        imageContainer.appendChild(imageDiv);
                    } else {
                        console.log(`Imagem para ${countryName} não encontrada`);
                    }
                } catch (error) {
                    console.error(`Erro ao buscar imagens para ${country}:`, error);
                }
            }
        }
    } catch (error) {
        // Exibe mensagens de erro no console em caso de falha na busca
        console.error("Erro:", error);
    }
    
}