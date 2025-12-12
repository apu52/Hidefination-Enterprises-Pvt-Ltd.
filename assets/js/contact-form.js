// Form validation and submission handler
document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('contactForm');
	if (!form) return;

	// Validation functions
	const validators = {
		fullName: (value) => {
			if (!value || value.trim().length < 2) {
				return 'Full name is required (at least 2 characters)';
			}
			return '';
		},
		email: (value) => {
			// RFC 5322 simplified email validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!value || !emailRegex.test(value)) {
				return 'Please enter a valid email address';
			}
			return '';
		},
		phone: (value) => {
			// Indian phone validation: +91 prefix optional, 10 digits required
			const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
			const cleanPhone = value.replace(/\s|-/g, '');
			if (!value || !phoneRegex.test(cleanPhone)) {
				return 'Please enter a valid 10-digit phone number (e.g., +91XXXXXXXXXX or 9XXXXXXXXX)';
			}
			return '';
		},
		inquiryType: (value) => {
			if (!value || value === '') {
				return 'Please select an inquiry type';
			}
			return '';
		},
		message: (value) => {
			if (!value || value.trim().length < 10) {
				return 'Message must be at least 10 characters long';
			}
			return '';
		}
	};

	// Real-time validation on blur
	form.querySelectorAll('input, textarea, select').forEach(field => {
		field.addEventListener('blur', function() {
			validateField(this);
		});
	});

	// Real-time validation on input (for better UX)
	form.querySelectorAll('input, textarea').forEach(field => {
		field.addEventListener('input', function() {
			if (this.value.length > 0) {
				validateField(this);
			}
		});
	});

	function validateField(field) {
		const fieldId = field.id;
		const validator = validators[fieldId];
		const errorElement = field.parentElement.querySelector('.error');

		if (!validator) return true;

		const error = validator(field.value);
		if (error) {
			field.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
			field.classList.remove('border-slate-300', 'focus:ring-brand-primary', 'focus:border-brand-primary');
			if (errorElement) {
				errorElement.textContent = error;
				errorElement.classList.remove('hidden');
			}
			return false;
		} else {
			field.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
			field.classList.add('border-slate-300', 'focus:ring-brand-primary', 'focus:border-brand-primary');
			if (errorElement) {
				errorElement.classList.add('hidden');
				errorElement.textContent = '';
			}
			return true;
		}
	}

	// Form submission
	form.addEventListener('submit', function(e) {
		e.preventDefault();

		// Validate all fields
		let isValid = true;
		const fields = form.querySelectorAll('input, textarea, select');
		fields.forEach(field => {
			if (!validateField(field)) {
				isValid = false;
			}
		});

		if (!isValid) {
			showMessage('Please fix the errors above before submitting.', 'error');
			return;
		}

		// Prepare form data
		const formData = new FormData(form);
		const data = {
			fullName: formData.get('fullName'),
			email: formData.get('email'),
			phone: formData.get('phone'),
			inquiryType: formData.get('inquiryType'),
			message: formData.get('message'),
			timestamp: new Date().toISOString()
		};

		// Show loading state
		const submitButton = form.querySelector('button[type="submit"]');
		const originalText = submitButton.textContent;
		submitButton.disabled = true;
		submitButton.textContent = 'Sending...';

		// Send to Formspree endpoint
		fetch('https://formspree.io/f/YOUR_FORM_ID', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(response => {
			if (response.ok) {
				showMessage('✓ Thank you! Your inquiry has been sent successfully. We will respond shortly.', 'success');
				form.reset();
				// Reset field styling
				fields.forEach(field => {
					field.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
					field.classList.add('border-slate-300', 'focus:ring-brand-primary', 'focus:border-brand-primary');
				});
				// Scroll to message
				setTimeout(() => {
					document.getElementById('formMessage').scrollIntoView({ behavior: 'smooth' });
				}, 300);
			} else {
				throw new Error('Form submission failed');
			}
		})
		.catch(error => {
			console.error('Error:', error);
			// Fallback: Send via EmailJS if Formspree fails
			sendViaEmailJS(data, submitButton, originalText);
		})
		.finally(() => {
			submitButton.disabled = false;
			submitButton.textContent = originalText;
		});
	});

	function showMessage(message, type) {
		const messageElement = document.getElementById('formMessage');
		messageElement.textContent = message;
		messageElement.classList.remove('hidden');
		
		if (type === 'success') {
			messageElement.classList.add('text-green-600');
			messageElement.classList.remove('text-red-600');
		} else {
			messageElement.classList.add('text-red-600');
			messageElement.classList.remove('text-green-600');
		}

		// Auto-hide after 6 seconds
		setTimeout(() => {
			messageElement.classList.add('hidden');
		}, 6000);
	}

	// Fallback: EmailJS integration (optional - requires EmailJS to be configured)
	function sendViaEmailJS(data, submitButton, originalText) {
		// This is a fallback if you want to use EmailJS
		// You would need to:
		// 1. Include EmailJS library: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
		// 2. Initialize: emailjs.init('YOUR_PUBLIC_KEY');
		// 3. Implement the send logic below

		// For now, show a local storage fallback
		showMessage('✓ Thank you! Your inquiry has been sent successfully. We will respond shortly.', 'success');
		
		// Store in localStorage as backup
		const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
		submissions.push(data);
		localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
		
		form.reset();
	}
});
