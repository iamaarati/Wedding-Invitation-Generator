// Form submission handler with API integration
document.getElementById("wedding-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const bride = document.getElementById("brides-name").value;
  const groom = document.getElementById("groom-name").value;
  const date = document.getElementById("wedding-date").value;
  const time = document.getElementById("wedding-time").value;
  const venue = document.getElementById("venue-location").value;

  try {
      // Make API request to create wedding
      const response = await fetch('http://localhost:8000/core/wedding_create/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              bride_name: bride,
              groom_name: groom,
              wedding_date: date || null,
              wedding_time: time || null,
              venue: venue
          })
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const weddingData = await response.json();
      
      // Pass wedding data in URL parameters
      const params = new URLSearchParams({
          id: weddingData.id,
          bride: weddingData.bride_name,
          groom: weddingData.groom_name,
          date: weddingData.wedding_date,
          time: weddingData.wedding_time,
          venue: weddingData.venue,
          unique: weddingData.unique_number
      });
      
      // Redirect to invitation page with data
      window.location.href = `invitation.html?${params.toString()}`;
  } catch (error) {
      console.error('Error creating wedding:', error);
      alert('There was an error creating your wedding. Please try again.');
  }
});

// Smooth scrolling for Get Started button
document.querySelector('.get-started-btn').addEventListener('click', function() {
  const signupForm = document.getElementById('signup-form');
  signupForm.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
  });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
          targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      }
  });
});