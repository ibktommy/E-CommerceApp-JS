// Requiring File System module
const fs = require('fs')
// Creating a single class that will be responsible for data access
class UsersRepository {
  constructor(filename) {
    // Condition to check if we have a filename when we create an intance of our Repository
    if (!filename) {
      throw new Error('Creating A Repository ')
    }

    this.filename = filename
    try {
      fs.accessSync(this.filename)
    } catch (error) {
      // If file doesnt exist, create file
      fs.writeFileSync(this.filename, '[]')
    }

  }

  // Accessing the Repository Data File
  async getAll() {
    // Open the file - "this.filename"
    const contents = await fs.promises.readFile(this.filename, { encoding: 'utf8' })

    // Read the File Contents
    console.log(contents)
  }

}

// Creating an Instance of User Repository
const test = async () => {
  const repo = new UsersRepository('users.json')

  await repo.getAll()
}

test()
