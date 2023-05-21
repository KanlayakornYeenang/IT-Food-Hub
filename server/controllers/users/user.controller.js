const Joi = require('joi');
const shortid = require('shortid');
const {
  getUserDetailById,
  registerUser,
  updatePassword,
  insertProfilePicture,
  updateRoleUser,
  updateEmail,
  updatePhone
} = require("../../models/users");

const changeRoleUser = async (req, res) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    console.log(error);
    return res.status(404).send(error);
  }
  const user_id = req.user.user_id;
  const role = req.params.role;
  try {
    const result = await updateRoleUser(user_id, role, file.path.substr(6));
    res.send({
      message: "Role updated successfully",
      result: result,
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

const getDetail = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const result = await getUserDetailById(user_id);
    console.log("result: " + result)
    return res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

const insertPictureProfile = async (req, res) => {
  const user_id = req.params.id
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return res.json(error);
  }
  else{
    try{
      const file_path = file.path.substring(6)
      result = await insertProfilePicture(file_path,"profile",user_id)
      return res.send(result)
    }catch(error){
      res.send(error)
    }
  }
};

const passwordValidator = (value, helpers) => {
  if (value.length < 8) {
      throw new Joi.ValidationError('Password must contain at least 8 characters')
  }
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
      throw new Joi.ValidationError('Password must be harder')
   }
   return value
}

const registerSchema = Joi.object({
  first_name : Joi.string().required().min(5),
  last_name : Joi.string().required().min(5),
  password:Joi.string().required().custom(passwordValidator),
  phone: Joi.string().required().pattern(/0[0-9]{9}/),
  email: Joi.string().required().email(),
  location: Joi.string().required()
})

const passwordSchema = Joi.object({
  password : Joi.string().required().custom(passwordValidator),
})

const emailSchema = Joi.object({
  email: Joi.string().required().email(),
})

const phoneSchema = Joi.object({
  mobile: Joi.string().required().pattern(/0[0-9]{9}/),
})

const changePasswordUser = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    await passwordSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    res.status(500).send(err);
  }
  try{
    const result = await updatePassword(user_id,req.body.password)
    return res.status(200).send(result)
  }catch(err){
    return res.status(400).send(err)
  }
};

const changeEmail = async (req, res)=>{
  const user_id = req.user.user_id
  try{
    await emailSchema.validateAsync(req.body, {abortEarly: false})
  }
  catch(err){
    res.status(400).send(err);
  }
  try{
    const result = await updateEmail(user_id, req.body.email)
    return res.status(200).send(result)
  }catch(err){
    return res.status(400).send(err)
  }
}

const changePhone = async (req, res) =>{
  try{
    await phoneSchema.validateAsync(req.body, {abortEarly: false})
  }
  catch(err){
    res.status(400).send(err);
  }
  try{
    const result = await updatePhone(user_id, req.body.mobile)
    return res.status(200).send(result)
  }catch(err){
    return res.status(400).send(err)
  }
}

const registerOfUser = async (req, res) => {
  try{
    await registerSchema.validateAsync(req.body, {abortEarly: false})
  }catch(err){
    res.status(400).send(err)
  }
  const user_role = "customer"
  const user_email = req.body.email
  const user_password = req.body.password
  const user_fname = req.body.first_name
  const user_lname = req.body.last_name
  const user_phone = req.body.phone
  const user_locat = req.body.location

  let generatedId;
  let isIDExist = true;
  while (isIDExist) {
    const desiredLength = 5;
    generatedId = shortid.generate().substring(0, desiredLength);
    isIDExist = await getUserDetailById(generatedId);
  }
  
  try{
    const result = await registerUser(generatedId, user_role, user_email, user_password, user_fname, user_lname, user_phone, user_locat)
    res.status(200).send(result)
  }catch(err){
    res.status(404).send(err.message)
  }
};

module.exports = {
  getDetail,
  registerOfUser,
  changePasswordUser,
  insertPictureProfile,
  changeRoleUser,
  changeEmail,
  changePhone
};
