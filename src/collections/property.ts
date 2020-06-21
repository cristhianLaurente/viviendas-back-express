import { Schema } from 'mongoose';

export const propertySchema: Schema = new Schema({
    title: {
        type: String
    },
    type: {
        type: String
    },
    address: {
        type: String
    },
    rooms: {
        type: Number
    },
    price: {
        type: Number
    },
    area: {
        type: Number
    }
})