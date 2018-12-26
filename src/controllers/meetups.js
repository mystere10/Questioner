import MeetupModel from '../model/Meetup';

const Meetups = {
    createMeetup(req, res){
        if(!req.body.location && !req.body.topic && !req.body.images && !req.body.tags){
            return res.status(400).json({
                message: "Fields required"
            })
        }
        const meetup = MeetupModel.createMeetup(req.body);
        return res.status(201).json({
            data: meetup
        });
    }
}

export default Meetups;