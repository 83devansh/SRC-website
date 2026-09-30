import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
   doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// ============================================================
// FIREBASE CONFIG
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyCfSVWxUFRLc-mWbmeBGqzkXrX3tysqrgc",
  authDomain: "srcwebsite-7ab50.firebaseapp.com",
  projectId: "srcwebsite-7ab50",
  storageBucket: "srcwebsite-7ab50.firebasestorage.app",
  messagingSenderId: "123629821798",
  appId: "1:123629821798:web:0ce724222ad17de7a3f2a7"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// ============================================================
// ELEMENTS
// ============================================================

const loginSection =
  document.getElementById("admin-login-section");

const dashboard =
  document.getElementById("admin-dashboard");

const loginForm =
  document.getElementById("admin-login-form");

const loginError =
  document.getElementById("login-error");

const logoutBtn =
  document.getElementById("logout-btn");

const queriesContainer =
  document.getElementById("queries-container");

const queryCount =
  document.getElementById("query-count");


// ============================================================
// ADMIN EMAIL
// ============================================================

const ADMIN_EMAIL = "admin@gmail.com";


// ============================================================
// CHECK LOGIN STATE
// ============================================================

onAuthStateChanged(auth, (user) => {

  if (user && user.email === ADMIN_EMAIL) {

    // Admin is logged in

    loginSection.style.display = "none";

    dashboard.style.display = "block";

    loadQueries();

  } else {

    // Nobody logged in

    loginSection.style.display = "block";

    dashboard.style.display = "none";

  }

});


// ============================================================
// LOGIN
// ============================================================

loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email =
    document.getElementById("admin-email").value.trim();

  const password =
    document.getElementById("admin-password").value;


  loginError.style.display = "none";


  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  } catch (error) {

    console.error("Login error:", error);

    loginError.textContent =
      "Invalid admin email or password.";

    loginError.style.display = "block";

  }

});


// ============================================================
// LOGOUT
// ============================================================

logoutBtn.addEventListener("click", async () => {

  try {

    await signOut(auth);

  } catch (error) {

    console.error(
      "Logout error:",
      error
    );

  }

});


// ============================================================
// LOAD QUERIES
// ============================================================

