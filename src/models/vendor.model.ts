import { Document, Schema, Types, model } from "mongoose";

interface VendorDoc extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
    foods: any,
    lat: number;
    long: number;
}

const vendorSchema = new Schema<VendorDoc>({
    name: { type: String, required: true },
    ownerName: { type: String, required: true},
    foodType: { type: [String] },
    pincode: { type: String, required: true},
    address: { type: String},
    phone: { type: String, required: true},
    email: { type: String, required: true},
    password:{ type: String, required: true},
    serviceAvailable: { type: Boolean},
    coverImages: { type: [String]},
    rating: { type: Number},
    foods: [{
        type: Types.ObjectId,
        ref: "food"
    }],
    lat: { type: Number},
    long: {type: Number}
}, { timestamps: true, versionKey: false })

export const vendorModel = model<VendorDoc>("Vendor", vendorSchema)