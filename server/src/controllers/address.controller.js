import { AddressService } from "../services/AddressService.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

class AddressController {
  addressService = new AddressService();

  createAddress = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    } = req.body;

    if (
      [
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        zipcode,
        country,
        phone,
      ].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All Field are required.");
    }

    const address = {
      userId,
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    };

    const createdAddress = await this.addressService.createAddress(address);

    if (!createdAddress) {
      throw new ApiError(401, "error : while addind Address.");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, createdAddress, "Address Added successfully."),
      );
  });

  getAddresses = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const addressList = await this.addressService.getAddresses(userId);

    if (!addressList) {
      throw new ApiError(401, "error : while fecthing Addresses.");
    }

    res
      .status(200)
      .json(new ApiResponse(200, addressList, "Address fecthed successfully."));
  });
}

export const addressController = new AddressController();
