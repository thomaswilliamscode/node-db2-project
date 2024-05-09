const db = require('../../data/db-config')



const getAll = () => {
  // DO YOUR MAGIC
  return db('car_info')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('car_info').where('car_id', id)
}

const create = (info) => {
  // DO YOUR MAGIC
  return db('car_info').insert(info)
}

module.exports = {
	getAll,
	getById,
	create
};
