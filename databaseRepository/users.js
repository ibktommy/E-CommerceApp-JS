// Requiring File System module
const fs = require('fs')

// Requiring Crypto Library
const crypto = require('crypto')
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

  // METHOD TO GET CONTENT OF USER-DATA JSON FILE
  // Accessing the Repository Data File and Returning it
  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.filename, {
      encoding: 'utf8'
    }))
  }

  // METHOD TO ADD CONTENT IN THE USER-DATA JSON FILE
  async create(attributes) {
    // Adding a Random ID to each content created
    attributes.id = this.randomID()
    // Get existing list of users of in user-data file
    const records = await this.getAll()

    // Push/Append "atrributes" to the end of Records Array
    records.push(attributes)

    // Write the Updated 'records' array back to this.filename
    await this.writeAll(records)
  }

  // METHOD TO WRITE CONTENT INTO THE USER-DATA FILE
  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))
  }

  // METHOD TO CREATE A RANDOM ID
  randomID() {
    return crypto.randomBytes(4).toString('hex')
  }

  // METHOD TO GET ONE ID FROM USER-DATA FILE
  async getOne(id) {
    const records = await this.getAll()
    return records.find(record => record.id === id)
  }

  // METHOD TO DELETE A SPECIFIED USER BASED ON THE ID
  async delete(id) {
    const records = await this.getAll()
    const filteredRecords = records.filter(record => record.id !== id)
    this.writeAll(filteredRecords)
  }

}

// Creating an Instance of User Repository
const test = async () => {
  const repo = new UsersRepository('users.json')

  await repo.delete('7ffedb5c')
}

test()
