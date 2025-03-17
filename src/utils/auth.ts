import bcrypt from 'bcrypt';

export const HashPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}