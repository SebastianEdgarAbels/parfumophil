import bcrypt from "bcrypt";

const isPasswordValid = async (password, hashedPassword) => {
  console.log("password", password, hashedPassword);
  const verified = await bcrypt.compare(password, hashedPassword);
  return verified;
};

export default isPasswordValid;
