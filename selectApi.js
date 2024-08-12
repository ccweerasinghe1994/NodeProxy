// middleware/selectApi.js

import { API_CONFIG } from "./config.js";

export const selectApi = (req, res, next) => {
  const apiName = req.headers["x-api-name"];
  if (API_CONFIG[apiName]) {
    req.apiUrl = API_CONFIG[apiName];
    next();
  } else {
    res.status(400).json({ message: "Invalid API name" });
  }
};
