// Requiring File System module
const fs = require('fs')

// Requiring Crypto Library
const crypto = require('crypto')

// Requiring Util Library
const utils = require('util')

// Requiring Repository-Class
const Repository = require('./repository')

// Using the utils Library to create a functon that returns a promise
const scrypt = utils.promisify(crypto.scrypt)

// Creating a single class that will be responsible for data access and manipulation
class UsersRepository extends Repository {
  // METHOD TO CREATE CONTENT IN THE USER-DATA JSON FILE
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

  //  METHOD TO COMPARE PASSWORD IN THE DATABASE TO PASSWORD GIVEN BY USER WHEN LOGGING IN
  async comparePasswords(savedPass, suppliedPass) {
    const [hashed, salt] = savedPass.split('.')
    const hashedSuppliedBuffer = await scrypt(suppliedPass, salt, 64)

    return hashed === hashedSuppliedBuffer.toString('hex')
  }

}

// Exporting an Instance of the class UsersRepository
module.exports = new UsersRepository('users.json')
