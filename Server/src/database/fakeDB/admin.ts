import mongoose, {Schema, model} from "mongoose";
import {MongoMemoryServer} from 'mongodb-memory-server';
import Stack from '../../models/stackSchema'
import Admin from '../../models/adminSchema';
let mongoServer: any = null;
  

export const dbConnect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    const mongooseOpts: any = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    await mongoose.connect(uri, mongooseOpts);
}


export const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if(mongoServer){
        mongoServer.stop();
    }
}

export const dropCollections = async function(){
    if(mongoServer){
        const collections = await mongoose.connection.db.collections();
        for(let collection of collections){
            await collection.deleteOne({});
        }
    }
}


interface IObjectId extends mongoose.Document{
    id: Schema.Types.ObjectId
}
const id: IObjectId = Object("62ec43d22d8d489ca5f6c9dd");

export const adminFakePasswordUpdate = {
    // password: "1234",
    newPassword: '0000',
    confirmPassword: '0000'
}
// export const fakeAdmin = async () => {
//     // Stack placeholder
//     const doc = await Stack.findOne({}, { _id: 1 });
    
//     return new Admin({
//         firstName: "Moses",
//         lastName: "Ikenna",
//         email: "moses.amaechi@decagon.dev",
//         password: "1234",
//         role: "SL",
//         stack: doc?._id,
//         phoneNo: 1234,
//         imageUrl: "#",
//         squad: [12],
//         status: "inactive"
//     })
// }

export const fakeAdmin = async () => {
    
    return new Admin({
    firstName: "Moses",
    lastName: "Ikenna",
    email: "benjamin.effiong@decagon.dev",
    password: 1234,
    role: "SL",
    stack: id,
    phoneNo: 1234,
    imageUrl: "#",
    squad: [12],
    status: "inactive"
    })
}


// export const dummyAdmin = new Admin({
//     firstName: "Moses",
//     lastName: "Ikenna",
//     email: "moses.amaechi200@decagon.dev",
//     password: 1234,
//     confirmPassword: 1234,
//     role: "SL",
//     phoneNo: 1234,
//     squad: 12,
//     status: "inactive"
// })

export const dummyAdmin = {
    firstName: "Benjamin",
    lastName: "Effiong",
    email: "benjamin.effiong@decagon.dev",
    password: "1234",
    confirmPassword: "1234",
    role: "SL",
    phoneNo: 1234,
    squad: 12,
    status: "inactive"
}












// //Create fake model
// const userFakeSchema = new Schema({
//     firstName: {type: String, required: true},
//     lastName: {type: String, required: true},
//     email: {type: String, unique: true, required: true},
//     password: {type: String, required: true},
//     role: {
//         type: String, 
//         enum: ["SuperAdmin", "SL", "PA", "Other"],
//         required: true },
//     stack: {
//         type: Schema.Types.ObjectId,
//         ref: Stack,
//         default: id},
//     phoneNo: {type: Number, default: 1234},
//     imageUrl: {type: String, default: "#"},
//     squad: {
//         type: [Number], 
//         default: [0]},
//     status: {
//         type: String, 
//         enum: ["active", "inactive"],
//         default: "inactive",
//     }
// },
// {
// timestamps: true
// }
// )


// const FakeUser = model('FakeUser', userFakeSchema)