async function loadQueries() {

  queriesContainer.innerHTML = `
    <div class="glass-card">
      Loading submissions...
    </div>
  `;

  try {

    const queriesRef =
      collection(db, "contact_submissions");

    const queriesQuery =
      query(
        queriesRef,
        orderBy("submittedAt", "desc")
      );

    const snapshot =
      await getDocs(queriesQuery);


    // ========================================================
    // SEPARATE QUERIES
    // ========================================================

    const pendingQueries = [];
    const resolvedQueries = [];
    const deletedQueries = [];


    snapshot.forEach((queryDoc) => {

      const data = queryDoc.data();

      const status =
        (data.status || "pending").toLowerCase();


      const item = {
        id: queryDoc.id,
        data
      };


      if (status === "resolved") {

        resolvedQueries.push(item);

      }

      else if (status === "deleted") {

        deletedQueries.push(item);

      }

      else {

        pendingQueries.push(item);

      }

    });


    // ========================================================
    // QUERY COUNT
    // ========================================================

    queryCount.textContent =
      `${pendingQueries.length} ${
        pendingQueries.length === 1
          ? "Pending Query"
          : "Pending Queries"
      }`;


    // ========================================================
    // EMPTY STATE
    // ========================================================

    if (
      pendingQueries.length === 0 &&
      resolvedQueries.length === 0 &&
      deletedQueries.length === 0
    ) {

      queriesContainer.innerHTML = `
        <div class="glass-card">

          <h3>No queries yet.</h3>

          <p style="color: var(--text-muted);">
            Contact form submissions will appear here.
          </p>

        </div>
      `;

      return;
    }


    // ========================================================
    // BUILD DASHBOARD
    // ========================================================

    queriesContainer.innerHTML = `

      <!-- ==================================================
           MAIN / PENDING QUERIES
           ================================================== -->

      <section class="admin-query-section">

        <div class="admin-query-section-header">

          <div>

            <span class="section-tag">
              Inbox
            </span>

            <h2>
              Main Queries
            </h2>

            <p>
              New queries that still need attention.
            </p>

          </div>

          <span class="admin-query-count">
            ${pendingQueries.length}
          </span>

        </div>


        <div class="admin-query-list">

          ${
            pendingQueries.length > 0

              ? pendingQueries
                  .map(item =>
                    createQueryCard(
                      item,
                      "pending"
                    )
                  )
                  .join("")

              : `
                <div class="glass-card admin-empty-card">

                  <div class="admin-empty-icon">
                    ✓
                  </div>

                  <h3>
                    All queries handled
                  </h3>

                  <p>
                    There are no pending queries right now.
                  </p>

                </div>
              `
          }

        </div>

      </section>


      <!-- ==================================================
           RESOLVED QUERIES
           ================================================== -->

      <section
        class="admin-query-section"
        id="resolved-queries"
      >

        <div class="admin-query-section-header">

          <div>

            <span class="section-tag">
              Completed
            </span>

            <h2>
              Resolved Queries
            </h2>

            <p>
              Queries that have already been handled.
            </p>

          </div>

          <span class="admin-query-count resolved-count">
            ${resolvedQueries.length}
          </span>

        </div>


        <div class="admin-query-list">

          ${
            resolvedQueries.length > 0

              ? resolvedQueries
                  .map(item =>
                    createQueryCard(
                      item,
                      "resolved"
                    )
                  )
                  .join("")

              : `
                <div class="glass-card admin-empty-card">

                  <h3>
                    No resolved queries
                  </h3>

                  <p>
                    Resolved queries will appear here.
                  </p>

                </div>
              `
          }

        </div>

      </section>


      <!-- ==================================================
           DELETED QUERIES
           ================================================== -->

      <section
        class="admin-query-section"
        id="deleted-queries"
      >

        <div class="admin-query-section-header">

          <div>

            <span class="section-tag">
              Archive
            </span>

            <h2>
              Deleted Queries
            </h2>

            <p>
              Queries moved to the deleted archive.
            </p>

          </div>

          <span class="admin-query-count deleted-count">
            ${deletedQueries.length}
          </span>

        </div>


        <div class="admin-query-list">

          ${
            deletedQueries.length > 0

              ? deletedQueries
                  .map(item =>
                    createQueryCard(
                      item,
                      "deleted"
                    )
                  )
                  .join("")

              : `
                <div class="glass-card admin-empty-card">

                  <h3>
                    No deleted queries
                  </h3>

                  <p>
                    Deleted queries will appear here.
                  </p>

                </div>
              `
          }

        </div>

      </section>

    `;


    // ========================================================
    // ACTION BUTTONS
    // ========================================================

    attachQueryActions();


  } catch (error) {

    console.error(
      "Error loading queries:",
      error
    );


    queriesContainer.innerHTML = `

      <div class="glass-card">

        <h3 style="color: #ff6b6b;">
          Unable to load queries
        </h3>

        <p style="color: var(--text-muted);">
          Please check your Firebase permissions.
        </p>

      </div>

    `;

  }

}

