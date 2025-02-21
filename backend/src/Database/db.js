const mongoose = require("mongoose");
const services = require("../../services");

const connectDB = async () => {
  try {
    // const connect=await mongoose.connect(`${services.connectionString}`,{
    // console.log("DB is connected");
    const connect = await mongoose.connect("mongodb+srv://wwizard428:DT7o5PBjGXHrYj2A@cluster0.eghpc.mongodb.net/", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.log("DB error : ", error);
  }
};

module.exports = connectDB;
