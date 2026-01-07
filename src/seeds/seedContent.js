import mongoose from "mongoose";
import dotenv from "dotenv";
import ContentData from "../module/contentData/contentData.model.js";
import { connectDB } from "../db/connectDB.js";

dotenv.config();

const shippingInfo = [
  {
    id: 1,
    title: "Order Placement",
    icon: "🛒",
    content:
      "When you find a product you like on Smart Wear, simply click the link to be redirected to Amazon's official product page. There, you can review all purchase details — including shipping options, estimated delivery dates, and seller ratings — before completing your order securely on Amazon.",
  },
  {
    id: 2,
    title: "Shipping Responsibility",
    icon: "📦",
    content:
      "Once you complete your order on Amazon, all shipping, packaging, and delivery will be handled by Amazon or the Amazon-verified seller. Smart Wear does not store, ship, or process any products.",
  },
  {
    id: 3,
    title: "Delivery Timeframes",
    icon: "⏱️",
    content:
      "Delivery times vary depending on several factors: The seller's location and shipping method, your delivery address or region, the availability of the product, and whether you're an Amazon Prime member. Estimated delivery times will always be displayed on the product's Amazon page before checkout.",
  },
  {
    id: 4,
    title: "Tracking Your Order",
    icon: "📍",
    content:
      "Once you place your order on Amazon, you can easily track your shipment through your Amazon account. Amazon provides real-time updates, including dispatch confirmation, carrier details, and estimated delivery times.",
  },
  {
    id: 5,
    title: "Shipping Costs",
    icon: "💰",
    content:
      "Shipping costs are determined by Amazon or the product's seller. These may vary depending on your location, delivery speed, and product size or weight. For most Prime-eligible items, free shipping is available for Prime members.",
  },
  {
    id: 6,
    title: "Delays & Delivery Issues",
    icon: "⚠️",
    content:
      "If your order is delayed, damaged, or lost in transit, please contact Amazon Customer Service directly. They provide dedicated support to resolve such issues quickly. Smart Wear has no control over Amazon's delivery operations but will gladly help direct you to the correct support resources.",
  },
  {
    id: 7,
    title: "International Shipping",
    icon: "🌍",
    content:
      "Many Amazon sellers offer international delivery. If you're shopping from outside your country, check the product page for availability and shipping eligibility to your region.",
  },
  {
    id: 8,
    title: "Our Role",
    icon: "🎯",
    content:
      "Smart Wear acts solely as an affiliate partner that helps users discover and compare stylish T-shirts conveniently in one place. We do not intervene in the transaction or fulfillment process — your purchase agreement is strictly between you and Amazon (or the Amazon seller).",
  },
];

