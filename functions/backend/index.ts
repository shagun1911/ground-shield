import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as twilio from "twilio";

// ------------------------------
// ENVIRONMENT VARIABLES
// ------------------------------
const TWILIO_SID = process.env.TWILIO_SID;           // your SID
const TWILIO_AUTH = process.env.TWILIO_AUTH;         // your Auth Token
const TWILIO_PHONE = process.env.TWILIO_PHONE;       // your Twilio number

// YOUR personal phone number to receive alerts
const ALERT_PHONE = "+919896941400"; // <-- your phone

// Init Twilio
const twilioClient = twilio(TWILIO_SID, TWILIO_AUTH);

// ---------------------------------------------------------
// FIRESTORE TRIGGER (ONLY SMS)
// ---------------------------------------------------------
export const notifyOnAlert = onDocumentCreated(
  "alerts/{alertId}",
  async (event) => {
    const alert = event.data?.data();
    if (!alert) {
      logger.error("Empty alert document.");
      return;
    }

    const smsMessage = `ALERT: ${alert.message} (Severity: ${alert.severity})`;

    // SEND SMS ONLY
    try {
      await twilioClient.messages.create({
        body: smsMessage,
        from: TWILIO_PHONE,   // Twilio number
        to: ALERT_PHONE       // Your number
      });

      logger.info("SMS sent to " + ALERT_PHONE);
    } catch (err) {
      logger.error("SMS sending failed:", err);
    }
  }
);
