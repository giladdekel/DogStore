import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },

    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ticketSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isAnswered: { type: String, default: "Pending" },
    answeredAt: { type: Date },
    numAnswers: { type: Number },
    isActive: { type: Boolean, default: true },

    answers: [answerSchema],
  },
  {
    timestamps: true,
  }
);
const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
