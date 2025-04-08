import Schedule from '../models/Schedule.js';

const allSchedules = async () => {
  return Schedule.find()
    .populate({
      path: 'class',
      populate: ['teacher', 'subject']
    }).exec();
};

const scheduleByDay = async (day) => {
  return Schedule.find({ day })
    .populate('class')
    .exec();
};

const createSchedule = async (scheduleData) => {
  const newSchedule = new Schedule(scheduleData);
  return newSchedule.save();
};

export {
  allSchedules,
  scheduleByDay,
  createSchedule
};
