const step_jump = document.querySelector('.step-container');
const forms = document.querySelector('#input-fields');
const nextButton = document.querySelector('.NextBtn');
const backButton = document.querySelector('.BackBtn');

// Step navigation
let current_form = forms.children[0];
let current_page = 0;

function renderPage() {
    if (current_form) {
        current_form.classList.add("hidden");
    }
    current_form = forms.children[current_page];
    current_form.classList.add("inputFields");
    current_form.classList.remove("hidden");

    // Sets step based on current_page
    for (const step of step_jump.children) {
        if (Number(step.getAttribute("navTo")) > current_page) {
            step.classList.add("inactive");
            step.classList.remove("active");
        } else {
            step.classList.add("active");
            step.classList.remove("inactive");
        }
    }

    // Remove back button in first page and next button in the last page
    if (current_page == 0) {
        backButton.classList.add("hidden");
    }
    else {
        backButton.classList.remove("hidden");
    }

    if (current_page == 6) {
        nextButton.classList.add("hidden");
    }
    else {
        nextButton.classList.remove("hidden");
    }
}
for (const step of step_jump.children) {
    step.addEventListener("click", () => {

        // Navigate across pages
        current_page = Number(step.getAttribute("navTo"));
        renderPage();
    });
}

// Next button and back button
nextButton.addEventListener("click", () => {
    current_page++;
    renderPage();
})

backButton.addEventListener("click", () => {
    current_page--;
    renderPage();
})

// Chart
/**
 * @param {NodeListOf<HTMLInputElement>} inputs 
 */

function sum(inputs) {
    const arr = Array.from(inputs);
    if (arr.length === 0) return 0;

    //const section = arr[0].closest("section");
    // if (section && section.classList.contains("placeholder")) {
    //return 0;
    //}
    // Only use the above code if you need to filter out an input

    return arr.reduce((total, input) => {
        const n = Number(input.value)
        return total + (Number.isFinite(n) ? n : 0);
    }, 0)
}
const [...sections] = document.querySelectorAll("section");
const filteredSections = Array.from(sections).filter(element => {
    // Return for elements that have the specific class 'inputs'
    return element.classList.contains('inputs');
});
const inputs = filteredSections.map(section => 
    section.querySelector("input")
)
// const sectionInputMap = filteredSections.map(section => {
//     return {
//         section: section,
//         input: section.querySelector("input")
//     };
// });
const canvas = document.querySelector("canvas");
let current_chart = null;

function update() {
    current_chart?.destroy();
    current_chart = new Chart(canvas, {
        type: "doughnut",
        data: {
            labels: ["Monthly Income", "Student Loans", "Housing", "Essentials","Lifestyle","Future-Proofing"],
            datasets: [
                {
                    label: "Total Expenses",
                    data: inputs.map(inputs => sum(inputs))
                }
            ]
        }
    });
}

document.body.addEventListener("input", () => {
    update();
});

update();