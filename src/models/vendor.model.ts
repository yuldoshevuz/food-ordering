import { Schema, SchemaDefinitionProperty, Types, model } from "mongoose";

export interface VendorDoc {
    name?: string;
    ownerName?: string;
    foodType?: string[];
    pincode?: string;
    address?: string;
    phone?: string;
    email?: string;
    password?: string;
    serviceAvailable?: boolean;
    coverImages?: string[];
    rating?: number;
    foods?: SchemaDefinitionProperty<Types.ObjectId>[],
    lat?: number;
    long?: number;
}

const vendorSchema = new Schema<VendorDoc>({
    name: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    foodType: [ String ],
    pincode: {
        type: String,
        required: true
    },
    address: String,
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    serviceAvailable: Boolean,
    coverImages: [ String ],
    rating: Number,
    foods: [{
        type: Types.ObjectId,
        ref: "food"
    }],
    lat: Number,
    long: Number
}, { timestamps: true, versionKey: false })

export const vendorModel = model<VendorDoc>("vendor", vendorSchema)