import mongoose  from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected!`)
    } catch(e) {
        console.log(`Error: ${e.message}`);
        process.exit(1);
    }
}

export default connect;
