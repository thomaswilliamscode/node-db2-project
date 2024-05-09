// STRETCH
exports.seed = async function (knex) {
	await knex('car_info').truncate()
	await knex('car_info').insert([
		{
			vin: '896754',
			make: 'Honda',
			model: 'xrc',
			mileage: 128000,
			title: 'title here',
			transmission: 'manual',
		},
		{
			vin: '678546',
			make: 'Ford',
			model: 'F-150',
			mileage: 69000,
			transmission: 'automatic',
		},
		{
			vin: 'h7d5g24',
			make: 'Chevy',
			model: 'bigDawg',
			mileage: 180000,
		},
	]);
}