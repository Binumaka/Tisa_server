const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const nodemailer=require("nodemailer");
const User = require("../model/userModel");

const test = (req, res) => {
  res.json("test is working");
};

//register user
const registerUser = async (req, res) => {
  try{
    const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, role });
  user.save();
  const transporter= nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            protocol:"smtp",
            auth:{
                user:"binumaka9@gmail.com",
                pass:"miue lhwd jffs jpbw"
            }
        })
  
        const info=transporter.sendMail({
            from:"binumaka9@gmail.com",
            to:user.email,
            subject:"User Registration",
            html:`
            <h1>Your Registration has been Completed</h1>
            <p>your user id is ${user.id}</p>
            `
        })
  
        res.status(201).json({user,info})
    }catch (e) {
        res.json(e)
    }
};


//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const cred = await User.findOne({ email });
  if (!cred || !(await bcrypt.compare(password, cred.password))) {
    return res.status(403).send("Invalid email or password");
  }

  const token = jwt.sign(
    { username: cred.username, email: cred.email, role: cred.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ token, userId: cred._id }); 
};

// Find user by ID
const findUserById = async (req, res) => {
  try {
      const userId = req.user._id;
      const user = await User.findById(userId); 
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
};


//Forget password
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetCode = resetCode;
    user.resetCodeExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user:"binumaka9@gmail.com",
        pass:"miue lhwd jffs jpbw"
      },
    });

    const mailOptions = {
      from: 'Tisa <binumaka9@gmail.com>',
      to: user.email,
      subject: 'Tisa: Your Password Reset Code',
      html: `
        <h2>Enter this code to reset your password</h2>
        <h1>${resetCode}</h1>
        <p>This code will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Code sent to email' });
  } catch (error) {
    console.error('Error in forgetPassword:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

//reset password
const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (
      user.resetCode !== code ||
      !user.resetCodeExpires ||
      user.resetCodeExpires < Date.now()
    ) {
      return res.status(400).json({ error: 'Invalid or expired reset code' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  test,
  loginUser,
  findUserById,
  registerUser,
  forgetPassword,
  resetPassword,
};
