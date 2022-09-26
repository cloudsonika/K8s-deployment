"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const system_status_controller_1 = __importDefault(require("./components/system-status/system-status.controller"));
function registerRoutes(app) {
    new system_status_controller_1.default(app);
}
exports.default = registerRoutes;
//# sourceMappingURL=routes.js.map