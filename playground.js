const { User } = require('./models')

// CREATE, READ, UPDATE, DELETE

//CREATE
makeUser = async (firstName, lastName, age, email) => {
	try {
		const newUser = await User.create({ firstName, lastName, age, email })
		let user = newUser.toJSON() // only log the 1 object we wanted
		console.log(user.firstName)
	} catch (error) {
		console.log(error)
	}
}

// makeUser('Nicholas Tran', 33, 'nick.tran@ga.com')
async function findOrCreateUser(name, age, email) {
	try {
		const [user, created] = await User.findOrCreate({
			where: { name },
			defaults: { age, email }
		})
		console.log('USER:', user) // return an object
		console.log('WAS CREATED:', created) // boolean (true/false)
	} catch (error) {
		console.log(error)
	}
}

// findOrCreateUser('Cal Clemmer', 24, 'cal@email.com')
// findOrCreateUser('Nicholas Tran', 33, 'nick.tran@ga.com')

async function fetchAllUsers() {
	try {
		const allUsers = await User.findAll({})
		console.log('ALL USERS:', allUsers)

		const parseUser = allUsers.map((u) => u.toJSON())
		console.log(parseUser)
	} catch (err) {
		console.log(err)
	}
}
// fetchAllUsers()

async function fetchUserByName(name) {
	try {
		const foundUser = await User.findOne({
			where: { name }
		})
		console.log(foundUser)
	} catch (error) {
		console.log(error)
	}
}
// fetchUserByName('Nicholas Tran')

//UPDATE

updateUser = async (firstName, lastName, email, age) => {
	try {
		const [numberOfRowsUpdate] = await User.update(
			{ email, age },
			{
				where: { firstName, lastName }
			}
		)
		console.log(numberOfRowsUpdate)
	} catch (error) {
		console.log(error)
	}
}
// updateUser('Nicholas', 'Tran', 'Nick@email.com', 44)

deleteUser = async (email) => {
	try {
		let deleteUserData = await User.destroy({
			where: { email }
		})
	} catch (error) {
		console.log(error)
	}
}
deleteUser('cal@email.com')