const privacyPolicySections = [
  {
    id: 1,
    title: "About Smart Wear",
    icon: "👕",
    content:
      "Smart Wear is an affiliate-based eCommerce platform that showcases fashionable and high-quality T-shirts and apparel. Our goal is to help visitors discover great clothing options available on Amazon. When you click on a product listed on our website, you are redirected to Amazon to complete your purchase. Because we do not sell products directly, we do not collect or store your payment or order information. All transactions are processed securely on Amazon's website, under Amazon's own Privacy Policy and Terms of Service.",
  },
  {
    id: 2,
    title: "Information We Collect",
    icon: "📊",
    content:
      "When you visit our website, we may collect two types of information:",
    subsections: [
      {
        title: "Personal Information (You Provide Voluntarily)",
        content:
          "We do not collect personal data such as your name, address, or payment details for transactions. However, if you contact us via our contact form or email, we may collect information such as your name, email address, and any message or inquiry you submit. This information is used solely to respond to your inquiries or feedback.",
      },
      {
        title: "Non-Personal / Automatic Information",
        content:
          "When you browse our website, we may automatically collect limited, non-identifiable data to improve user experience. This may include your IP address, browser type and version, device type and operating system, pages you visited and time spent on the site, referring and exit pages, and clicks and link interactions (including clicks to Amazon). This information is collected through cookies and analytics tools.",
      },
    ],
  },
  {
    id: 3,
    title: "Use of Collected Information",
    icon: "🔍",
    content: "We may use the collected information for the following purposes:",
    list: [
      "To personalize and improve your browsing experience on Smart Wear",
      "To monitor website performance and detect technical issues",
      "To analyze user behavior and trends for site optimization",
      "To communicate with you when you reach out through our contact form",
      "To comply with applicable laws and regulations",
    ],
    note: "We do not sell, rent, or trade any user information with third parties for marketing purposes.",
  },
  {
    id: 4,
    title: "Cookies and Tracking Technologies",
    icon: "🍪",
    content:
      "Smart Wear uses cookies and similar technologies to enhance your browsing experience. Cookies are small text files placed on your device to help us recognize repeat visitors, store preferences, and analyze site performance. We may also use third-party cookies (e.g., Google Analytics or Amazon affiliate tracking cookies) to gather anonymous statistical information and to track clicks for affiliate commissions. You can control or disable cookies through your browser settings. However, disabling cookies may affect some website features or functionality.",
  },
  {
    id: 5,
    title: "Third-Party Links and Services",
    icon: "🔗",
    content:
      "Our website contains links to Amazon and possibly other third-party websites. Once you leave Smart Wear and visit another site, we have no control over how that site collects or uses your information. We strongly encourage you to read the Privacy Policy of any third-party website you visit — especially Amazon — to understand their data collection, storage, and sharing practices. Smart Wear is not responsible for the privacy practices, content, or security of external sites.",
  },
  {
    id: 6,
    title: "Data Security",
    icon: "🛡️",
    content:
      "We take reasonable administrative and technical measures to protect the limited data we collect against unauthorized access, alteration, disclosure, or destruction. Our website uses secure hosting and modern encryption methods to maintain data integrity. However, please note that no system or data transmission over the internet can be guaranteed to be 100% secure. While we strive to protect your information, you use our website at your own risk.",
  },
  {
    id: 7,
    title: "Data Retention",
    icon: "💾",
    content:
      "We only retain personal information (such as email messages from contact forms) for as long as necessary to fulfill the purpose for which it was collected or as required by law. Non-personal data (like analytics) may be stored for statistical purposes but remains anonymous.",
  },
  {
    id: 8,
    title: "Children's Privacy",
    icon: "👶",
    content:
      "Smart Wear is intended for general audiences and is not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately, and we will take steps to delete it.",
  },
  {
    id: 9,
    title: "Affiliate Disclosure",
    icon: "🤝",
    content:
      "Smart Wear participates in affiliate marketing programs, including the Amazon Associates Program. This means we may earn a commission when users click product links and make purchases on Amazon. This commission helps us operate and maintain our website at no additional cost to you. Affiliate tracking uses cookies to identify when a click from Smart Wear leads to a purchase on Amazon. No personal data is shared with us through this process.",
  },
  {
    id: 10,
    title: "Your Rights and Choices",
    icon: "⚖️",
    content:
      "Depending on your location, you may have certain data protection rights, such as:",
    list: [
      "The right to access the data we hold about you",
      "The right to request correction or deletion of your data",
      "The right to restrict or object to certain data uses",
      "The right to withdraw consent (if applicable)",
    ],
    note: "If you wish to exercise any of these rights, please contact us through our Contact page.",
  },
  {
    id: 11,
    title: "Changes to This Privacy Policy",
    icon: "🔄",
    content:
      "We may update this Privacy Policy periodically to reflect changes in our practices, technologies, or legal requirements. The updated version will be posted on this page with the revised effective date. We encourage you to review this page occasionally to stay informed about how we protect your information.",
  },
  {
    id: 12,
    title: "Contact Us",
    icon: "📞",
    content:
      "If you have any questions, concerns, or feedback regarding our Privacy Policy or data handling practices, please contact us through our Contact page or email us at [your@email.com]. We will do our best to respond promptly and address your concerns.",
  },
];

const faqItems = [
  {
    id: 1,
    question: "How do I place an order?",
    answer:
      "Browsing and selecting products on Smart Wear is simple! Once you find a T-shirt you love, click the 'Buy on Amazon' button. You will be redirected to Amazon’s product page where you can choose your size, color, and complete the checkout process securely.",
    icon: "🛒",
  },
  {
    id: 2,
    question: "Do you ship internationally?",
    answer:
      "Since all purchases are handled by Amazon, shipping availability depends on the specific seller and Amazon's shipping policies. Check the product page on Amazon to see if the item ships to your location.",
    icon: "🌍",
  },
  {
    id: 3,
    question: "What depends on the shipping cost?",
    answer:
      "Shipping costs are determined by Amazon and the individual sellers. If you are an Amazon Prime member, you may qualify for free shipping on eligible items. Always check the shipping details on the Amazon checkout page.",
    icon: "",
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer:
      "After placing an order on Amazon, you can track it directly through your Amazon 'Orders' section. Amazon provides real-time tracking updates from dispatch to delivery.",
    icon: "📦",
  },
  {
    id: 5,
    question: "What is your return policy?",
    answer:
      "All returns and exchanges are managed by Amazon. Most items purchased on Amazon can be returned within 30 days of receipt, but policies vary by seller. Please review the return policy on the specific Amazon product page.",
    icon: "🔄",
  },
  {
    id: 6,
    question: "Is it safe to buy through Smart Wear?",
    answer:
      "Yes, absolutely! We do not process payments or collect sensitive personal data. All transactions happen securely on Amazon, ensuring you get the same buyer protection and security you trust.",
    icon: "🛡️",
  },
  {
    id: 7,
    question: "Why should I buy through Smart Wear?",
    answer:
      "We curate the best and most stylish T-shirts to save you time searching. Our collections are handpicked to ensure quality and style, making your shopping experience easier and more enjoyable.",
    icon: "⭐",
  },
];

