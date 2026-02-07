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

// =====================================================
// BLOG TAG FILTERING
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the blog page
    const tagFilterContainer = document.querySelector('.tag-filters');
    const postCards = document.querySelectorAll('.post-card');
    const postCountElement = document.querySelector('.post-count');

    if (!tagFilterContainer || postCards.length === 0) {
        // Not on blog page, exit early
        return;
    }

    // Collect all unique tags from posts
    const allTags = new Set();
    postCards.forEach(function(card) {
        const tags = card.getAttribute('data-tags');
        if (tags) {
            tags.split(',').forEach(function(tag) {
                allTags.add(tag.trim());
            });
        }
    });

    // Create tag buttons dynamically
    allTags.forEach(function(tag) {
        const button = document.createElement('button');
        button.className = 'tag-btn';
        button.setAttribute('data-tag', tag);
        button.textContent = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ');
        tagFilterContainer.appendChild(button);
    });

    // Get all tag buttons (including "All Posts")
    const tagButtons = document.querySelectorAll('.tag-btn');

    // Function to filter posts by tag
    function filterPosts(selectedTag) {
        let visibleCount = 0;

        postCards.forEach(function(card) {
            const cardTags = card.getAttribute('data-tags');

            if (selectedTag === 'all' || (cardTags && cardTags.includes(selectedTag))) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update post count
        if (postCountElement) {
            const postText = visibleCount === 1 ? 'post' : 'posts';
            postCountElement.textContent = 'Showing ' + visibleCount + ' ' + postText;
        }
    }

    // Function to update active button
    function updateActiveButton(activeButton) {
        tagButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Add click listeners to tag buttons
    tagButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const tag = this.getAttribute('data-tag');
            filterPosts(tag);
            updateActiveButton(this);
        });
    });

    // Initialize: show all posts and set "All Posts" as active
    const allButton = document.querySelector('.tag-btn[data-tag="all"]');
    if (allButton) {
        filterPosts('all');
        updateActiveButton(allButton);
    }
});