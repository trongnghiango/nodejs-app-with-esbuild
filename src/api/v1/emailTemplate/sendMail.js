const { Resend } = require("resend");
const { emailVerfication, passwordVerfication } = require("./emailVerfication");

const sendMail = async ({
  email,
  name,
  link,
  bluewater_app_email = "onboarding@resend.dev",
  subject = "Verify your email | bluewater",
  type = "emailVerfication",
}) => {
  const resend = new Resend(process.env.RESEND_API);

  console.log(process.env.RESEND_API);
  const { data } = await resend.emails.send({
    from: bluewater_app_email,
    to: email,
    subject,
    html:
      type === "emailVerfication"
        ? emailVerfication({ name, link })
        : passwordVerfication({ name, link }),
  });

  return data;
};

module.exports = sendMail;
