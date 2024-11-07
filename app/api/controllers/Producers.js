import ProducerService from "../services/Producer.js";

const ProducersControllers = {
	getMinMaxAwardsInterval(req, res) {
		ProducerService.getMinMaxAwardsInterval()
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).json({ error: err.message }))
	}
}

export default ProducersControllers;
