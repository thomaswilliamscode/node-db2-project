const Cars = require('./cars-model')
const vinValidator = require('vin-validator')
const db = require('../../data/db-config')


const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  const car = await Cars.getById(id)
  let length = car.length
  if (length > 0) {
    req.car = car[0]
    next()
  } else {
    res.status(404).json({message: 'no car with that id exists'})
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // vin, make, model, mileage
  const { vin, make, model, mileage } = req.body 
  if (vin && make && model && mileage ) {
    next()
  } else {
    let missing; 
    if (!vin) {
      missing = 'vin'
    } else if(!make) {
      missing = 'make'
    } else if (!model) {
      missing = 'model'
    } else {
      missing = 'mileage'
    }
    res.status(400).json({message: `${missing} is missing`})
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const isValid = vinValidator.validate(req.body.vin)
  if(isValid) {
    next()
  } else {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body
  const isTaken = await db('cars').where('vin', vin)
  const length = isTaken.length
  if (length > 0) {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` });
  } else {
    next()
  }
}

module.exports = {
	checkCarId,
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
};
