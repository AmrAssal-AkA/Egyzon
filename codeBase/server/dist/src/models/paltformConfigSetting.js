"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformConfigSetting = void 0;
const mongoose_1 = require("mongoose");
const PlatformConfigSettingSchema = new mongoose_1.Schema({
    PlatformFeePercentage: { type: Number, required: true },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Admin", required: true },
    updateAt: { type: Date, default: Date.now },
});
exports.PlatformConfigSetting = (0, mongoose_1.model)("PlatformConfigSetting", PlatformConfigSettingSchema);
//# sourceMappingURL=paltformConfigSetting.js.map