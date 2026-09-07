/**
 * ==========================================================================
 * Student Research Council (SRC) - Events Management Script
 * Handles category filtering and interactive event modal.
 *
 * Events are displayed in this order:
 * 1. Completed Events
 * 2. Upcoming Events
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initEventsManager();
});

function initEventsManager() {
  const eventsContainer = document.getElementById('events-grid-container');
  const filterBtns = document.querySelectorAll('.events-filter-btn');
  const modalOverlay = document.getElementById('event-detail-modal');

  if (!eventsContainer || !window.SRC_DATA) return;

  let currentCategory = 'all';

  renderEvents();

  // ============================================================
  // CATEGORY FILTERS
  // ============================================================

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      filterBtns.forEach(b => {
        b.classList.remove('active');
      });

      btn.classList.add('active');

      currentCategory =
        btn.getAttribute('data-filter') || 'all';

      renderEvents();
    });
  });


  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================

  function normalizeStatus(status) {
    return String(status || '')
      .trim()
      .toLowerCase();
  }


  function isCompleted(event) {

    const status = normalizeStatus(event.status);

    return (
      status === 'completed' ||
      status === 'done' ||
      status === 'closed' ||
      status === 'finished'
    );
  }


  function safeText(value) {
    return String(value ?? '');
  }


  // ============================================================
  // RENDER EVENTS
  // ============================================================

  function renderEvents() {

    const events =
      window.SRC_DATA.events || [];


    // Filter only by category
    const filtered = events.filter(event => {

      const category =
        safeText(event.category);

      return (
        currentCategory === 'all' ||
        category.toLowerCase() ===
        currentCategory.toLowerCase()
      );

    });


    // Separate completed and upcoming
    const completedEvents =
      filtered.filter(isCompleted);

    const upcomingEvents =
      filtered.filter(event => !isCompleted(event));


    // ========================================================
    // NO EVENTS
    // ========================================================

    if (filtered.length === 0) {

      eventsContainer.innerHTML = `

        <div
          class="empty-state-box"
          style="
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem 1.5rem;
          "
        >

          <div
            style="
              font-size: 3rem;
              margin-bottom: 1rem;
            "
          >
            📅
          </div>

          <h3 style="margin-bottom: 0.5rem;">
            No Events Found
          </h3>

          <p
            style="
              color: var(--text-muted);
              max-width: 420px;
              margin: 0 auto 1.5rem;
            "
          >
            No events match the selected category.
          </p>

          <button
            class="btn btn-secondary btn-sm"
            id="reset-filter-btn"
          >
            Show All Events
          </button>

        </div>

      `;


      const resetBtn =
        document.getElementById(
          'reset-filter-btn'
        );


      if (resetBtn) {

        resetBtn.addEventListener(
          'click',
          () => {

            currentCategory = 'all';

            filterBtns.forEach(b => {

              b.classList.toggle(
                'active',
                b.getAttribute(
                  'data-filter'
                ) === 'all'
              );

            });

            renderEvents();

          }
        );

      }

      return;
    }


    let html = '';


    // ========================================================
    // COMPLETED EVENTS
    // ========================================================

    if (completedEvents.length > 0) {

      html += `

        <div
          class="events-status-heading"
          style="
            grid-column: 1 / -1;
            margin: 1.5rem 0 0.25rem;
          "
        >

          <span class="section-tag">
            Past Events
          </span>

          <h2
            style="
              margin: 0.5rem 0 0;
            "
          >
            Completed Events
          </h2>

          <p
            style="
              color: var(--text-secondary);
              margin: 0.5rem 0 0;
            "
          >
            Events that have already been conducted by SRC.
          </p>

        </div>


        <div
          class="events-grid"
          style="
            grid-column: 1 / -1;
          "
        >

          ${completedEvents
            .map(renderEventCard)
            .join('')}

        </div>

      `;
    }


    // ========================================================
    // UPCOMING EVENTS
    // ========================================================

    if (upcomingEvents.length > 0) {

      html += `

        <div
          class="events-status-heading"
          style="
            grid-column: 1 / -1;
            margin: 3rem 0 0.25rem;
          "
        >

          <span class="section-tag">
            What's Next
          </span>

          <h2
            style="
              margin: 0.5rem 0 0;
            "
          >
            Upcoming Events
          </h2>

          <p
            style="
              color: var(--text-secondary);
              margin: 0.5rem 0 0;
            "
          >
            Explore upcoming opportunities to learn,
            compete, and innovate.
          </p>

        </div>


        <div
          class="events-grid"
          style="
            grid-column: 1 / -1;
          "
        >

          ${upcomingEvents
            .map(renderEventCard)
            .join('')}

        </div>

      `;
    }


    eventsContainer.innerHTML = html;


    // ========================================================
    // VIEW DETAILS BUTTONS
    // ========================================================

    eventsContainer
      .querySelectorAll('.view-event-btn')
      .forEach(btn => {

        btn.addEventListener(
          'click',
          () => {

            const id =
              btn.getAttribute(
                'data-event-id'
              );

            openEventModal(id);

          }
        );

      });

  }


  // ============================================================
  // EVENT CARD
  // ============================================================

function renderEventCard(event) {

  const badgeClass =
    event.badgeColor === 'violet'
      ? 'badge-violet'
      : event.badgeColor === 'emerald'
      ? 'badge-emerald'
      : event.badgeColor === 'amber'
      ? 'badge-amber'
      : 'badge-cyan';

  const completed = isCompleted(event);

  const statusClass = completed
    ? 'badge-amber'
    : 'badge-emerald';

  const statusLabel = completed
    ? 'Completed'
    : (event.status || 'Upcoming');

  return `
    <article
      class="event-card reveal active"
      data-event-id="${safeText(event.id)}"
    >

      <!-- EVENT IMAGE -->
      <div class="event-card-media">

        ${
          event.image
            ? `
              <img
                src="${safeText(event.image)}"
                alt="${safeText(event.title)}"
                class="event-card-image"
                loading="lazy"
              >
            `
            : `
              <div class="event-image-placeholder">
                🔬
              </div>
            `
        }

        <div class="event-image-overlay"></div>

        <!-- CATEGORY -->
        <div class="event-category-badge">
          <span class="badge ${badgeClass}">
            ${safeText(event.category) || 'Event'}
          </span>
        </div>

        <!-- STATUS -->
        <div class="event-status-badge">
          <span class="badge ${statusClass}">
            ● ${statusLabel}
          </span>
        </div>

      </div>


      <!-- EVENT CONTENT -->
      <div class="event-card-body">

        <div class="event-date-chip">
          <span>📅</span>
          ${
            safeText(event.date) ||
            (completed
              ? 'Completed'
              : 'Date to be announced')
          }
        </div>

        <h3 class="event-title">
          ${safeText(event.title)}
        </h3>

        <p class="event-desc">
          ${safeText(event.shortDescription)}
        </p>

        <div class="event-card-footer">

          <div class="event-location-pill">
            <span>📍</span>
            ${
              safeText(event.location) ||
              'Location to be announced'
            }
          </div>

          <button
            class="btn btn-outline btn-sm view-event-btn"
            data-event-id="${safeText(event.id)}"
          >
            View Details →
          </button>

        </div>

      </div>

    </article>
  `;
}


  // ============================================================
  // EVENT MODAL
  // ============================================================

  function openEventModal(eventId) {

    if (!modalOverlay) return;


    const event =
      (window.SRC_DATA.events || [])
        .find(e => e.id === eventId);


    if (!event) return;


    const modalContent =
      document.getElementById(
        'event-modal-content'
      );


    if (!modalContent) return;


    const completed =
      isCompleted(event);


    const agendaHtml =
      (event.agenda || [])
        .map(item => `

          <li
            style="
              margin-bottom: 0.5rem;
              display: flex;
              align-items: flex-start;
              gap: 0.5rem;
              color: var(--text-secondary);
            "
          >

            <span
              style="
                color: var(--color-cyan);
                font-weight: bold;
              "
            >
              •
            </span>

            ${safeText(item)}

          </li>

        `)
        .join('');


    modalContent.innerHTML = `

      <div
        style="
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        "
      >

        <span class="badge badge-cyan">
          ${safeText(event.category)}
        </span>


        <span
          class="
            badge
            ${completed
              ? 'badge-amber'
              : 'badge-emerald'}
          "
        >
          ● ${
            completed
              ? 'Completed'
              : safeText(event.status) ||
                'Upcoming'
          }
        </span>

      </div>


      <h2
        style="
          font-size: 1.75rem;
          margin-bottom: 1rem;
          color: var(--text-main);
        "
      >
        ${safeText(event.title)}
      </h2>


      <div
        style="
          display: grid;
          grid-template-columns:
            repeat(
              auto-fit,
              minmax(180px, 1fr)
            );
          gap: 1rem;
          padding: 1rem;
          background:
            rgba(255,255,255,0.03);
          border-radius:
            var(--radius-md);
          border:
            1px solid
            var(--border-subtle);
          margin-bottom: 1.5rem;
        "
      >

        <div>

          <div
            style="
              font-size: 0.75rem;
              font-family:
                var(--font-mono);
              color:
                var(--color-cyan);
              text-transform:
                uppercase;
            "
          >
            Date & Time
          </div>


          <div
            style="
              font-size: 0.95rem;
              font-weight: 600;
              color:
                var(--text-main);
            "
          >
            ${
              safeText(event.date) ||
              (
                completed
                  ? 'Completed'
                  : 'Date to be announced'
              )
            }
          </div>


          <div
            style="
              font-size: 0.85rem;
              color:
                var(--text-muted);
            "
          >
            ${
              safeText(event.time) ||
              'Details to be updated'
            }
          </div>

        </div>


        <div>

          <div
            style="
              font-size: 0.75rem;
              font-family:
                var(--font-mono);
              color:
                var(--color-cyan);
              text-transform:
                uppercase;
            "
          >
            Location
          </div>


          <div
            style="
              font-size: 0.95rem;
              font-weight: 600;
              color:
                var(--text-main);
            "
          >
            ${
              safeText(event.location) ||
              'Details to be updated'
            }
          </div>

        </div>

      </div>


      <div
        style="
          margin-bottom: 1.5rem;
        "
      >

        <h4
          style="
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: var(--text-main);
          "
        >
          About This Event
        </h4>


        <p
          style="
            color:
              var(--text-secondary);
            line-height: 1.65;
          "
        >
          ${safeText(event.fullDescription)}
        </p>

      </div>


      <div
        style="
          margin-bottom: 1.5rem;
        "
      >

        <h4
          style="
            font-size: 1.1rem;
            margin-bottom: 0.65rem;
            color: var(--text-main);
          "
        >
          Event Agenda
        </h4>


        <ul
          style="
            list-style: none;
            padding: 0;
          "
        >
          ${agendaHtml}
        </ul>

      </div>


      <div
        style="
          margin-bottom: 2rem;
        "
      >

        <h4
          style="
            font-size: 1.1rem;
            margin-bottom: 0.35rem;
            color: var(--text-main);
          "
        >
          Eligibility / Prerequisites
        </h4>


        <p
          style="
            font-size: 0.925rem;
            color:
              var(--text-muted);
          "
        >
          ${
            safeText(event.prerequisites) ||
            'Details to be updated'
          }
        </p>

      </div>


      <div
        style="
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top:
            1px solid
            var(--border-subtle);
        "
      >

        <button
          class="btn btn-primary"
          id="modal-register-btn"
        >
          ${
            completed
              ? 'View Event Proceedings'
              : 'Register / Express Interest'
          }
        </button>


        <button
          class="btn btn-secondary"
          id="modal-close-action-btn"
        >
          Close Window
        </button>

      </div>

    `;


    modalOverlay.classList.add('active');

    document.body.style.overflow = 'hidden';


    // ========================================================
    // MODAL REGISTER / PROCEEDINGS BUTTON
    // ========================================================

    const regBtn =
      document.getElementById(
        'modal-register-btn'
      );

if (regBtn) {

  regBtn.addEventListener('click', () => {

    if (event.registrationLink) {

      window.open(
        event.registrationLink,
        '_blank'
      );

    } else {

      closeModal();

      if (typeof window.showToast === 'function') {

        window.showToast(
          `Registration for "${event.title}" is not available yet.`,
          '🎟️'
        );

      }

    }

  });

}


    // ========================================================
    // CLOSE BUTTON INSIDE MODAL
    // ========================================================

    const closeActionBtn =
      document.getElementById(
        'modal-close-action-btn'
      );


    if (closeActionBtn) {

      closeActionBtn.addEventListener(
        'click',
        closeModal
      );

    }

  }


  // ============================================================
  // CLOSE MODAL
  // ============================================================

  function closeModal() {

    if (!modalOverlay) return;

    modalOverlay.classList.remove(
      'active'
    );

    document.body.style.overflow = '';

  }


  // ============================================================
  // MODAL CLOSE ICON
  // ============================================================

  const closeBtn =
    document.querySelector(
      '.modal-close-btn'
    );


  if (closeBtn) {

    closeBtn.addEventListener(
      'click',
      closeModal
    );

  }


  // ============================================================
  // CLICK OUTSIDE MODAL
  // ============================================================

  if (modalOverlay) {

    modalOverlay.addEventListener(
      'click',
      (e) => {

        if (
          e.target === modalOverlay
        ) {

          closeModal();

        }

      }
    );

  }


  // ============================================================
  // ESCAPE KEY
  // ============================================================

  document.addEventListener(
    'keydown',
    (e) => {

      if (
        e.key === 'Escape' &&
        modalOverlay &&
        modalOverlay.classList.contains(
          'active'
        )
      ) {

        closeModal();

      }

    }
  );

}