const returnPolicySections = [
  {
    id: 1,
    title: "Amazon Handles All Orders",
    icon: "📦",
    content:
      "When you click a product link on Smart Wear and make a purchase on Amazon:",
    list: [
      "Your order is processed entirely through Amazon's secure checkout system",
      "Shipping, delivery, returns, and refunds are managed by Amazon or the seller",
      "Smart Wear does not store payment details or manage order fulfillment",
    ],
  },
  {
    id: 2,
    title: "Returns and Exchanges",
    icon: "🔄",
    content:
      "All requests for returns, exchanges, or refunds must be submitted directly through Amazon. The process may vary depending on:",
    list: [
      "The seller's individual return policy",
      "The product type and condition",
      "Your location and delivery method",
    ],
    process: {
      title: "To initiate a return:",
      steps: [
        "Log in to your Amazon account",
        "Go to Your Orders",
        "Select the product you want to return",
        "Follow Amazon's on-screen instructions to complete the return or exchange request",
      ],
    },
    note: "Amazon provides detailed instructions, shipping labels (if applicable), and estimated timelines for receiving your refund or replacement.",
  },
  {
    id: 3,
    title: "Return Eligibility",
    icon: "✅",
    content: "Return eligibility depends on:",
    list: [
      "The seller's stated policy for the product",
      "Condition of the item (e.g., unused, undamaged, original packaging)",
      "Timing of your return request",
    ],
    note: "Please review the product's Amazon listing for the most accurate and up-to-date return eligibility information.",
  },
  {
    id: 4,
    title: "Refunds",
    icon: "💰",
    content:
      "Refunds are issued directly by Amazon to your original payment method. The time it takes to receive a refund depends on Amazon's processing time and your financial institution.",
    warning:
      "Smart Wear does not handle, process, or guarantee refunds, as all transactions occur on Amazon.",
  },
  {
    id: 5,
    title: "Damaged or Incorrect Products",
    icon: "⚠️",
    content:
      "If you receive a product that is damaged, defective, or not as described:",
    list: [
      "Contact Amazon Customer Service immediately",
      "They will guide you through the return, replacement, or refund process",
    ],
    warning: "Smart Wear cannot replace or refund items directly.",
  },
  {
    id: 6,
    title: "International Orders",
    icon: "🌍",
    content:
      "For international purchases, returns and refunds are subject to the seller's policies and Amazon's shipping rules. Delivery times, return procedures, and shipping fees may vary by country.",
  },
  {
    id: 7,
    title: "Smart Wear's Role",
    icon: "🎯",
    content:
      "Smart Wear acts solely as a product discovery platform and affiliate partner. We are committed to helping you find high-quality T-shirts easily, but we do not manage orders, shipments, or returns.",
    note: "For any questions regarding Amazon orders, shipping, or returns, please contact Amazon Customer Service or consult your order details in your Amazon account.",
  },
  {
    id: 8,
    title: "Need Assistance?",
    icon: "💁",
    content:
      "If you encounter issues with a product link or need guidance on navigating Amazon's return process, you can contact us through our Contact page.",
    note: "While we cannot process returns directly, we'll gladly help you find the correct resources.",
  },
];

const cookieTypes = [
  {
    type: "Strictly Necessary Cookies",
    purpose:
      "Required for the website to function properly. Without these, some features may not work.",
    examples: "Session cookies, security cookies",
  },
  {
    type: "Performance Cookies",
    purpose:
      "Collect data about website usage to improve functionality and content.",
    examples: "Analytics cookies",
  },
  {
    type: "Functionality Cookies",
    purpose: "Remember user preferences and choices.",
    examples: "Language settings, display preferences",
  },
  {
    type: "Affiliate Cookies",
    purpose: "Track clicks to Amazon and help us earn commissions.",
    examples: "Amazon Associates cookies",
  },
  {
    type: "Advertising Cookies",
    purpose:
      "May be used by third parties (like Amazon) to display relevant ads based on browsing history.",
    examples: "Amazon Ad Services cookies",
  },
];

