
class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=e7b29eec4165f2e5d74a215090ea7d9c';
    
	getResource = async (url) => {
		let res = await fetch(url);

		if(!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}


	getAllCharacters = async () => {
		const res = await this.getResource(`${this._apiBase}characters?orderBy=-name&limit=9&offset=210&${this._apiKey}`);
		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	}
    

	// sizeImg = char.thumbnail.path.slice(-13, -10) === 'not' ? style = {object-fit : 'contain'}

	_transformCharacter = (char) => {

		return {
			id: char.id,
			name: char.name,
			description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}
}

export default MarvelService;