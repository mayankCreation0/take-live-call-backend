const express = require('express');
const eventRouter = express.Router();
const auth = require('../confiq/middlewares')
const { updateStatus, getEvent, joinEvent, createEvent, expireEvent, cancelStatus, getEventDetails } = require('../controller/event')
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

eventRouter.get("/event", auth, asyncHandler(getEvent));
eventRouter.get("/event/detail/:id", auth, asyncHandler(getEventDetails));
eventRouter.put("/event/cancel/:id", auth, asyncHandler(cancelStatus));
eventRouter.put("/event/join/:id", auth, asyncHandler(joinEvent));
eventRouter.post("/event/create", auth, asyncHandler(createEvent));
eventRouter.post("/event/expire", asyncHandler(expireEvent));
eventRouter.put('/event/update/:id/:playerId', auth, asyncHandler(updateStatus))

module.exports = eventRouter;
