const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const nodemailer = require('nodemailer');

// Configure nodemailer transporter - only if credentials exist
let transporter;
try {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    console.log('Email transport configured successfully');
  } else {
    console.log('Email credentials missing, email notifications will be disabled');
  }
} catch (error) {
  console.error('Failed to configure email transport:', error);
}

// POST /api/subscribe - Subscribe with email
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return res.status(400).json({ message: 'Email is already subscribed' });
      } else {
        // Reactivate the subscription
        existingSubscriber.active = true;
        await existingSubscriber.save();
        
        // Try to send welcome back email, but continue if it fails
        if (transporter) {
          try {
            await sendWelcomeEmail(email, true);
          } catch (emailError) {
            console.error('Failed to send welcome back email:', emailError);
            // We don't return an error here, just log it
          }
        }
        
        return res.status(200).json({ message: 'Subscription reactivated successfully' });
      }
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Try to send confirmation email, but continue if it fails
    if (transporter) {
      try {
        await sendWelcomeEmail(email, false);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // We don't return an error here, just log it
      }
    }

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/subscribe/unsubscribe - Unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({ message: 'Email not found in subscribers list' });
    }

    subscriber.active = false;
    await subscriber.save();

    res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper function to send welcome email
async function sendWelcomeEmail(email, isReactivation) {
  // Only send emails if transporter is configured
  if (!transporter) {
    console.log('Email transport not configured, skipping welcome email');
    return;
  }

  try {
    const subject = isReactivation 
      ? 'Welcome Back to CricXify!'
      : 'Welcome to CricXify!';
    
    const content = isReactivation
      ? `<h1>Welcome Back to CricXify!</h1>
         <p>We're thrilled to have you back! You'll now receive the latest cricket updates, news, and exclusive content.</p>`
      : `<h1>Welcome to CricXify!</h1>
         <p>Thank you for subscribing to our newsletter! You'll receive the latest cricket updates, news, and exclusive content.</p>`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          ${content}
          <p>Stay tuned for exciting cricket news and updates!</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p>If you wish to unsubscribe, <a href="https://cricxify.com/unsubscribe?email=${email}">click here</a>.</p>
            <p>CricXify Team</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

// Helper function to send general newsletter
async function sendNewsletter(subject, content) {
  // Only send emails if transporter is configured
  if (!transporter) {
    console.log('Email transport not configured, skipping newsletter');
    return;
  }
  
  try {
    const subscribers = await Subscriber.find({ active: true });
    const emails = subscribers.map(sub => sub.email);
    
    if (emails.length === 0) {
      console.log('No active subscribers to send newsletter to');
      return;
    }
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      bcc: emails, // Using BCC for privacy
      subject: subject,
      html: content
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Newsletter sent to ${emails.length} subscribers`);
  } catch (error) {
    console.error('Error sending newsletter:', error);
    throw error;
  }
}

module.exports = router;