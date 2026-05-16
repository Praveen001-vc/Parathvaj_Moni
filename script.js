const weddingDetails = {
  groomName: "P. Parathvaj",
  brideName: "S. Monisha",
  openingMessage:
    "With the blessings of our parents and elders, we warmly invite you to celebrate our wedding ceremony.",
  heroMessage:
    "Please join us on Thursday, 28 May 2026, and bless us as we begin our new life together.",
  invitationNote:
    "Your presence and blessings will make this day truly memorable for our families. We look forward to celebrating with you.",
  closingNote:
    "We would be honoured by your gracious presence at our wedding and invite you with affection and respect.",
  ambienceNote:
    "The day includes traditional rituals, family blessings, and a warm gathering with loved ones.",
  footerMessage:
    "Kindly RSVP with your name and number of guests. Contact family at +91 98653 31456 / +91 98652 87551.",
  weddingDate: "2026-05-28T04:30:00+05:30",
  venueName: "Sakthi mahal (AC and Non-AC)",
  venueAddress: "Salem, Tamil Nadu",
  mapUrl:
    "https://maps.app.goo.gl/HYjdV6SkisN9xQ6q7",
  rsvpUrl:
    "https://wa.me/919865331456?text=Vanakkam%2C%20we%20are%20happy%20to%20attend%20your%20wedding%20and%20offer%20our%20blessings.",
  events: [
    {
      name: "Wedding Cermony",
      time: "04:30 AM - 05:30 AM",
      description:
        "Sacred wedding rituals and tying of the mangalsutra in the auspicious Wedding ."
    },
    {
      name: "Reception & Lunch",
      time: "07:00 AM - 10:00 AM",
      description:
        "Family blessings, formal wedding rites, and traditional celebrations."
    },
    // {
    //   name: "Reception & Lunch",
    //   time: "After Ceremony",
    //   description:
    //     "Please join us for felicitations, greetings, and wedding feast with our families."
    // }
  ]
};

const parsedDate = new Date(weddingDetails.weddingDate);
const weddingDate = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

const longDate = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
}).format(weddingDate);

const shortDate = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric"
}).format(weddingDate);

const timeText = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit"
}).format(weddingDate);

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function setHtml(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.innerHTML = value;
  });
}

function setLink(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.href = value;
  });
}

function populateSite() {
  const coupleText = `${weddingDetails.groomName} & ${weddingDetails.brideName}`;
  const groomHtml = weddingDetails.groomName.replace(/\s+/g, "&nbsp;");
  const brideHtml = weddingDetails.brideName.replace(/\s+/g, "&nbsp;");
  const coupleHtml = `<span class="name-line">${groomHtml}</span><span class="heart-line">&hearts;</span><span class="name-line">${brideHtml}</span>`;

  setText("[data-couple-text]", coupleText);
  setHtml("[data-couple-html]", coupleHtml);
  setText("[data-opening-message]", weddingDetails.openingMessage);
  setText("[data-hero-message]", weddingDetails.heroMessage);
  setText("[data-invitation-note]", weddingDetails.invitationNote);
  setText("[data-closing-note]", weddingDetails.closingNote);
  setText("[data-ambience-note]", weddingDetails.ambienceNote);
  setText("[data-footer-message]", weddingDetails.footerMessage);
  setText("[data-wedding-date-long]", longDate);
  setText("[data-wedding-date-short]", shortDate);
  setText("[data-wedding-time]", timeText);
  setText("[data-venue-name]", weddingDetails.venueName);
  setText("[data-venue-address]", weddingDetails.venueAddress);
  setLink("[data-map-link]", weddingDetails.mapUrl);
  setLink("[data-rsvp-link]", weddingDetails.rsvpUrl);

  const heroEventList = document.getElementById("heroEventList");
  if (heroEventList) {
    heroEventList.innerHTML = weddingDetails.events
      .slice(0, 3)
      .map(
        (event) => `
          <li>
            <strong>${event.name}</strong>
            <span>${event.time}</span>
          </li>
        `
      )
      .join("");
  }

  const eventGrid = document.getElementById("eventGrid");
  if (eventGrid) {
    eventGrid.innerHTML = weddingDetails.events
      .map(
        (event) => `
          <article class="premium-card event-card reveal">
            <span class="event-time">${event.time}</span>
            <h3>${event.name}</h3>
            <p>${event.description}</p>
          </article>
        `
      )
      .join("");
  }
}

function updateCountdown() {
  if (!document.getElementById("days")) {
    return;
  }

  const now = new Date();
  const distance = weddingDate.getTime() - now.getTime();

  if (distance <= 0) {
    setText("#days", "00");
    setText("#hours", "00");
    setText("#minutes", "00");
    setText("#seconds", "00");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  setText("#days", String(days).padStart(2, "0"));
  setText("#hours", String(hours).padStart(2, "0"));
  setText("#minutes", String(minutes).padStart(2, "0"));
  setText("#seconds", String(seconds).padStart(2, "0"));
}

function setupRevealObserver() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
    observer.observe(element);
  });
}

function setupCursorGlow() {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const cursorGlow = document.getElementById("cursorGlow");
  if (!cursorGlow) {
    return;
  }

  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.opacity = "1";
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

function setupTiltCard() {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const tiltArea = document.getElementById("heroTilt");
  if (!tiltArea) {
    return;
  }

  const card = tiltArea.querySelector(".summary-card");
  if (!card) {
    return;
  }

  tiltArea.addEventListener("pointermove", (event) => {
    const rect = tiltArea.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 10}deg) translateZ(10px)`;
  });

  tiltArea.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
}

function createPetals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const petalField = document.getElementById("petalField");
  if (!petalField) {
    return;
  }

  const petalCount = document.body.classList.contains("page-opening") ? 12 : 10;

  for (let index = 0; index < petalCount; index += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--size", `${10 + Math.random() * 12}px`);
    petal.style.setProperty("--duration", `${16 + Math.random() * 12}s`);
    petal.style.setProperty("--delay", `${Math.random() * -18}s`);
    petal.style.setProperty("--rotate", `${Math.random() * 360}deg`);
    petalField.appendChild(petal);
  }
}

populateSite();
updateCountdown();
setupRevealObserver();
setupCursorGlow();
setupTiltCard();
createPetals();

if (document.getElementById("days")) {
  setInterval(updateCountdown, 1000);
}
