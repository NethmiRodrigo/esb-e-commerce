const express = require("express");
const router = express.Router();

const generateOTP = () => {
  let possible = "1234567890";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.post("/", async (req, res, next) => {
  try {
    const { cardName, cardNumber, ExpDate, CVN, Fee } = req.body;

    const payload = {
      cardName: cardName,
      cardNumber: cardNumber,
      ExpDate: ExpDate,
      CVN: CVN,
      Fee: Fee,
    };

    const result = { data: "Payment Successful" };

    res.json(result);
  } catch (err) {
    console.error(`Error while creating a delivery item`, err.message);
    next(err);
  }
});

router.post("/send-otp", async (req, res, next) => {
  const { mobileNumber } = req.body;
  const otp = generateOTP();
  await axios.post(
    "http://send.ozonedesk.com/api/v2/send.php?user_id=104665&api_key=o8qb4pq5ztwmj636o&sender_id=ozoneDEMO",
    { to: mobileNumber, message: otp }
  );
});

module.exports = router;
