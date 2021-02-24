const db = require('../models');
const router = require('express').Router();

// get workouts
/*
router.get('/api/workouts', (req, res) => {
  db.Workout.aggregate([
    {

    }
  
  ])
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });

}); */

// create workout
router.post('/api/workouts', ({ body }, res) => {
  db.Workout.create({ body })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// add an exercise to workout


// get