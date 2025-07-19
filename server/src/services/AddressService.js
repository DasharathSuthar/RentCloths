import { Address } from "../models/address.model.js";

export class AddressService {
  async createAddress(address) {
    return await Address.create(address);
  }

  async getAddresses(userId) {
    return await Address.find({ userId });
  }

  async getAddressById(id) {
    return await Address.findById(id);
  }
}
