const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Query');

// Custom method overrides or additions
methods.create = require('./create');
methods.read = require('./read');
methods.update = require('./update');
methods.list = require('./paginatedList');

// Custom note handling methods
methods.addNote = require('./addNote');
methods.deleteNote = require('./deleteNote');

// If you later need to validate data, this can be used inside the above files
methods.schemaValidate = require('./schemaValidate');

module.exports = methods;
