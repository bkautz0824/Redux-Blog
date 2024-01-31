import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://bennettkautz:Upintheair555@bennetts-project-databa.uxvgfb6.mongodb.net/Redux-blog?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("db connected");
  } catch (error) {
    console.error("db error:", error.message);
  }
};

const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

const clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

const db = { connect, close, clear };

export default db;
