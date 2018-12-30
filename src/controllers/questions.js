import questionModel from '../model/Questions';

const Question = {
    createQuestion(req, res){
        if(!req.body.createdBy && !req.body.meetup && !req.body.title && !req.body.body && !req.body.votes){
            return res.status(404).json({
                message: 'Fill out all field'
            });
        }
        const question = questionModel.createQ(req.body);
        return res.status(201).json({
            message: 'Thank you for posting your question',
            question: question

        });
    },

    upvote(req, res){
        const question = questionModel.findQuestion(req.params.id);
        if(!question){
            return res.status(404).json({
                message: 'No question with the specified id'
            });
        }
        
        const like = questionModel.upvoteQ(req.params.id, req.body);
        return res.status(200).json({
            message: 'Successful',
            question: like
        });
    }
}

export default Question;