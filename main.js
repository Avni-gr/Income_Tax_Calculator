function validateInput(event) {
  const keyCode = event.keyCode;
  // Allow: backspace, delete, tab, escape, enter, and .
  if (keyCode == 46 || keyCode == 8 || keyCode == 9 || keyCode == 27 || keyCode == 13 || keyCode == 190 ||
      // Allow: Ctrl+A
      (keyCode == 65 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (keyCode >= 35 && keyCode <= 39)) {
      // let it happen, don't do anything
      return;
  } else {
      // Ensure that it is a number and stop the keypress
      if ((keyCode < 48 || keyCode > 57) && (keyCode < 96 || keyCode > 105)) {
          event.preventDefault();
      }
  }
}

document.addEventListener("DOMContentLoaded", function() {
    const grossIncomeInput = document.getElementById('grossIncome');
    const extraIncomeInput = document.getElementById('extraIncome');
    const ageInput = document.getElementById('ageInput');
    const deductionsInput = document.getElementById('deductions');
    const submitBtn = document.querySelector('.btn-primary');

    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    submitBtn.addEventListener('click', function() {
        let grossIncome = parseFloat(grossIncomeInput.value);
        let extraIncome = parseFloat(extraIncomeInput.value);
        let deductions = parseFloat(deductionsInput.value);
        let age = parseInt(ageInput.value); // Convert input value to integer
        let ageGroup = ""; // Initialize age group variable

        // Convert numeric age to age group string
        if (age < 40) {
            ageGroup = "<40";
        } else if (age >= 40 && age < 60) {
            ageGroup = "≥ 40 & < 60";
        } else {
            ageGroup = "≥ 60";
        }

        let taxableIncome = grossIncome + extraIncome - deductions;
        let tax = 0;

        if (taxableIncome > 800000) {
            if (ageGroup === "<40") {
                tax = 0.3 * (taxableIncome - 800000);
            } else if (ageGroup === "≥ 40 & < 60") {
                tax = 0.4 * (taxableIncome - 800000);
            } else if (ageGroup === "≥ 60") {
                tax = 0.1 * (taxableIncome - 800000);
            }
        }    

        let overallIncome = taxableIncome - tax;

        // Display tax information in the modal
        const modalHeading = document.querySelector('#h2-font');
        const modalSubheading = document.querySelector('#h6-font');

        modalHeading.textContent = "Your Overall income will be " + overallIncome ;
        modalSubheading.textContent =" after tax deduction";

        // Show the modal
        modal.style.display = "block";
    });

    const closeButton = document.querySelector('.close_btn');

  // Add click event listener to the close button
  closeButton.addEventListener('click', function() {
    // Hide the modal
    modal.style.display = "none";
  });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

