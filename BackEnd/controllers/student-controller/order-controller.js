// controllers/orderController.js

const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

/**
 * Ensure URL has protocol (defaults to https:// if missing)
 */
function ensureUrl(url) {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

/**
 * Create a PayPal order and save it, including redirect URLs
 */
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing
    } = req.body;

    // Save order first to get its ID
    const newOrder = new Order({
      userId,
      userName,
      userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "unpaid",
      orderDate: new Date(),
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing: Number(coursePricing)
    });
    await newOrder.save();

    // Prepare and validate CLIENT_URL
    const rawClientUrl = process.env.STUDENT_URL;
    const STUDENT_URL = ensureUrl(rawClientUrl);

    // Format price
    const priceStr = Number(coursePricing).toFixed(2);

    // Build PayPal payment JSON using validated CLIENT_URL
    const create_payment_json = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: `${STUDENT_URL}/payment-return`,
        cancel_url: `${STUDENT_URL}/payment-cancel`
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: courseTitle,
                sku: courseId,
                price: priceStr,
                currency: "USD",
                quantity: 1
              }
            ]
          },
          amount: { currency: "USD", total: priceStr },
          description: courseTitle
        }
      ]
    };

    // Create PayPal payment
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error("PayPal Create Error:", error.response?.details || error);
        return res.status(500).json({
          success: false,
          message: "Error while creating PayPal payment!",
          details: error.response?.details || error.message
        });
      }

      const approveUrl = paymentInfo.links.find(l => l.rel === "approval_url")?.href;
      if (!approveUrl) {
        console.error("Approval URL not found:", paymentInfo);
        return res.status(500).json({
          success: false,
          message: "Approval URL missing from PayPal response."
        });
      }

      // Respond with approveUrl and orderId
      res.status(201).json({
        success: true,
        data: { approveUrl, orderId: newOrder._id }
      });
    });

  } catch (err) {
    console.error("createOrder Exception:", err);
    res.status(500).json({
      success: false,
      message: "Server error while creating order.",
      error: err.message
    });
  }
};

/**
 * Capture PayPal payment and finalize order
 */
const capturePaymentAndFinalizeOrder = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    paypal.payment.execute(
      paymentId,
      { payer_id: payerId },
      async (error, paymentResult) => {
        if (error) {
          console.error("PayPal Execute Error:", error.response?.details || error);
          return res.status(500).json({
            success: false,
            message: "Error while capturing PayPal payment!",
            details: error.response?.details || error.message
          });
        }

        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.paymentId = paymentId;
        order.payerId = payerId;
        await order.save();

        const courseEntry = {
          courseId: order.courseId,
          title: order.courseTitle,
          instructorId: order.instructorId,
          instructorName: order.instructorName,
          dateOfPurchase: order.orderDate,
          courseImage: order.courseImage
        };

        let studentCourses = await StudentCourses.findOne({ userId: order.userId });
        if (studentCourses) {
          studentCourses.courses.push(courseEntry);
          await studentCourses.save();
        } else {
          studentCourses = new StudentCourses({ userId: order.userId, courses: [courseEntry] });
          await studentCourses.save();
        }

        await Course.findByIdAndUpdate(order.courseId, {
          $addToSet: {
            students: {
              studentId: order.userId,
              studentName: order.userName,
              studentEmail: order.userEmail,
              paidAmount: order.coursePricing
            }
          }
        });

        res.status(200).json({
          success: true,
          message: "Order confirmed and payment captured successfully",
          data: order
        });
      }
    );

  } catch (err) {
    console.error("capturePayment Exception:", err);
    res.status(500).json({
      success: false,
      message: "Server error while capturing payment.",
      error: err.message
    });
  }
};

module.exports = { createOrder, capturePaymentAndFinalizeOrder };
