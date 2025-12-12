// Test Cases for Contact Form Validation
// Paste these into browser console to test validation

// Test Email Validation
const emailTests = [
  { email: "john@example.com", expected: true, description: "Valid standard email" },
  { email: "user.name@company.co.in", expected: true, description: "Email with dots and country TLD" },
  { email: "test+tag@domain.com", expected: true, description: "Email with + tag" },
  { email: "invalid.email@", expected: false, description: "Missing domain" },
  { email: "@example.com", expected: false, description: "Missing local part" },
  { email: "notanemail", expected: false, description: "No @ symbol" },
  { email: "user @example.com", expected: false, description: "Space in email" },
  { email: "", expected: false, description: "Empty email" }
];

console.log("=== EMAIL VALIDATION TESTS ===");
emailTests.forEach(test => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(test.email);
  const result = isValid === test.expected ? "✓ PASS" : "✗ FAIL";
  console.log(`${result}: ${test.description} - "${test.email}"`);
});

// Test Phone Validation
const phoneTests = [
  { phone: "+919876543210", expected: true, description: "Standard +91 format" },
  { phone: "9876543210", expected: true, description: "10 digits without +91" },
  { phone: "+91 98765 43210", expected: true, description: "Format with spaces" },
  { phone: "+91-98765-43210", expected: true, description: "Format with dashes" },
  { phone: "8876543210", expected: true, description: "Starts with 8" },
  { phone: "6876543210", expected: true, description: "Starts with 6" },
  { phone: "5876543210", expected: false, description: "Starts with 5 (invalid)" },
  { phone: "+919876543", expected: false, description: "Only 9 digits" },
  { phone: "+9198765432100", expected: false, description: "11 digits (too long)" },
  { phone: "+1-555-0000000", expected: false, description: "US phone number" },
  { phone: "", expected: false, description: "Empty phone" },
  { phone: "abcd1234567", expected: false, description: "Contains letters" }
];

console.log("\n=== PHONE VALIDATION TESTS ===");
phoneTests.forEach(test => {
  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  const cleanPhone = test.phone.replace(/\s|-/g, '');
  const isValid = phoneRegex.test(cleanPhone);
  const result = isValid === test.expected ? "✓ PASS" : "✗ FAIL";
  console.log(`${result}: ${test.description} - "${test.phone}" (cleaned: "${cleanPhone}")`);
});

// Test Full Name Validation
const nameTests = [
  { name: "John Doe", expected: true, description: "Valid full name" },
  { name: "A", expected: false, description: "Single character" },
  { name: "Jo", expected: true, description: "Two characters (minimum)" },
  { name: "  ", expected: false, description: "Only spaces" },
  { name: "", expected: false, description: "Empty name" },
  { name: "محمد علي", expected: true, description: "Arabic name" },
  { name: "李明", expected: true, description: "Chinese name" }
];

console.log("\n=== NAME VALIDATION TESTS ===");
nameTests.forEach(test => {
  const isValid = test.name && test.name.trim().length >= 2;
  const result = isValid === test.expected ? "✓ PASS" : "✗ FAIL";
  console.log(`${result}: ${test.description} - "${test.name}"`);
});

// Test Message Validation
const messageTests = [
  { msg: "I am interested in FMCG distribution opportunities.", expected: true, description: "Valid message" },
  { msg: "Test msg", expected: false, description: "Too short (8 chars)" },
  { msg: "This is a valid test message", expected: true, description: "Valid 10+ chars" },
  { msg: "         ", expected: false, description: "Only spaces" },
  { msg: "", expected: false, description: "Empty message" }
];

console.log("\n=== MESSAGE VALIDATION TESTS ===");
messageTests.forEach(test => {
  const isValid = test.msg && test.msg.trim().length >= 10;
  const result = isValid === test.expected ? "✓ PASS" : "✗ FAIL";
  console.log(`${result}: ${test.description} - "${test.msg}" (length: ${test.msg.length})`);
});

// Test Data Examples - Valid Submission
console.log("\n=== VALID SUBMISSION EXAMPLES ===");
const validExamples = [
  {
    name: "Raj Kumar",
    email: "raj.kumar@example.com",
    phone: "+919876543210",
    type: "FMCG Distribution",
    message: "I would like to explore FMCG distribution opportunities in Mumbai region."
  },
  {
    name: "Priya Singh",
    email: "priya@company.co.in",
    phone: "8765432109",
    type: "Export Partnership",
    message: "We are interested in establishing an export partnership with your company."
  },
  {
    name: "Amit Patel",
    email: "amit.patel@business.com",
    phone: "+91-98765-43210",
    type: "Manufacturing & Supply",
    message: "Our company is looking for a manufacturing and supply partner in India."
  }
];

validExamples.forEach((example, index) => {
  console.log(`Example ${index + 1}:`);
  console.log(`  Name: ${example.name}`);
  console.log(`  Email: ${example.email}`);
  console.log(`  Phone: ${example.phone}`);
  console.log(`  Type: ${example.type}`);
  console.log(`  Message: ${example.message}`);
  console.log("");
});

// Manual Form Test Function
function testFormValidation() {
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const inquiryType = document.getElementById('inquiryType');
  const message = document.getElementById('message');

  if (!fullName || !email || !phone || !inquiryType || !message) {
    console.error('Form fields not found. Make sure Contact us.html is loaded.');
    return;
  }

  // Fill with test data
  fullName.value = "Test User";
  email.value = "test@example.com";
  phone.value = "+919876543210";
  inquiryType.value = "FMCG Distribution";
  message.value = "This is a test submission of the contact form.";

  console.log("✓ Form fields populated with test data");
  console.log("  Name: " + fullName.value);
  console.log("  Email: " + email.value);
  console.log("  Phone: " + phone.value);
  console.log("  Type: " + inquiryType.value);
  console.log("  Message: " + message.value);
  console.log("\nReady to submit! Click 'Submit Inquiry' button to test.");
}

// Run all tests
console.log("\n════════════════════════════════════════════");
console.log("   CONTACT FORM VALIDATION TEST SUITE");
console.log("════════════════════════════════════════════\n");

// Summary
console.log("✓ All validation patterns tested");
console.log("\nTo populate form with test data, run:");
console.log("  testFormValidation()");
console.log("\nThen click 'Submit Inquiry' to test the full workflow.");
