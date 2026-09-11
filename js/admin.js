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
  orderBy
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


    queryCount.textContent =
      `${snapshot.size} ${snapshot.size === 1 ? "Query" : "Queries"}`;


    if (snapshot.empty) {

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


    queriesContainer.innerHTML = "";


    snapshot.forEach((doc) => {

      const data = doc.data();


      const card =
        document.createElement("div");

      card.className =
        "glass-card";

      card.style.marginBottom =
        "1.25rem";


      let submittedDate =
        "Unknown date";


      if (data.submittedAt) {

        submittedDate =
          data.submittedAt
            .toDate()
            .toLocaleString("en-IN");

      }


      card.innerHTML = `

        <div style="
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        ">

          <div>

            <h3 style="margin-bottom: 0.35rem;">
              ${escapeHTML(data.subject || "No Subject")}
            </h3>

            <span class="badge badge-cyan">
              ${escapeHTML(data.category || "General")}
            </span>

          </div>

          <span style="
            color: var(--text-subtle);
            font-size: 0.8rem;
          ">
            ${submittedDate}
          </span>

        </div>


        <div style="
          display: grid;
          grid-template-columns:
            repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 1.25rem;
        ">

          <div>

            <strong>Name</strong>

            <p style="margin-top: 0.3rem;">
              ${escapeHTML(data.name || "N/A")}
            </p>

          </div>


          <div>

            <strong>Email</strong>

            <p style="margin-top: 0.3rem;">
              <a href="mailto:${escapeAttribute(data.email || "")}">
                ${escapeHTML(data.email || "N/A")}
              </a>
            </p>

          </div>


          <div>

            <strong>Mobile</strong>

            <p style="margin-top: 0.3rem;">
              <a href="tel:${escapeAttribute(data.phone || "")}">
                ${escapeHTML(data.phone || "N/A")}
              </a>
            </p>

          </div>

        </div>


        <div>

          <strong>Message</strong>

          <p style="
            margin-top: 0.5rem;
            color: var(--text-secondary);
            white-space: pre-wrap;
          ">
            ${escapeHTML(data.message || "No message")}
          </p>

        </div>

      `;


      queriesContainer.appendChild(card);

    });


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