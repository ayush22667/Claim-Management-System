require("dotenv").config();

"use strict";
exports.config = {
  app_name: ["MyMERNApp"],
  license_key: process.env.LICENSE_KEY,
  logging: {
    level: "info",
  },
};
