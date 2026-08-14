// ======================
// Elementos
// ======================

const overlay = document.querySelector(".modal-overlay");

const closeBtn = document.querySelector(".close-btn");
const backBtn = document.querySelector(".back-btn");

const steps = document.querySelectorAll(".step");
const dots = document.querySelectorAll(".dot");

const options = document.querySelectorAll(".option");

const courseButtons = document.querySelectorAll(".course-grid button");
const continueBtn = document.querySelector(".continue-btn");

let selectedCourse = null;


// ======================
// Modal
// ======================

function openModal() {

    resetModal();

    overlay.style.display = "grid";

}


// ======================
// Navegación entre pasos
// ======================

function showStep(step) {

    steps.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    steps[step].classList.add("active");
    dots[step].classList.add("active");

}

function resetModal() {

    showStep(0);

    selectedCourse = null;

    continueBtn.disabled = true;

    courseButtons.forEach(button => {
        button.classList.remove("active");
    });

}

function closeModal() {

    resetModal();

    overlay.style.display = "none";

}


// ======================
// Eventos
// ======================

closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", e => {

    if (e.target === overlay)
        closeModal();

});

backBtn.addEventListener("click", () => {

    showStep(0);

});


// ======================
// Opciones iniciales
// ======================

options.forEach(option => {

    option.addEventListener("click", () => {

        const action = option.dataset.action;

        switch (action) {

            case "summary":
                showStep(1);
                break;

            case "tutoriales":
                window.location.href = "/tutoriales/index.html";
                break;

            case "igcse":
                window.location.href = "/igcse";
                break;

        }

    });

});


// ======================
// Selección de curso
// ======================

courseButtons.forEach(button => {

    button.addEventListener("click", () => {

        courseButtons.forEach(b =>
            b.classList.remove("active")
        );

        button.classList.add("active");

        selectedCourse = button.dataset.course;

        continueBtn.disabled = false;

    });

});


// ======================
// Continuar
// ======================

continueBtn.disabled = true;

continueBtn.addEventListener("click", () => {

    if (!selectedCourse) return;

    window.location.href = `/resumenes/${selectedCourse}.html`;

});


document.querySelector(".hero-btn")
    .addEventListener("click", openModal);

document.querySelector(".login-btn")
    .addEventListener("click", openModal);

document.addEventListener("keydown", event => {

    if (event.key === "Escape" && overlay.style.display === "grid") {
        closeModal();
    }

});