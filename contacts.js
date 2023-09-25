const fs = require('fs').promises
exports.fs = fs
const { nanoid } = require('nanoid')
const path = require('path')
require('colors')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')
exports.contactsPath = contactsPath

const listContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath, { encoding: 'utf-8' })
		return JSON.parse(contacts)
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

const getContactById = async contactId => {
	try {
		const contacts = await listContacts()
		return contacts.filter(({ id }) => id === contactId)
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

const addContact = async (name, email, phone) => {
    try {
        
		const contacts = await listContacts()
		const newContact = {
			id: nanoid(),
			name,
			email,
			phone,
		}
		const updatedContacts = [newContact, ...contacts]
		await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), { encoding: 'utf-8' })
		return newContact
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts()
        const index = contacts.findIndex(item => item.id === contactId)
        if (index === -1) {
            return null
        }
        const newContacts = contacts.splice(index, 1)
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
        return newContacts
    } catch (error) {
        console.log(`Error: ${error.message}`.red)
    }
}


listContacts()

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}