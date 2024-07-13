import mongoose from 'mongoose';

const { Schema } = mongoose;

const movieSchema = new Schema({
    ID: { type: Number, required: true, unique: true },
    name: { type: String, required: true },  
    time: { type: Number, required: true },
    year: { type: Number, required: true },
    image: { type: String, required: true },
    introduce: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
