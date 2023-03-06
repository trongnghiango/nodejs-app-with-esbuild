const { successHandler, errorHandler } = require("../core/ApiResponse");
const { userValidate } = require("../helpers/validation");
const {
  signAccessToken,
  signRefreshToken
} = require("../middleware/jwt");

module.exports = {

  /**
   * signUp
   * @param {*} req 
   * @param {*} res 
   */
  signUp: function (req, res) {
    const { email, password } = req.body;

    // check validation
    const { error } = userValidate(req.body);
    if (error) res.json(errorHandler(error.message));


    // call service create new user
    const user = { email, password };

    //return new user info come back client
    const result = successHandler({
      results: 
        user,
      
    })
    // const e = errorHandler('masao ban kjajds');
    res.json(result);
  },


  /**
   * signIn
   * @param {*} req 
   * @param {*} res 
   */
  signIn: async function (req, res) {
    res.status(200).json(
      successHandler({
        results: [
          "Khabd", "teo teo teo"
        ]
      }));
  },


  /**
   * refreshToken
   * @param {*} req 
   * @param {*} res 
   */
  refreshToken: async function (req, res) {
    // const { user } = req;
    // console.log({ user });
    const payload = {
      userId: 4,
      email: "hsfhkl",
    };

   
    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);
    
    

    res.json(
      successHandler({results: {accessToken, refreshToken}})
    );
  }
};