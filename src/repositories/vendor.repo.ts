import { vendorModel } from "../models/vendor.model";

class VendorRepo {
    public async findById(id: string) {
        return await vendorModel.findById(id)
    }

    public async findByEmail(email: string) {
        return await vendorModel.findOne({ email })
    }
}

export default new VendorRepo()