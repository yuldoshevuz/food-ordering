import { EditVendorInput } from "../dtos/vendor.dto";
import { vendorModel } from "../models/vendor.model";

class VendorRepo {
    public async findVendors() {
        return await vendorModel.find()
    }

    public async findById(id: string) {
        return await vendorModel.findById(id)
    }

    public async findByEmail(email: string) {
        return await vendorModel.findOne({ email })
    }

    public async findByIdAndUpdate(id: string, newData: EditVendorInput) {
        const { name, foodType, address, phone } = newData

        const updatedVendor = await vendorModel.findByIdAndUpdate(id,
            { name, foodType, address, phone },
            { returnOriginal: false, lean: true }
        );
        return updatedVendor
    }
}

export default new VendorRepo()