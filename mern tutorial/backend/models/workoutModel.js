const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
  {
    title: {
      // egzersiz adı
      type: String,
      required: true,
    },
    reps: {
      // egzersizin tekrar sayısı
      type: Number,
      required: true,
    },
    load: {
      // yük
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // belgenin ne zaman oluştuğunu otomatik kaydeder
);

module.exports = model("Workout", workoutSchema);
// module.exports = mongoose.model() ... yukarıda model'i {} şeklinde yazmadan bu syntax'la da uygulayabilirdim.