const cookiePolicySections = [
  {
    id: 1,
    title: "What Are Cookies?",
    icon: "🍪",
    content:
      "Cookies are small text files that websites store on your computer or mobile device when you visit them. They help websites remember your actions and preferences (such as login details, language, and browsing behavior) over a certain period of time. Cookies are widely used to make websites function efficiently, analyze performance, and deliver personalized experiences to users.",
  },
  {
    id: 2,
    title: "How Smart Wear Uses Cookies",
    icon: "🔍",
    content:
      "Smart Wear uses cookies to enhance your browsing experience, improve website functionality, and analyze user activity. We do not use cookies to collect personal or financial information such as names, payment details, or addresses. Here are the main ways we use cookies:",
    list: [
      "Performance and Analytics Cookies: These help us understand how visitors use our website — which pages they visit most, how long they stay, and how they navigate.",
      "Affiliate Tracking Cookies: Smart Wear participates in the Amazon Associates Program, which uses affiliate tracking cookies to track when you click on Amazon product links.",
      "Functionality Cookies: These cookies allow our site to remember certain preferences such as your language, display settings, or region.",
      "Security Cookies: Certain cookies help ensure our site's security by detecting suspicious or malicious activity.",
    ],
  },
  {
    id: 3,
    title: "Third-Party Cookies",
    icon: "🔗",
    content:
      "In addition to our own cookies, we may use third-party cookies provided by trusted partners, such as:",
    list: [
      "Amazon: to track affiliate link clicks and attribute sales for commission purposes.",
      "Google Analytics (or similar tools): to gather anonymous statistical data about site usage, user behavior, and traffic sources.",
    ],
    note: "These third-party services have their own privacy and cookie policies. Once you leave Smart Wear and go to Amazon or another external site, their policies will apply.",
  },
  {
    id: 5,
    title: "Managing and Controlling Cookies",
    icon: "⚙️",
    content:
      "You have full control over how cookies are used on your device. You can:",
    list: [
      "Accept or reject cookies when you first visit our site (via the cookie consent banner).",
      "Change your cookie settings in your browser at any time.",
      "Delete existing cookies stored on your device.",
    ],
    browsers: [
      { name: "Google Chrome", url: "#" },
      { name: "Mozilla Firefox", url: "#" },
      { name: "Microsoft Edge", url: "#" },
      { name: "Safari", url: "#" },
    ],
    warning:
      "Disabling cookies may affect how some parts of our website function. Some features may not display correctly or work as intended.",
  },
  {
    id: 6,
    title: "How Long Cookies Stay on Your Device",
    icon: "⏰",
    content: "Cookies may remain on your device for varying lengths of time:",
    list: [
      "Session Cookies: Automatically deleted when you close your browser.",
      "Persistent Cookies: Remain stored on your device until they expire or you manually delete them.",
    ],
    note: "We set cookies for the shortest reasonable duration necessary for their purpose.",
  },
  {
    id: 7,
    title: "Changes to This Cookie Policy",
    icon: "🔄",
    content:
      "Smart Wear may update this Cookie Policy periodically to reflect changes in technology, legal requirements, or our own practices. When we make changes, we'll update the 'Effective Date' at the top of this page. We encourage you to review this page occasionally to stay informed about how we use cookies.",
  },
  {
    id: 8,
    title: "Your Consent",
    icon: "✅",
    content:
      "By continuing to browse and use Smart Wear, you consent to our use of cookies as described in this policy. You may withdraw your consent at any time by adjusting your browser settings or rejecting cookies through our website banner.",
  },
  {
    id: 9,
    title: "Contact Us",
    icon: "📞",
    content:
      "If you have questions or concerns about our Cookie Policy or how we use tracking technologies, please reach out to us through our Contact page or email us at [your@email.com]. We'll be happy to explain more or help you manage your cookie preferences.",
  },
];

const contactUs = {
  address: "Texas 3,Webster,TX,77598 ,USA",
  phones: ["+1 -832-788-6738", "+1 -832-788-6738"],
  socials: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    tiktok: "#",
  },
  hours: {
    sunday_thursday: "9:00 AM - 6:00 PM",
    friday_saturday: "Closed",
  },
};

const seedData = async () => {
  try {
    await connectDB();

    await ContentData.findOneAndUpdate(
      { slug: "shipping-delivery" },
      { content: shippingInfo },
      { upsert: true }
    );
    console.log("Seeded shipping-delivery");

    await ContentData.findOneAndUpdate(
      { slug: "privacy-policy" },
      { content: privacyPolicySections },
      { upsert: true }
    );
    console.log("Seeded privacy-policy");

    await ContentData.findOneAndUpdate(
      { slug: "faq" },
      { content: faqItems },
      { upsert: true }
    );
    console.log("Seeded faq");

    await ContentData.findOneAndUpdate(
      { slug: "return-policy" },
      { content: returnPolicySections },
      { upsert: true }
    );
    console.log("Seeded return-policy");

    await ContentData.findOneAndUpdate(
      { slug: "cookie-policy" },
      { content: { sections: cookiePolicySections, cookieTypes } },
      { upsert: true }
    );
    console.log("Seeded cookie-policy");

    await ContentData.findOneAndUpdate(
      { slug: "contact-us" },
      { content: contactUs },
      { upsert: true }
    );
    console.log("Seeded contact-us");

    console.log("Seeding complete");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
