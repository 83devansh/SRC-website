/**
 * ==========================================================================
 * Student Research Council (SRC) - Events Management Script
 * Handles category filtering, live search, and interactive modal dialog
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initEventsManager();
});

function initEventsManager() {
  const eventsContainer = document.getElementById('events-grid-container');
  const filterBtns = document.querySelectorAll('.events-filter-btn');
  const searchInput = document.getElementById('event-search-input');
  const modalOverlay = document.getElementById('event-detail-modal');

  if (!eventsContainer || !window.SRC_DATA) return;

  let currentCategory = 'all';
  let searchQuery = '';

  // Render initial events
  renderEvents();

  // Category filter click events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      renderEvents();
    });
  });

  // Search input events
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderEvents();
    });
  }

  // Render events matching current filter & search
  function renderEvents() {
    const events = window.SRC_DATA.events || [];

    const filtered = events.filter(event => {
      const matchCategory = currentCategory === 'all' || event.category.toLowerCase() === currentCategory.toLowerCase();
      const matchSearch = !searchQuery || 
        event.title.toLowerCase().includes(searchQuery) ||
        event.shortDescription.toLowerCase().includes(searchQuery) ||
        event.category.toLowerCase().includes(searchQuery) ||
        event.location.toLowerCase().includes(searchQuery);

      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      eventsContainer.innerHTML = `
        <div class="empty-state-box" style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="margin-bottom: 0.5rem;">No Events Found</h3>
          <p style="color: var(--text-muted); max-width: 420px; margin: 0 auto 1.5rem;">
            No events match your current filter or search criteria. Try a different keyword or category.
          </p>
          <button class="btn btn-secondary btn-sm" id="reset-filter-btn">Reset All Filters</button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
          renderEvents();
        });
      }
      return;
    }

    eventsContainer.innerHTML = filtered.map(event => {
      const badgeClass = event.badgeColor === 'violet' ? 'badge-violet' :
                         event.badgeColor === 'emerald' ? 'badge-emerald' :
                         event.badgeColor === 'amber' ? 'badge-amber' : 'badge-cyan';

      return `
        <article class="event-card reveal active" data-event-id="${event.id}">
          <div class="event-card-media" style="background: ${event.imagePlaceholder};">
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.15; font-size: 4rem;">
              🔬
            </div>
            <div class="event-category-badge">
              <span class="badge ${badgeClass}">${event.category}</span>
            </div>
            <div class="event-status-badge">
              <span class="badge ${event.status === 'Completed' ? 'badge-amber' : 'badge-emerald'}">
                ● ${event.status}
              </span>
            </div>
          </div>
          <div class="event-card-body">
            <div class="event-date-chip">
              <span>📅</span> ${event.date}
            </div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-desc">${event.shortDescription}</p>
            <div class="event-card-footer">
              <div class="event-location-pill">
                <span>📍</span> ${event.location}
              </div>
              <button class="btn btn-outline btn-sm view-event-btn" data-event-id="${event.id}">
                View Details →
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach event listener to all "View Details" buttons
    eventsContainer.querySelectorAll('.view-event-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-event-id');
        openEventModal(id);
      });
    });
  }

  // Open Event Details Modal
  function openEventModal(eventId) {
    if (!modalOverlay) return;
    const event = (window.SRC_DATA.events || []).find(e => e.id === eventId);
    if (!event) return;

    const modalContent = document.getElementById('event-modal-content');
    if (!modalContent) return;

    const agendaHtml = (event.agenda || []).map(item => `
      <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem; color: var(--text-secondary);">
        <span style="color: var(--color-cyan); font-weight: bold;">•</span> ${item}
      </li>
    `).join('');

    modalContent.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
        <span class="badge badge-cyan">${event.category}</span>
        <span class="badge ${event.status === 'Completed' ? 'badge-amber' : 'badge-emerald'}">● ${event.status}</span>
        <span class="placeholder-tag">[Placeholder Event ID: ${event.id}]</span>
      </div>

      <h2 style="font-size: 1.75rem; margin-bottom: 1rem; color: var(--text-main);">${event.title}</h2>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem;">
        <div>
          <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--color-cyan); text-transform: uppercase;">Date & Time</div>
          <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-main);">${event.date}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${event.time}</div>
        </div>
        <div>
          <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--color-cyan); text-transform: uppercase;">Location</div>
          <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-main);">${event.location}</div>
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-main);">About This Event</h4>
        <p style="color: var(--text-secondary); line-height: 1.65;">${event.fullDescription}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.65rem; color: var(--text-main);">Event Agenda</h4>
        <ul style="list-style: none; padding: 0;">
          ${agendaHtml}
        </ul>
      </div>

      <div style="margin-bottom: 2rem;">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--text-main);">Eligibility / Prerequisites</h4>
        <p style="font-size: 0.925rem; color: var(--text-muted);">${event.prerequisites}</p>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
        <button class="btn btn-primary" id="modal-register-btn">
          ${event.status === 'Completed' ? 'View Event Proceedings' : 'Register / Express Interest'}
        </button>
        <button class="btn btn-secondary" id="modal-close-action-btn">Close Window</button>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Modal action events
    const regBtn = document.getElementById('modal-register-btn');
    if (regBtn) {
      regBtn.addEventListener('click', () => {
        closeModal();
        window.showToast(`Registration interest recorded for "${event.title}"! (Demo placeholder)`, '🎟️');
      });
    }

    const closeActionBtn = document.getElementById('modal-close-action-btn');
    if (closeActionBtn) {
      closeActionBtn.addEventListener('click', closeModal);
    }
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close modal bindings
  const closeBtn = document.querySelector('.modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}
