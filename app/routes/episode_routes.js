const express = require('express')
const passport = require('passport')
const Episode = require('../models/episode')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
// POST
router.post('/episodes', requireToken, (req, res, next) => {
  console.log('req is ', req)
  req.body.episode.owner = req.user.id

  Episode.create(req.body.episode)
    .then(episode => {
      res.status(201).json({ episode: episode.toObject() })
    })
    .catch(next)
})

// INDEX
// GET
router.get('/episodes', (req, res, next) => {
  Episode.find()
    .then(episode => {
      return episode.map(episode => episode.toObject())
    })
    .then(episodes => res.status(200).json({ episodes: episodes }))
    .catch(next)
})

// SHOW
// GET /episodes/5a7db6c74d55bc51bdf39793
router.get('/episodes/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Episode.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "episode" JSON
    .then(episode => res.status(200).json({ episode: episode.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE
// PATCH /episodes/5a7db6c74d55bc51bdf39793
router.patch('/episodes/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.episode.owner

  Episode.findById(req.params.id)
    .then(handle404)
    .then(episode => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, episode)

      // pass the result of Mongoose's `.update` to the next `.then`
      return episode.update(req.body.episode)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /episodes/5a7db6c74d55bc51bdf39793
router.delete('/episodes/:id', requireToken, (req, res, next) => {
  Episode.findById(req.params.id)
    .then(handle404)
    .then(episode => {
      // throw an error if current user doesn't own `episode`
      requireOwnership(req, episode)
      // delete the episode ONLY IF the above didn't throw
      episode.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
