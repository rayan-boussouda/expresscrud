import mongoose, { Mongoose } from 'mongoose';

mongoose.Promise = global.Promise;

const db: {
    mongoose: Mongoose;
    user: any; // Assuming you have a user model with a specific type, replace 'any' with the actual type
    role: any; // Assuming you have a role model with a specific type, replace 'any' with the actual type
    ROLES: string[];
} = {
    mongoose: mongoose,
    user: require("./user.model"),
    role: require("./role.model"),
    ROLES: ["user", "admin", "moderator"],
};

export default db;