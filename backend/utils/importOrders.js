import mongoose from "mongoose";
import xlsx from "xlsx";
import { Order } from "../models/order.model.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/TrackDeck";

const USER_ID = "69d24cfa775cdf99b5a85ff6";

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Mongo connected");

  const workbook = xlsx.readFile("./utils/Deals.xlsx");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  const orders = data
    .filter(row => row["Product name"]) // skip empty rows
    .map((row, index) => {
      return {
        user: USER_ID,

        feedback: {
          type: "Other",
        },

        product: {
          orderId: `ORD-${Date.now()}-${index}`,
          displayName: row["Product name"] || "Unknown",
          originalName: row["Product name"] || "Unknown",
          accountInfo: row["Account"] || "N/A",
          platform: row["Platform"] || "Other",
          condition: "Other",
          price: Number(row["Price"]) || 0,
          less: 0,
        },

        dealer: {
          info: {
            name: row["Dealer Name"] || "Unknown",
            phoneNumber: "9999999999",
            telegramId: "",
          },
          platform: "Whatsapp",
        },

        timeline: {
          orderPlacedAt: new Date(),
          formSubmittedAt: new Date(),
        },

        refund: {
          status: "Pending",
          amount: Number(row["Refund Amt."]) || 0,
        },

        notes: `Imported from Excel`,
      };
    });

  console.log(`🚀 Inserting ${orders.length} orders...`);

  await Order.insertMany(orders);

  console.log("✅ Import complete");
  process.exit();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});