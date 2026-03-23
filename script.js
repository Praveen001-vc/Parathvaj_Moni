const weddingDetails = {
  groomName: "Parathvaj",
  brideName: "Monisha",
  openingMessage:
    "With joyful hearts and the blessings of our families, we invite you to celebrate our wedding.",
  heroMessage:
    "We invite you to celebrate our new beginning, wrapped in love, tradition, music, and the blessings of family.",
  invitationNote:
    "Your presence will make our day brighter, warmer, and more meaningful. Join us for a celebration filled with grace, joy, and heartfelt moments.",
  closingNote:
    "We would be honoured to celebrate this special day in your presence. Your love and blessings mean the world to us.",
  ambienceNote:
    "The celebration blends timeless rituals with a soft romantic setting, creating an elegant and intimate experience for every guest.",
  footerMessage:
    "Kindly RSVP with your name and number of guests. Update the contact link in this file to connect it to your WhatsApp or any RSVP page.",
  weddingDate: "2026-05-28T09:00:00+05:30",
  venueName: "Your Dream Wedding Venue",
  venueAddress: "Add your full venue address here, along with city and state.",
  mapUrl: "https://maps.google.com",
  rsvpUrl:
    "https://wa.me/919999999999?text=We%20are%20happy%20to%20join%20your%20wedding%20celebration",
  events: [
    {
      name: "Wedding Ceremony",
      time: "09:00 AM",
      description:
        "Witness our sacred vows, family blessings, and the beautiful beginning of our forever."
    },
    {
      name: "Reception",
      time: "07:00 PM",
      description:
        "Celebrate with us through music, heartfelt conversations, and an elegant evening ambience."
    },
    {
      name: "Dinner",
      time: "08:30 PM",
      description:
        "Join us for a memorable dinner prepared with warmth and care for all our loved ones."
    }
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
  const coupleText = `${weddingDetails.groomName} ♥ ${weddingDetails.brideName}`;
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
