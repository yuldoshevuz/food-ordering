import { model, Schema, SchemaDefinitionProperty, Types } from "mongoose";

export interface FoodDoc {
    vendorId?: SchemaDefinitionProperty<Types.ObjectId>;
    name?: string;
    description?: string;
    category?: string;
    foodType?: string;
    readyTime?: number;
    price?: number;
    rating?: number;
    images?: string[]
}

const foodSchema = new Schema<FoodDoc>({
    vendorId: {
        type: Types.ObjectId,
        ref: "vendor",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: String,
    foodType: {
        type: String,
        required: true
    },
    readyTime: Number,
    price: Number,
    rating: Number,
    images: [ String ]
}, { timestamps: true, versionKey: false })

export const foodModel = model<FoodDoc>("food", foodSchema)