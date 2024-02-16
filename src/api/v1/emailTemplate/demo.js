require("dotenv").config();
const sendMail = require("./sendMail");

async function demo() {
  await sendMail({
    email: ["nghiangogv@gmail.com"],
    name: "NGHIA",
    link: "https://google.com",
  });
}

demo();
