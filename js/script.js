// Wait for page to load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Find the newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Add event listener for form submission
    newsletterForm.addEventListener('submit', function(event) {
        // Prevent form from actually submitting (which would reload page)
        event.preventDefault();
        
        // Get the email input value
        const emailInput = this.querySelector('input[type="email"]');
        const emailAddress = emailInput.value;
        
        // Basic email validation
        if (emailAddress && emailAddress.includes('@')) {
            // Show success message
            showMessage('Thanks for subscribing! You\'ll hear from me soon.', 'success');
            
            // Clear the input field
            emailInput.value = '';
            
            // Here you would normally send the email to your email service
            console.log('Email submitted:', emailAddress);
        } else {
            // Show error message
            showMessage('Please enter a valid email address.', 'error');
        }
    });
});

// Function to show messages to user
function showMessage(text, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = text;
    
    // Style the message
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.padding = '1rem 1.5rem';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.fontWeight = '500';
    messageDiv.style.zIndex = '10000';
    
    // Color based on type
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#27ae60';
        messageDiv.style.color = 'white';
    } else {
        messageDiv.style.backgroundColor = '#e74c3c';
        messageDiv.style.color = 'white';
    }
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Remove after 4 seconds
    setTimeout(function() {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 4000);
}