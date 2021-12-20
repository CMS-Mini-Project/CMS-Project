const Event = require('../../models/event/model')
const User = require('../../models/user/model')


const organizer = async(req,res,next)=>{
    const event = await Event.findOne({url:req.params.id});
    if(req.session.current ){
        if(req.session.current == event.user){
            return res.redirect('/e/'+event.url);
        }
    }
    if(req.session.team ){
        const team = await Team.findOne({event:event._id});
        if(team){
            return res.redirect('/e/'+event.url);
        }
    }
    next();
}
module.exports = organizer