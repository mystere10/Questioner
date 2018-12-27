import MeetupModel from '../model/Meetup';

const Meetups = {
    createMeetup(req, res){
        if(!req.body.location && !req.body.topic && !req.body.images && !req.body.tags){
            return res.status(400).json({
                message: 'Field required'
            })
        }
        const meetup = MeetupModel.createMeetup(req.body);
        return res.status(201).json({
            data: meetup
        });
    },

    getOneMeetup(req, res){
        const oneMeetup = MeetupModel.getOneMeetup(req.params.id);
        if (!oneMeetup) {
          return res.status(404).json({ 
              message: 'Meetup not found'
            });
        }
        return res.status(200).json({
            meetup: oneMeetup
        });
      },

      getAllMeetup(req, res){
          const meetup = MeetupModel.getAll();
          if(meetup.length == 0){
              return res.status(404).json({
                  message: 'No meetup fund'
              });
          }
          return res.status(200).json({
              message: 'Meetups successfully returned',
              meetups: meetup
          });
      }

}




export default Meetups;