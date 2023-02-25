// const express = require('express');
// const eventRouter = express.Router();
// const auth = require('../confiq/middlewares')
// const { updateStatus, getEvent, joinEvent, createEvent, expireEvent, cancelStatus } = require('../controller/event')

// eventRouter.get("/event", auth, getEvent);
// eventRouter.put("/event/cancel/:id", auth, cancelStatus);
// eventRouter.put("/event/join/:id", auth, joinEvent);
// eventRouter.post("/event/create", auth, createEvent);
// eventRouter.post("/event/expire", expireEvent);
// eventRouter.put('/event/update/:id/:playerId', auth, updateStatus)

// module.exports = eventRouter;

const express = require('express');
const eventRouter = express.Router();
const auth = require('../confiq/middlewares')
const { updateStatus, getEvent, joinEvent, createEvent, expireEvent, cancelStatus } = require('../controller/event')

// Async handler function
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

eventRouter.get("/event", auth, asyncHandler(getEvent));
eventRouter.put("/event/cancel/:id", auth, asyncHandler(cancelStatus));
eventRouter.put("/event/join/:id", auth, asyncHandler(joinEvent));
eventRouter.post("/event/create", auth, asyncHandler(createEvent));
eventRouter.post("/event/expire", asyncHandler(expireEvent));
eventRouter.put('/event/update/:id/:playerId', auth, asyncHandler(updateStatus))

module.exports = eventRouter;
