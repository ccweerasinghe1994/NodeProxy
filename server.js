import express from "express";
import axios from "axios";
import { ResponseDto } from "./dto/Response.js";
import { selectApi } from "./selectApi.js";
import { filterResponse } from "./filterResponse.js";

const app = express();

// Sample authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token === "sample-token") {
    next(); // Token is valid, proceed to the next middleware/route handler
  } else {
    res.status(401).json({ message: "Unauthorized" }); // Token is invalid, respond with 401
  }
};

// Apply the authentication, API selection, and filtering middleware to the /api/data route
app.get("/api/data", authenticate, selectApi, filterResponse, async (req, res) => {
  try {
    const response = await axios.get(`${req.apiUrl}/todos/1`);
    const responseData = response.data;
    const responseObject = { ...ResponseDto, data: responseData };

    res.json(responseObject);
  } catch (error) {
    console.error(error);
    const responseDto = {
      data: null,
      message: "Failed to fetch data",
      error: error.message,
    };
    res.status(500).json(responseDto);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
