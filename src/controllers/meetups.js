import MeetupModel from '../model/Meetup';

const Meetups = {
    createMeetup(req, res){
        if(!req.body.location && !req.body.topic && !req.body.images && !req.body.tags && !req.body.happeningOn){
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
      },

      deleteOneMeetup(req, res){
        const meetup = MeetupModel.getOneMeetup(req.params.id);
        if(!meetup){
            return res.status(404).json({
                message: 'No meetup found'
            });
        }
        const meet = MeetupModel.deleteMeetup(req.params.id);
        return res.status(200).json({
            message: 'Meetup deleted',
            meetup: meet
            
        });
      },

      respondToMeetup(req, res){
          const meetup = MeetupModel.getOneMeetup(req.params.id);
          if(!meetup){
              return res.status(404).json({
                  message: 'No meetup with the specified id'
              });
          }
          const response = MeetupModel.RSVP(req.params.id, req.body);
          res.status(201).json({
              message: 'Response sent',
              response: response
          });
      },

      upcoming(req, res){
        const upcoming = MeetupModel.upcomingMeetups();
        if(upcoming.length == 0 || upcoming == 'undefined'){
            return res.status(404).json({
                message: 'No upcoming meetup found'
            });
        }
        return res.status(200).json({
            message: 'list of upcomming meetups',
            meetups: upcoming
        });
      }
}




export default Meetups;