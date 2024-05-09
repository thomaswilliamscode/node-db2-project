// DO YOUR MAGIC
const express = require('express')
const Cars = require('./cars-model')
const Middle = require('./cars-middleware')

const router = express.Router()

router.get('/', async (req, res) => {
	let info = await Cars.getAll()
	res.status(200).json(info)
})

router.get('/:id', Middle.checkCarId, async (req, res) => {
	res.status(200).json(req.car)
})

router.post('/', Middle.checkCarPayload, Middle.checkVinNumberValid, Middle.checkVinNumberUnique, async (req, res) => {
	const info = req.body
	let createdId = await Cars.create(info)
	const createdCar = await Cars.getById(createdId[0])
	res.status(201).json(createdCar[0])
})

router.use( (err, req, res, next) => {
	res.status( err.status || 500 ).json({
		customMessage: 'Something terrible inside cars router',
		message: err.message,
		stack: err.stack
	})
})

module.exports = router
