import mongoose from 'mongoose';
import colors from 'colors';
export const connectBD = async () => {
    try {
        console.log(process.env.MONGO_URI);       
        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        const url = `${connection.host}:${connection.port}/${connection.name}`;
        console.log(colors.bgGreen.white.bold.italic(`MongoDB conectado en: ${url}`));
    }catch(error){
        console.log(colors.bgRed.white.bold.italic(`Error al conectar a la base de datos: ${error.message}`));
        process.exit(1);
    }
}