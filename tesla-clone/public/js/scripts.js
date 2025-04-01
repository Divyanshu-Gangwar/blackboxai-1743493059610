// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // FAQ Accordion functionality
  const faqButtons = document.querySelectorAll('.faq button');
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const icon = button.querySelector('i');
      
      // Toggle answer visibility
      answer.classList.toggle('hidden');
      answer.classList.toggle('block');
      
      // Rotate chevron icon
      icon.classList.toggle('fa-chevron-down');
      icon.classList.toggle('fa-chevron-up');
    });
  });

  // Car configuration selection
  const configOptions = document.querySelectorAll('.config-option');
  configOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove active class from all options
      configOptions.forEach(opt => {
        opt.classList.remove('border-tesla-red');
        opt.classList.add('border-gray-700');
      });
      
      // Add active class to selected option
      option.classList.add('border-tesla-red');
      option.classList.remove('border-gray-700');
      
      // Update order summary (simplified example)
      updateOrderSummary();
    });
  });

  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('border-red-500');
          isValid = false;
        } else {
          input.classList.remove('border-red-500');
        }
      });
      
      if (isValid) {
        // Submit form via AJAX in production
        console.log('Form submitted:', form.id);
        alert('Form submitted successfully!');
        form.reset();
      }
    });
  });

  // Mobile menu toggle (would need mobile menu HTML)
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
      const menu = document.querySelector('.mobile-menu');
      menu.classList.toggle('hidden');
    });
  }
});

// Update order summary (example implementation)
function updateOrderSummary() {
  // In a real implementation, this would calculate based on selections
  const summaryElement = document.querySelector('.order-summary');
  if (summaryElement) {
    // Example update
    summaryElement.innerHTML = `
      <div class="flex justify-between">
        <span class="text-gray-400">Model S Long Range</span>
        <span class="text-white">$94,990</span>
      </div>
      <div class="border-t border-gray-700 pt-4">
        <div class="flex justify-between font-medium text-white">
          <span>Total</span>
          <span>$94,990</span>
        </div>
      </div>
    `;
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});