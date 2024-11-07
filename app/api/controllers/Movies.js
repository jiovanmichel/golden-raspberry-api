import MovieService from "../services/Movie.js";

const MoviesControllers = {

	getAll(req, res) {
		MovieService.getAll()
			.then((movies) => res.status(200).json(movies))
			.catch((err) => res.status(500).json({ error: err.message }))
	},

	getById(req, res) {
		const { id } = req.params;

		MovieService.getById(id)
			.then((movie) => res.status(200).json(movie))
			.catch((err) => res.status(500).json({ error: err.message }))
	},

	create(req, res) {
		const { title, year, studios, producers, winner } = req.body;

		MovieService.create(title, year, studios, producers, winner)
			.then((response) => res.status(201).json({ id: response.lastID , title, year, studios, producers, winner }))
			.catch((err) => res.status(500).json({ error: err.message }))
	},

	update(req, res) {
		const { id } = req.params;
		const { title, year, studios, producers, winner } = req.body;

		MovieService.update(id, title, year, studios, producers, winner)
			.then(() => res.status(200).json({ id, title, year, studios, producers, winner }))
			.catch((err) => res.status(500).json({ error: err.message }))
	},

	patch(req, res) {
		const { id } = req.params;

		MovieService.patch(id, req.body)
			.then((movie) => res.status(200).json(movie))
			.catch((err) => res.status(500).json({ error: err.message }))
	},
	
	delete(req, res) {
		const { id } = req.params;

		MovieService.delete(id)
			.then(() => res.status(200).json(true))
			.catch((err) => res.status(500).json({ error: err.message }))
	},
}

export default MoviesControllers;
