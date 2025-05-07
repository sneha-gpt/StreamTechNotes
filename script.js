document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Star rating functionality
document.querySelectorAll('.star-rating input').forEach(star => {
  star.addEventListener('change', () => {
      const labels = star.parentElement.querySelectorAll('label');
      labels.forEach(label => label.style.color = '#ddd');
      let index = Array.from(labels).findIndex(label => label.htmlFor === star.id);
      for (let i = 0; i <= index; i++) {
          labels[i].style.color = '#ffdd00';
      }
  });
});

  function submitReview() {
    const email = document.getElementById("user-email").value;
    const suggestion = document.getElementById("user-suggestion").value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;

    if (!email || !suggestion || !rating) {
      alert("Please fill all the fields.");
      return;
    }

    fetch("http://localhost:3000/submit-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, suggestion, rating })
      })
      
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting your review.");
    });
  }

