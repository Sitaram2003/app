const mongoose = require('mongoose');
const uri = "mongodb+srv://gandhamsitaramu123:J7RpN4jB90EOVRb3@cluster0.1efi0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/vsupport";
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};


module.exports = connectDB;
