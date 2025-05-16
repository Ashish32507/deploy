import OAuth from "oauth-1.0a";
import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const oauth = OAuth({
  consumer: {
    key: process.env.WOO_CONSUMER_KEY,
    secret: process.env.WOO_CONSUMER_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base, key) {
    return crypto.createHmac("sha1", key).update(base).digest("base64");
  },
});

export const createWooProduct = async (product) => {
  const url = `${process.env.WOO_BASE_URL}/products`;
  const requestData = {
    url,
    method: "POST",
    data: {
      name: product.pdName,
      type: "simple",
      regular_price: product.pdPrice.toString(),
      description: product.pdDescription,
      images: [{ src: product.pdImageURL }],
    },
  };

  const authHeader = oauth.toHeader(oauth.authorize(requestData));
  try {
    const res = await axios.post(url, requestData.data, {
      headers: {
        ...authHeader,
        "Content-Type": "application/json",
      },
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.error("WooCommerce Sync Error:", err.response?.data || err.message);
    return { success: false };
  }
};