function createQueryCard(item, status) {

  const data = item.data;


  let submittedDate =
    "Unknown date";


  if (data.submittedAt) {

    submittedDate =
      data.submittedAt
        .toDate()
        .toLocaleString("en-IN");

  }


  let actionButtons = "";


  // ========================================================
  // PENDING QUERY
  // ========================================================

  if (status === "pending") {

    actionButtons = `

      <div class="query-actions">

        <button
          class="query-action-btn resolve-btn"
          data-query-id="${item.id}"
        >
          ✓ Mark as Resolved
        </button>


        <button
          class="query-action-btn delete-btn"
          data-query-id="${item.id}"
        >
          🗑 Delete Query
        </button>

      </div>

    `;

  }


  // ========================================================
  // RESOLVED QUERY
  // ========================================================

  else if (status === "resolved") {

    actionButtons = `

      <div class="query-status resolved-status">
        ✓ Resolved
      </div>

    `;

  }


  // ========================================================
  // DELETED QUERY
  // ========================================================

  else if (status === "deleted") {

    actionButtons = `

      <div class="query-status deleted-status">
        🗑 Deleted
      </div>

    `;

  }


  return `

    <div
      class="glass-card admin-query-card"
      data-query-id="${item.id}"
    >

      <!-- Header -->

      <div class="admin-query-header">

        <div>

          <h3>
            ${escapeHTML(
              data.subject || "No Subject"
            )}
          </h3>

          <span class="badge badge-cyan">
            ${escapeHTML(
              data.category || "General"
            )}
          </span>

        </div>


        <span class="admin-query-date">
          ${submittedDate}
        </span>

      </div>


      <!-- User Information -->

      <div class="admin-query-info">

        <div>

          <strong>Name</strong>

          <p>
            ${escapeHTML(
              data.name || "N/A"
            )}
          </p>

        </div>


        <div>

          <strong>Email</strong>

          <p>

            <a
              href="mailto:${escapeAttribute(
                data.email || ""
              )}"
            >
              ${escapeHTML(
                data.email || "N/A"
              )}
            </a>

          </p>

        </div>


        <div>

          <strong>Mobile</strong>

          <p>

            <a
              href="tel:${escapeAttribute(
                data.phone || ""
              )}"
            >
              ${escapeHTML(
                data.phone || "N/A"
              )}
            </a>

          </p>

        </div>

      </div>


      <!-- Message -->

      <div class="admin-query-message">

        <strong>
          Message
        </strong>

        <p>
          ${escapeHTML(
            data.message || "No message"
          )}
        </p>

      </div>


      <!-- Actions -->

      ${actionButtons}

    </div>

  `;

}

function attachQueryActions() {

  // ========================================================
  // MARK AS RESOLVED
  // ========================================================

  document
    .querySelectorAll(".resolve-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          const queryId =
            button.getAttribute(
              "data-query-id"
            );


          const confirmed =
            confirm(
              "Mark this query as resolved?"
            );


          if (!confirmed) {
            return;
          }


          try {

            button.disabled = true;

            button.textContent =
              "Updating...";


            const queryRef =
              doc(
                db,
                "contact_submissions",
                queryId
              );


            await updateDoc(
              queryRef,
              {
                status: "resolved"
              }
            );


            // Reload dashboard

            await loadQueries();


          } catch (error) {

            console.error(
              "Error resolving query:",
              error
            );


            alert(
              "Unable to mark query as resolved."
            );


            button.disabled = false;

            button.textContent =
              "✓ Mark as Resolved";

          }

        }
      );

    });


  // ========================================================
  // DELETE QUERY
  // ========================================================

  document
    .querySelectorAll(".delete-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          const queryId =
            button.getAttribute(
              "data-query-id"
            );


          const confirmed =
            confirm(
              "Move this query to Deleted Queries?"
            );


          if (!confirmed) {
            return;
          }


          try {

            button.disabled = true;

            button.textContent =
              "Deleting...";


            const queryRef =
              doc(
                db,
                "contact_submissions",
                queryId
              );


            await updateDoc(
              queryRef,
              {
                status: "deleted"
              }
            );


            // Reload dashboard

            await loadQueries();


          } catch (error) {

            console.error(
              "Error deleting query:",
              error
            );


            alert(
              "Unable to delete query."
            );


            button.disabled = false;

            button.textContent =
              "🗑 Delete Query";

          }

        }
      );

    });

}


// ============================================================
// SECURITY HELPERS
// ============================================================

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

  return String(value)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}