import { TwoFactorCodeModel } from "../models/index.js";

export async function Create(data) {
 TwoFactorCodeModel.create(data);
}

export function Search(userId) {
    return TwoFactorCodeModel.findOne({ where: { userId } });
}
