const express = require('express');
const router = express.Router();

const create = require('@/controllers/appControllers/queryController/create');
const read = require('@/controllers/appControllers/queryController/read');
const update = require('@/controllers/appControllers/queryController/update');
const paginatedList = require('@/controllers/appControllers/queryController/paginatedList');
const addNote = require('@/controllers/appControllers/queryController/addNote');
const deleteNote = require('@/controllers/appControllers/queryController/deleteNote');

// GET all queries (with pagination)
router.get('/', paginatedList);

// Create a new query
router.post('/', create);

// Get a single query
router.get('/:id', read);

// Update status/resolution
router.put('/:id', update);

// Add a note to a query
router.post('/:id/notes', addNote);

// Delete a note from a query
router.delete('/:id/notes/:noteId', deleteNote);

module.exports = router;
