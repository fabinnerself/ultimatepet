const express = require("express");

const app = express();

require("dotenv").config();

app.use(express.json());

const connectDB = require("./connectMongo");

connectDB();

const PetModel = require("./models/pet.model");

// Health check endpoint: always returns 200
app.get("/api/v1/health", (req, res) => {
  return res.status(200).json({
    msg: "Ok",
    status: "up",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/v1/pets", async (req, res) => {
  const { limit = 5, orderBy = "nombre", sortBy = "asc", keyword } = req.query;
  let page = +req.query?.page;

  if (!page || page <= 0) page = 1;

  const skip = (page - 1) * + limit;

  const query = {};

  if (keyword) query.nombre = { $regex: keyword, $options: "i" };

  const key = `Pet::${JSON.stringify({query, page, limit, orderBy, sortBy})}`
  let response = null
  try {
     
    const data = await PetModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ [orderBy]: sortBy });
    const totalItems = await PetModel.countDocuments(query);

    response = {
      msg: "Ok",
      data,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      limit: +limit,
      currentPage: page,
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
    //res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
});

app.get("/api/v1/pets/health", async (req, res) => {
  try {

    const data = await PetModel.findById(req.params.id);

    if (data) {
      return res.status(200).json({
        msg: "Ok",
        data,
      });
    }  

    return res.status(404).json({
      msg: "Not Found",
    });

  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

app.get("/api/v1/pets/:id", async (req, res) => {
  try {

    const data = await PetModel.findById(req.params.id);

    if (data) {
      return res.status(200).json({
        msg: "Ok",
        data,
      });
    }  

    return res.status(404).json({
      msg: "Not Found",
    });

  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

app.post("/api/v1/pets", async (req, res) => {
  try {

    throw new Error("Algo salio Mal, 500 Internal Server Error");

    const { name, author, price, description } = req.body;
    const pet = new PetModel({
      name,
      author,
      price,
      description,
    });
    const data = await pet.save();
    
    return res.status(200).json({
      msg: "Ok",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

app.put("/api/v1/pets/:id", async (req, res) => {
  try {
    const { name, author, price, description } = req.body;
    const { id } = req.params;

    const data = await PetModel.findByIdAndUpdate(
      id,
      {
        name,
        author,
        price,
        description,
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        msg: "Not Found",
      });
    }
    
    return res.status(200).json({
      msg: "Ok",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

app.delete("/api/v1/pets/:id", async (req, res) => {
  try {

//throw new Error("Algo salio Mal, 500 Internal Server Error"); 

    await PetModel.findByIdAndDelete(req.params.id);
    
    return res.status(200).json({
      msg: "Ok",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
