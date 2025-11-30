// js/contact-form.js
// Обробка форми контакту – відкриває mailto з підготовленим текстом

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("cfName")?.value.trim() || "";
        const email = document.getElementById("cfEmail")?.value.trim() || "";
        const subject = document.getElementById("cfSubject")?.value.trim() || "";
        const message = document.getElementById("cfMessage")?.value.trim() || "";

        const mailSubject = "New project from 369YAX website – " + subject;

        const bodyText =
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Subject: " + subject + "\n" +
            "----------------------------------------\n" +
            "Project details:\n" + message;

        const mailtoLink =
            "mailto:369yax@gmail.com?subject=" +
            encodeURIComponent(mailSubject) +
            "&body=" + encodeURIComponent(bodyText);

        window.location.href = mailtoLink;
    });
});
