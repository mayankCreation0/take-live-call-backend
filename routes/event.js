const express = require('express');
const eventRouter = express.Router();
const auth = require('../confiq/middlewares')
const { updateStatus, getEvent, joinEvent, createEvent, expireEvent, cancelStatus } = require('../controller/event')

eventRouter.get("/event", auth, getEvent);
eventRouter.put("/event/cancel/:id", auth, cancelStatus);
eventRouter.put("/event/join/:id", auth, joinEvent);
eventRouter.post("/event/create", auth, createEvent);
eventRouter.post("/event/expire", expireEvent);
eventRouter.put('/event/update/:id/:playerId', auth, updateStatus)

module.exports = eventRouter;