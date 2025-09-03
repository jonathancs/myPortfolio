import { Schema, models, model } from "mongoose";

const ItemSchema = new Schema(
  {
    // ajuste os campos conforme as colunas da planilha
    id: { type: String, index: true, unique: true },
    name: String,
    value: String,
  },
  { timestamps: true }
);

export default models.Item || model("Item", ItemSchema);
