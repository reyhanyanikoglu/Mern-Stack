const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); // en son oluşturulandan başlayacak
  res.status(200).json(workouts);
};

// get a single workouts
const getWorkout = async (req, res) => {
  const { id } = req.params; // rota paremetreleri params da depolanır
  // rota parametrelerinden id özelliğini alıyoruz

  // id'nin geçerli bir MongoDB ObjectId olup olmadığı kontrol edilir.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // yukardaki id var olup olmadığını görür
    return res.status(404).json({ error: "No such workout" });
  }

  // id ile veri tabanından workout ararız
  const workout = await Workout.findById(id);

  // workout bulunamazsa 404 hatası döneriz
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  } // return demessek kodun devamına gidecek dursun diye return kullanılır

  // workout bulunursa 200 kodu ile workout bilgileri döner
  res.status(200).json(workout);
};

// create a new workout
const createWorkouts = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!load) {
    emptyFields.push('laod')
  }
  if(!reps) {
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields.', emptyFields})
  }


  // add doc to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // id mongoose'da geçerli mi?
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id }); // mongodb'de id'ler _id kısmına yazılır. doğru id hedeflemek için _id yazılır

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  ); // ikinci
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkouts,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};
