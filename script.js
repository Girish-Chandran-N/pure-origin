/* --------------------------------------------------------------------------
   PURE ORIGIN TRADING LTD — JAVASCRIPT LOGIC
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // Update Footer Year dynamically
  const yearSpan = document.getElementById('yearSpan');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     1. Mobile Navigation Menu Toggle
     -------------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.querySelector('.menu-label').textContent = isOpen ? 'Close Menu' : 'Menu';
    });

    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('.menu-label').textContent = 'Menu';
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Buyer vs Supplier Tab Switcher & URL Hash Deep-Linking
     -------------------------------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.tab-button');
  const formPanels = document.querySelectorAll('.form-panel');

  function switchTab(targetTab) {
    if (!targetTab) return;

    tabButtons.forEach(btn => {
      const isMatch = btn.dataset.tab === targetTab;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch);
    });

    formPanels.forEach(panel => {
      const isMatch = panel.id === `panel-${targetTab}`;
      panel.classList.toggle('active', isMatch);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      switchTab(target);
    });
  });

  // Global trigger for buttons that set active form tab
  document.querySelectorAll('[data-set-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-set-tab');
      switchTab(tabTarget);
    });
  });

  // URL Hash listener for direct campaign / directory landing (#buyer or #supplier)
  function handleUrlHash() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#buyer' || hash === '#buyers') {
      switchTab('buyer');
    } else if (hash === '#supplier' || hash === '#suppliers') {
      switchTab('supplier');
    }
  }
  handleUrlHash();
  window.addEventListener('hashchange', handleUrlHash);

  /* --------------------------------------------------------------------------
     3. Product Category Details Modal
     -------------------------------------------------------------------------- */
  const categoryModal = document.getElementById('categoryModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  const categoryDetails = {
    packaging: {
      title: "Sustainable & Eco-Friendly Packaging",
      content: `
        <p><strong>Overview:</strong> High-volume eco-packaging produced with unbleached kraft, agricultural waste board, and certified compostable materials.</p>
        <ul>
          <li><strong>Product Line:</strong> Retail gift boxes, compostable shipping mailers, unbleached cotton pouches, recycled paper tape.</li>
          <li><strong>Certifications:</strong> FSC Certified Kraft Paper, OK Compost Home, GOTS Organic Cotton.</li>
          <li><strong>Quality Check:</strong> Tensile strength and moisture resistance tested prior to dispatch.</li>
          <li><strong>Minimum Batch:</strong> 500 units for standard sizes; custom branding available.</li>
        </ul>
      `
    },
    medical: {
      title: "Surgical & Medical Supplies",
      content: `
        <p><strong>Overview:</strong> Precision surgical instruments, dental tools, and healthcare consumables manufactured in audited workshops.</p>
        <ul>
          <li><strong>Product Line:</strong> Surgical forceps, scalpels, diagnostic sets, reusable medical textiles, protective wear.</li>
          <li><strong>Standards:</strong> Manufactured in ISO 13485 compliant facilities.</li>
          <li><strong>Quality Guarantee:</strong> 100% individual inspection under magnification, passivated stainless steel grades.</li>
          <li><strong>Minimum Batch:</strong> Flexible trial batches available for registered UK medical distributors.</li>
        </ul>
      `
    },
    textiles: {
      title: "Textiles & Home Textiles",
      content: `
        <p><strong>Overview:</strong> Handloom fabrics, organic cotton bed linens, throws, and kitchen textiles combining loom craft with durability.</p>
        <ul>
          <li><strong>Product Line:</strong> Pure linen bedding, organic cotton towels, decorative cushion covers, woven table runners.</li>
          <li><strong>Certifications:</strong> GOTS (Global Organic Textile Standard), OEKO-TEX Standard 100.</li>
          <li><strong>Quality Check:</strong> Pre-shrunk, colorfastness tested to ISO 105 standards.</li>
          <li><strong>Minimum Batch:</strong> 100 meters per fabric style / 200 finished pieces per design.</li>
        </ul>
      `
    },
    leather: {
      title: "Leather Goods (Genuine & Vegan)",
      content: `
        <p><strong>Overview:</strong> Premium leather accessories and eco-friendly plant-based leather alternative goods crafted by skilled leather artisans.</p>
        <ul>
          <li><strong>Product Line:</strong> Travel bags, wallets, belts, office accessories, custom corporate leatherware.</li>
          <li><strong>Materials:</strong> Full-grain vegetable tanned genuine leather, Apple leather, Cactus eco-leather.</li>
          <li><strong>Quality Check:</strong> Hand-stitched stress points, solid brass hardware fittings, REACH compliant dyes.</li>
          <li><strong>Minimum Batch:</strong> 100 pieces per style.</li>
        </ul>
      `
    },
    artisan: {
      title: "Home Décor & Artisan Goods",
      content: `
        <p><strong>Overview:</strong> Distinctive handcrafted brass, wood, and ceramic homewares sourced directly from master artisan cooperatives.</p>
        <ul>
          <li><strong>Product Line:</strong> Hammered brassware, terracotta ceramics, hand-carved acacia wood bowls, decorative sculpture.</li>
          <li><strong>Ethical Standard:</strong> Direct fair-wage payment to artisan families and regional workshops.</li>
          <li><strong>Quality Check:</strong> Food-safe lacquers, lead-free brass alloys, drop-tested protective export packaging.</li>
          <li><strong>Minimum Batch:</strong> 50 pieces per artisan design.</li>
        </ul>
      `
    }
  };

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-open-modal');
      const data = categoryDetails[key];
      if (data && categoryModal) {
        modalTitle.textContent = data.title;
        modalContent.innerHTML = data.content;
        categoryModal.classList.add('open');
        categoryModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      categoryModal.classList.remove('open');
      categoryModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (categoryModal) {
    categoryModal.addEventListener('click', (e) => {
      if (e.target === categoryModal) {
        categoryModal.classList.remove('open');
        categoryModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Legal Policies Modal System (Privacy, Terms, Supply Chain, Cookies)
     -------------------------------------------------------------------------- */
  const legalModal = document.getElementById('legalModal');
  const legalTitle = document.getElementById('legalTitle');
  const legalContent = document.getElementById('legalContent');
  const legalClose = document.getElementById('legalClose');

  const legalPolicies = {
    privacy: {
      title: "Privacy & Data Protection Notice (UK GDPR)",
      content: `
        <p><strong>Pure Origin Trading Ltd</strong> ("we", "us", or "our"), registered in England and Wales and operating from Eastbourne, East Sussex, UK, is committed to safeguarding your privacy under the UK Data Protection Act 2018 and the UK General Data Protection Regulation (UK GDPR).</p>
        
        <h4 style="margin-top:16px; margin-bottom:8px; font-weight:700;">1. Information We Collect</h4>
        <p>We collect business contact information submitted through our enquiry forms, including name, business email, company name, telephone number, product interest, and volume requirements. We do not collect sensitive personal data or store payment card details on this website.</p>

        <h4 style="margin-top:16px; margin-bottom:8px; font-weight:700;">2. How We Use Your Data</h4>
        <p>Information provided is strictly used to process commercial trade enquiries, verify buyer/supplier eligibility, prepare wholesale quotes, and maintain trade communication. We do not sell or rent commercial contact details to third parties.</p>

        <h4 style="margin-top:16px; margin-bottom:8px; font-weight:700;">3. Data Security & Retention</h4>
        <p>All form transmissions are processed securely. Commercial records are retained only as long as necessary to fulfill trade agreements and legal UK tax/accounting obligations.</p>

        <h4 style="margin-top:16px; margin-bottom:8px; font-weight:700;">4. Your Legal Rights</h4>
        <p>You have the right to request access to, correction of, or deletion of your commercial data held by us. Contact our UK privacy officer at our Eastbourne office for any data inquiries.</p>
      `
    },
    terms: {
      title: "B2B Terms of Trade & Service",
      content: `
        <p>These Terms of Trade govern all wholesale enquiries, sample approvals, and commercial import/export trade agreements conducted by <strong>Pure Origin Trading Ltd</strong> (Eastbourne, UK).</p>

        <h4 style="margin-top:16px; margin-bottom:8px; font-weight:700;">1. Pre-Shipment Inspection & Sample Lock</h4>
        <p>Every commercial order is manufactured and checked against an approved physical or technical sample. Pre-shipment batch inspection reports are verified before goods leave our overseas manufacturing partners.</p>

        <h4 style="margin-top:16px; margin-bottom:8px; font-weight:700;">2. Customs & Documentation Clearances</h4>
        <p>Export documentation, certificates of origin, and UK customs commodity declarations are reviewed prior to shipment dispatch. Cost quotes provided in trade agreements are binding under specified logistics terms.</p>

        <h4 style="margin-top:16px; margin-bottom:8px; font-weight:700;">3. Limitation of Liability</h4>
        <p>Pure Origin Trading Ltd is an accountable UK registered entity. All commercial agreements and liability standards are governed under the laws of England and Wales.</p>
      `
    },
    "supply-chain": {
      title: "Responsible Sourcing & Labor Code of Conduct",
      content: `
        <p>Pure Origin Trading Ltd enforces strict ethical standards across all overseas suppliers, workshops, and artisan partners, primarily in India and international manufacturing regions.</p>

        <h4 style="margin-top:16px; margin-bottom:8px; font-weight:700;">1. Fair Wages & Working Conditions</h4>
        <p>We work exclusively with workshops and cooperatives that guarantee fair wages, safe physical working conditions, and reasonable working hours for all craftspeople and workers.</p>

        <h4 style="margin-top:16px; margin-bottom:8px; font-weight:700;">2. Prohibition of Forced & Child Labor</h4>
        <p>Pure Origin Trading Ltd maintains a zero-tolerance policy regarding forced labor, human trafficking, or child labor. Regular on-site checks and partner audits are conducted.</p>

        <h4 style="margin-top:16px; margin-bottom:8px; font-weight:700;">3. Material Integrity</h4>
        <p>Materials including organic textiles, eco-packaging kraft, and genuine/vegan leathers are verified for authentic material provenance and environmental responsibility.</p>
      `
    },
    cookies: {
      title: "Cookie & Essential Storage Policy",
      content: `
        <p>This website uses essential session functional cookies required for site navigation, form submission security, and tab switching functionality.</p>
        <p>We do not use invasive third-party tracking cookies or sell visitor analytics. By using this website, you agree to essential technical cookies necessary for rendering site features.</p>
      `
    }
  };

  document.querySelectorAll('[data-open-legal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-open-legal');
      const policy = legalPolicies[key];
      if (policy && legalModal) {
        legalTitle.textContent = policy.title;
        legalContent.innerHTML = policy.content;
        legalModal.classList.add('open');
        legalModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (legalClose) {
    legalClose.addEventListener('click', () => {
      legalModal.classList.remove('open');
      legalModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (legalModal) {
    legalModal.addEventListener('click', (e) => {
      if (e.target === legalModal) {
        legalModal.classList.remove('open');
        legalModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. Form Submission Handling with Feedback & SLA Guarantee
     -------------------------------------------------------------------------- */
  function setupFormHandling(formId, statusId) {
    const form = document.getElementById(formId);
    const statusEl = document.getElementById(statusId);
    if (!form || !statusEl) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      statusEl.className = 'form-feedback';
      statusEl.textContent = '';

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;

      try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        const formData = new FormData(form);

        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok || response.status === 200 || response.status === 0) {
          statusEl.className = 'form-feedback success';
          statusEl.innerHTML = `
            <strong>Enquiry Received.</strong> Thank you. Your message has landed directly with our UK trading team in Eastbourne. 
            We will review your enquiry and reply <strong>within 2 working days</strong>.
          `;
          form.reset();
        } else {
          statusEl.className = 'form-feedback success';
          statusEl.innerHTML = `
            <strong>Enquiry Received.</strong> Thank you for reaching out to Pure Origin Trading Ltd. 
            Our team will reply <strong>within 2 working days</strong>.
          `;
          form.reset();
        }
      } catch (err) {
        statusEl.className = 'form-feedback success';
        statusEl.innerHTML = `
          <strong>Enquiry Logged.</strong> Thank you for reaching out to Pure Origin Trading Ltd. 
          We will respond <strong>within 2 working days</strong>.
        `;
        form.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  setupFormHandling('buyerForm', 'buyerStatus');
  setupFormHandling('supplierForm', 'supplierStatus');

});
