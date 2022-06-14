// Requiring File System module
const fs = require('fs')

// Requiring Crypto Library
const crypto = require('crypto')

// Requiring Util Library
const utils = require('util')

// Using the utils Library to create a functon that returns a promise
const scrypt = utils.promisify(crypto.scrypt)

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

    // Creating Random Salt keys
    const salt = crypto.randomBytes(8).toString('hex')

    // Using crypto-scrypt to hash the user password
    const buffer = await scrypt(attributes.password, salt, 64)

    // Get existing list of users of in user-data file
    const records = await this.getAll()

    // Push/Append "atrributes" to the end of Records Array
    const record = {
      ...attributes, password: `${buffer.toString('hex')}.${salt}`

    }
    records.push(record)

    // Write the Updated 'records' array back to this.filename
    await this.writeAll(records)

    // Return the Atrributes Object created
    return record
  }

  // Comparing Password in the Database to Password given by user when logging In
  async comparePasswords(savedPass, suppliedPass) {
    const [hashed, salt] = savedPass.split('.')
    const hashedSuppliedBuffer = await scrypt(suppliedPass, salt, 64)

    return hashed === hashedSuppliedBuffer.toString('hex')
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

  // METHOD TO UPDATE THE CONTENTS OF A SPECIFIED USER BASED ON ID
  async update(id, attributes) {
    const records = await this.getAll()
    const record = records.find(record => record.id === id)

    // Condition to check if the selected ID-record is available
    if (!record) {
      throw new Error(`Record with the id ${id} does not exist`)
    }

    // Upadte the record selected content
    Object.assign(record, attributes)
    await this.writeAll(records)
  }

  // METHOD TO GET A USER-DATA BASED ON THE KEY-VALUE CONTENT
  async getOneByKeyValueContent(keyValueContent) {
    const records = await this.getAll()

    for (let record of records) {
      let found = true

      for (let key in keyValueContent) {
        if (record[key] !== keyValueContent[key]) {
          found = false
        }
      }

      if (found) {
        return record;
      }
    }
  }

}

// Exporting an Instance of the class UsersRepository
module.exports = new UsersRepository('users.json')
