const db = require('../models');
const apiRouter = require('express').Router();

// get workouts and its total duration
apiRouter.get('/api/workouts', (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: '$exercises.duration' }
      }
    }
  
  ])
  .then(dbWorkout => {
    //console.log(`Result of agregate: ${dbWorkout}`);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });

});

// create workout
apiRouter.post('/api/workouts', (req, res) => {
  //console.log(req.body);
  db.Workout.create({
    day: new Date().setDate(new Date.getDate())
  })
    .then(dbWorkout => {
      //console.log(`created workout: ${dbWorkout}`);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// add an exercise on a given workout
apiRouter.put('/api/workouts/:id', (req, res) => {
  //console.log(req.body);
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    { 
      $inc: { totalDuration: req.body.duration},
      $push: {exercises: req.body} 
    },
    { new: true })
    .then(dbWorkout => {
      //console.log(`add exercise ${dbWorkout}`);
      res.json(dbWorkout);
    }).catch(err => {
      res.status(400).json(err);
    });
  
});

// get combined weight from the past seven workouts
// get total duration of each workout from past seven workouts
apiRouter.get('/api/workouts/range', (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: '$exercises.duration'},
        combinedWeight: { $sum: '$exercises.weight'}
      }
    },
    { $sort: { day: -1 } },
    { $limit: 7 }
  ])
    .then(dbWorkout => {
      //console.log(`get stats for past 7 days ${dbWorkout}`);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = apiRouter;