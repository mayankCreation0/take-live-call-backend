const eventmodels = require('../models/event');
const users = require('../models/user')

const createEvent = async (req, res) => {
    try {
        const { sport,description,location,date,maxPlayers} =req.body;
        const newEvent = new eventmodels({
            organizer:req.userid,
            sport,
            description,
            location,
            date,
            maxPlayers,
        });
        const event = await (await eventmodels.create(newEvent)).populate("organizer","-password");
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
const joinEvent = async (req, res) => {
    try {
        const event = await eventmodels.findById(req.params.id);
        console.log(event)
        if (event) {
            if (event.maxPlayers <= event.players.length) {
                return res.status(400).json({ msg: 'Event is already full' });
            }
            if (event.players.find((player) => player.user.toString() === req.userid)) {
                return res.status(400).json({ msg: 'User has already joined the event' });
            }
            event.players.push({ user: req.userid, status: 'pending' });
            await (await event.save()).populate("players.user");
            res.json(event.players);
        }
        else{
            res.json("checkk")
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getEvent = async (req, res) => {
    try {
        const events = await eventmodels.find({
            date: { $gte: new Date() } 
        })
            .populate("organizer", "-password")
            .sort({ date: 'asc' }); 
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const updateStatus = async (req, res) => {
    try {
        const { id, playerId } = req.params;
        const event = await eventmodels.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const playerIndex = event.players.findIndex(
            (player) => player.user.toString() === playerId
        );
        if (playerIndex === -1) {
            return res.status(404).json({ message: 'Player not found' });
        }
        const player = event.players[playerIndex];
        if (player.status === 'accepted') {
            return res
                .status(400)
                .json({ message: 'Player has already been accepted' });
        } else if (player.status === 'rejected') {
            return res
                .status(400)
                .json({ message: 'Player has already been rejected' });
        }
        if (event.date < new Date()) {
            return res.status(400).json({ message: 'Event has already started' });
        }
        const action = req.body.action;
        if (action === 'cancel') {
            event.players.splice(playerIndex, 1);
        } else if (action === 'accept') {
            player.status = 'accepted';
        } else if (action === 'reject') {
            player.status = 'rejected';
        }
        await event.save();
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
const cancelStatus = async (req, res) => {
    try {
        const playerId=req.userid;
        console.log("user",playerId)
        const { id } = req.params;
        const event = await eventmodels.findById(id);
        const playerIndex = event.players.findIndex(
            (player) => player.user.toString() === playerId
        );
        console.log(playerIndex)
        if (playerIndex===-1) {
            return res.status(404).json({ error: 'Player not found in event' });
        }
        event.players.splice(playerIndex, 1);
        await event.save();
        res.json(event);
    }
     catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
const expireEvent = async (req, res) => {
    try {
        const user = await users.findById(req.user.id).select('-password');
        const event = await eventmodels.findById(req.params.id);

        if (new Date(event.date) < new Date()) {
            event.players.forEach(player => {
                if (player.status === 'pending') {
                    player.status = 'expired';
                }
            });
            await event.save();
            return res.status(400).json({ msg: 'Game has already started' });
        }
        if (event.players.length >= event.maxPlayers) {
            return res.status(400).json({ msg: 'Event is already full' });
        }
        if (event.players.some(player => player.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'User has already joined the event' });
        }
        event.players.push({ user: req.user.id, status: 'pending' });
        await event.save();

        res.json(event.players);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    updateStatus, getEvent, joinEvent, createEvent , expireEvent,cancelStatus
}

