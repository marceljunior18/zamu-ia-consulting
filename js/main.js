/**
 * ZAMU IA CONSULTING — LOGIQUE JAVASCRIPT APPLICATIVE
 * Interactions : Navigation, Filtres Prototypes, Simulateurs Interactifs,
 * Accordéon FAQ, Validation Formulaire & Modales
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. GESTION DU DÉFILEMENT DE LA NAVBAR (EFFET BLUR + BORDURE)
  // =========================================================================
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // =========================================================================
  // 2. GESTION DU MENU MOBILE (BURGER & TIROIR 390px)
  // =========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    if (!mobileToggle || !mobileMenu) return;
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.setAttribute('aria-label', 'Fermer le menu de navigation');
    mobileMenu.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (!mobileToggle || !mobileMenu) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
    mobileMenu.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        if (mobileToggle.getAttribute('aria-expanded') === 'true') {
          closeMobileMenu();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileToggle.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
      }
    });
  }

  // =========================================================================
  // 3. SUIVI DE LA SECTION ACTIVE (INTERSECTION OBSERVER)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          desktopNavLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
              link.setAttribute('aria-current', 'page');
            } else {
              link.classList.remove('active');
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // =========================================================================
  // 4. FILTRES DES PROTOTYPES & DÉMONSTRATIONS
  // =========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const prototypeCards = document.querySelectorAll('.prototype-card');

  if (filterTabs.length > 0 && prototypeCards.length > 0) {
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const filterValue = tab.getAttribute('data-filter');

        // Mettre à jour l'onglet actif
        filterTabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Filtrer les cartes
        prototypeCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.removeAttribute('hidden');
            card.style.display = 'flex';
          } else {
            card.setAttribute('hidden', '');
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // =========================================================================
  // 5. ACCORDÉON FAQ
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const questionBtn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');

      if (questionBtn && answer && icon) {
        questionBtn.addEventListener('click', () => {
          const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

          // Fermer les autres items pour un accordéon propre
          faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
              const otherBtn = otherItem.querySelector('.faq-question');
              const otherAns = otherItem.querySelector('.faq-answer');
              const otherIcon = otherItem.querySelector('.faq-icon');
              if (otherBtn && otherAns && otherIcon) {
                otherBtn.setAttribute('aria-expanded', 'false');
                otherAns.setAttribute('hidden', '');
                otherIcon.textContent = '+';
                otherItem.classList.remove('active');
              }
            }
          });

          // Inverser l'état actuel
          if (isExpanded) {
            questionBtn.setAttribute('aria-expanded', 'false');
            answer.setAttribute('hidden', '');
            icon.textContent = '+';
            item.classList.remove('active');
          } else {
            questionBtn.setAttribute('aria-expanded', 'true');
            answer.removeAttribute('hidden');
            icon.textContent = '−';
            item.classList.add('active');
          }
        });
      }
    });
  }

  // =========================================================================
  // 6. SIMULATEURS INTERACTIFS DANS LA MODALE DE DÉMONSTRATION
  // =========================================================================
  const demoModal = document.getElementById('demo-modal');
  const demoBackdrop = document.getElementById('demo-backdrop');
  const demoClose = document.getElementById('demo-modal-close');
  const demoCategory = document.getElementById('demo-modal-category');
  const demoTitle = document.getElementById('demo-modal-title');
  const demoDesc = document.getElementById('demo-modal-desc');
  const demoStage = document.getElementById('demo-simulator-stage');
  const openDemoBtns = document.querySelectorAll('.btn-open-demo');

  const DEMO_TEMPLATES = {
    documind: {
      category: 'PROTOTYPE INTERNE IA',
      title: 'DocuMind IA — Simulateur d\'Extraction Facture',
      desc: 'Simulez le téléversement d\'un document comptable et observez la structuration JSON temps réel.',
      render: () => `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="background:#1a1a1a; border:1px dashed #3670FF; border-radius:8px; padding:20px; text-align:center;">
            <p style="font-size:13.5px; color:#EFEFEF; margin-bottom:12px;">Échantillon chargé : <strong>Facture_Fournisseur_Congo_0894.pdf (284 Ko)</strong></p>
            <button type="button" class="btn btn-primary btn-sm" id="btn-run-ocr">
              <span>Lancer l'analyse OCR Multimodale</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </button>
          </div>
          <div id="ocr-results-box" style="display:none; background:#0d0d0d; border-radius:8px; padding:16px; border:1px solid rgba(239,239,239,0.1);">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:12px; color:#34d399; font-weight:700;">
              <span>✓ Analyse terminée en 840ms</span>
              <span>Indice de confiance : 99.8%</span>
            </div>
            <pre style="font-family:monospace; font-size:12px; color:#8ed0ff; margin:0; overflow-x:auto;">{
  "statut": "SUCCÈS",
  "fournisseur": "SOCIÉTÉ CONGOLAISE DE DISTRIBUTION (SOCODIS)",
  "rccm": "CG-BZV-2018-B-4921",
  "num_facture": "FA-2026-0894",
  "date_emission": "28/10/2026",
  "date_echeance": "15/11/2026",
  "montant_ht": 4850000,
  "devise": "FCFA",
  "tva_18": 873000,
  "montant_ttc": 5723000,
  "compte_analytique": "ACHATS_MARCHANDISES"
}</pre>
          </div>
        </div>
      `,
      init: () => {
        const runBtn = document.getElementById('btn-run-ocr');
        const resultsBox = document.getElementById('ocr-results-box');
        if (runBtn && resultsBox) {
          runBtn.addEventListener('click', () => {
            runBtn.disabled = true;
            runBtn.innerHTML = '<span>Traitement par le modèle vision...</span>';
            setTimeout(() => {
              resultsBox.style.display = 'block';
              runBtn.disabled = false;
              runBtn.innerHTML = '<span>✓ Analyse terminée (Recommencer)</span>';
            }, 850);
          });
        }
      }
    },
    flowsync: {
      category: 'DÉMONSTRATION ACTIVE',
      title: 'FlowSync — Simulateur Omnicanal WhatsApp Business',
      desc: 'Simulez l\'envoi automatique d\'un rappel d\'échéance et la génération sécurisée d\'un lien Mobile Money.',
      render: () => `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; background:#1c1c1c; padding:10px 14px; border-radius:8px;">
            <span style="font-size:12.5px; color:#EFEFEF;">Client test : <strong>ETS MAYOUMBA (Brazzaville)</strong></span>
            <button type="button" class="btn btn-outline btn-sm" id="btn-trigger-wa">Déclencher le rappel</button>
          </div>
          <div id="wa-chat-container" style="background:#0c1014; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:16px; min-height:160px; display:flex; flex-direction:column; gap:10px;">
            <div style="background:rgba(54,112,255,0.15); border:1px solid rgba(54,112,255,0.3); border-radius:8px; padding:10px 12px; font-size:12.5px; max-width:85%; align-self:flex-start;">
              <span style="font-size:10px; color:#9abaff; display:block; margin-bottom:2px;">Assistant ZAMU • 11:20</span>
              Bonjour M. Mayoumba. Votre facture #FA-902 arrive à échéance demain. Montant : 1 250 000 FCFA. Souhaitez-vous régler par Mobile Money ?
            </div>
            <div id="wa-reply" style="display:none; background:rgba(37,211,102,0.15); border:1px solid rgba(37,211,102,0.3); border-radius:8px; padding:10px 12px; font-size:12.5px; max-width:85%; align-self:flex-end;">
              <span style="font-size:10px; color:#85e6aa; display:block; margin-bottom:2px;">Client • 11:21</span>
              Oui svp, envoyez-moi le lien MTN / Airtel Money direct.
            </div>
            <div id="wa-final" style="display:none; background:rgba(54,112,255,0.15); border:1px solid rgba(54,112,255,0.3); border-radius:8px; padding:10px 12px; font-size:12.5px; max-width:85%; align-self:flex-start;">
              <span style="font-size:10px; color:#9abaff; display:block; margin-bottom:2px;">Assistant ZAMU • 11:21</span>
              Voici votre lien sécurisé : <a href="#" style="color:#F9D601; text-decoration:underline;">pay.zamu.cg/inv-902</a>. Dès validation, votre quittance sera générée automatiquement.
            </div>
          </div>
        </div>
      `,
      init: () => {
        const triggerBtn = document.getElementById('btn-trigger-wa');
        const reply = document.getElementById('wa-reply');
        const finalMsg = document.getElementById('wa-final');
        if (triggerBtn && reply && finalMsg) {
          triggerBtn.addEventListener('click', () => {
            triggerBtn.disabled = true;
            triggerBtn.textContent = 'Simulation en cours...';
            setTimeout(() => {
              reply.style.display = 'block';
              setTimeout(() => {
                finalMsg.style.display = 'block';
                triggerBtn.disabled = false;
                triggerBtn.textContent = '✓ Workflow exécuté avec succès';
              }, 600);
            }, 500);
          });
        }
      }
    },
    pulse: {
      category: 'SOLUTIONS MÉTIERS',
      title: 'PulseMetrics — Simulateur d\'Impact de Trésorerie',
      desc: 'Déplacez le curseur pour simuler l\'effet de la réduction des retards de paiement sur votre cash-flow prévisionnel.',
      render: () => `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="background:#1a1a1a; padding:16px; border-radius:8px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13.5px;">
              <span>Délai moyen d'encaissement clients :</span>
              <strong id="slider-val" style="color:#F9D601;">30 jours</strong>
            </div>
            <input type="range" id="cash-slider" min="10" max="60" value="30" style="width:100%; accent-color:#F9D601;">
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div style="background:#0f0f0f; border:1px solid rgba(239,239,239,0.1); border-radius:8px; padding:14px; text-align:center;">
              <span style="font-size:11.5px; color:#999; display:block;">Trésorerie disponible à J+30</span>
              <span id="cash-result" style="font-size:22px; font-weight:800; color:#34d399; display:block; margin-top:4px;">38.4M FCFA</span>
            </div>
            <div style="background:#0f0f0f; border:1px solid rgba(239,239,239,0.1); border-radius:8px; padding:14px; text-align:center;">
              <span style="font-size:11.5px; color:#999; display:block;">Gain de liquidités libérées</span>
              <span id="cash-gain" style="font-size:22px; font-weight:800; color:#F9D601; display:block; margin-top:4px;">+4.8M FCFA</span>
            </div>
          </div>
        </div>
      `,
      init: () => {
        const slider = document.getElementById('cash-slider');
        const sliderVal = document.getElementById('slider-val');
        const cashResult = document.getElementById('cash-result');
        const cashGain = document.getElementById('cash-gain');
        if (slider && sliderVal && cashResult && cashGain) {
          slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            sliderVal.textContent = `${val} jours`;
            const baseCash = 25.0;
            const dynamicCash = (baseCash + (60 - val) * 0.45).toFixed(1);
            const dynamicGain = ((60 - val) * 0.32).toFixed(1);
            cashResult.textContent = `${dynamicCash}M FCFA`;
            cashGain.textContent = `+${dynamicGain}M FCFA`;
          });
        }
      }
    },
    stockpilot: {
      category: 'LOGISTIQUE & ALGORITHMES',
      title: 'StockPilot AI — Simulateur de Réapprovisionnement',
      desc: 'Visualisez l\'ajustement dynamique des seuils d\'alerte pour prévenir les ruptures sur vos articles à forte rotation.',
      render: () => `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="background:#141414; border:1px solid rgba(239,239,239,0.1); border-radius:8px; padding:14px;">
            <p style="font-size:13px; color:#ccc; margin-bottom:12px;">Article sélectionné : <strong>Tôles ondulées galvanisées 3m (Dépôt Brazzaville)</strong></p>
            <div style="display:flex; justify-content:space-between; align-items:center; background:#1f1f1f; padding:10px 14px; border-radius:6px; margin-bottom:10px;">
              <span style="font-size:12.5px;">Niveau de stock actuel :</span>
              <span id="stock-live-count" style="font-weight:700; color:#f87171;">48 unités (Critique)</span>
            </div>
            <button type="button" class="btn btn-primary btn-sm" id="btn-reorder-sim" style="width:100%;">
              <span>Calculer et générer le bon de réapprovisionnement IA</span>
            </button>
          </div>
          <div id="stock-order-result" style="display:none; background:#0d0d0d; border-radius:8px; padding:14px; border:1px solid #34d399;">
            <p style="font-size:12.5px; color:#34d399; font-weight:700; margin-bottom:6px;">✓ Ordre d'achat calculé optimalement</p>
            <p style="font-size:12px; color:#EFEFEF; line-height:1.5; margin:0;">
              Quantité suggérée : <strong>250 unités</strong> • Fournisseur recommandé : <strong>Siderurgie Centrale</strong> • Délai d'acheminement estimé : <strong>5 jours</strong>. Rupture de stock évitée.
            </p>
          </div>
        </div>
      `,
      init: () => {
        const btn = document.getElementById('btn-reorder-sim');
        const result = document.getElementById('stock-order-result');
        const count = document.getElementById('stock-live-count');
        if (btn && result && count) {
          btn.addEventListener('click', () => {
            btn.disabled = true;
            btn.textContent = 'Calcul de la quantité économique de commande...';
            setTimeout(() => {
              result.style.display = 'block';
              count.textContent = '298 unités (Optimal post-commande)';
              count.style.color = '#34d399';
              btn.textContent = '✓ Commande simulée enregistrée';
            }, 600);
          });
        }
      }
    }
  };

  const openDemoModal = (demoKey) => {
    const config = DEMO_TEMPLATES[demoKey];
    if (!config || !demoModal) return;

    if (demoCategory) demoCategory.textContent = config.category;
    demoTitle.textContent = config.title;
    demoDesc.textContent = config.desc;
    demoStage.innerHTML = config.render();
    config.init();

    demoModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeDemoModal = () => {
    if (!demoModal) return;
    demoModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  openDemoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const demoKey = btn.getAttribute('data-demo');
      openDemoModal(demoKey);
    });
  });

  if (demoBackdrop) demoBackdrop.addEventListener('click', closeDemoModal);
  if (demoClose) demoClose.addEventListener('click', closeDemoModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal && !demoModal.hasAttribute('hidden')) {
      closeDemoModal();
    }
  });

  // =========================================================================
  // 7. FORMULAIRE PRINCIPAL DE CONTACT / CONSULTATION
  // =========================================================================
  const fullContactForm = document.getElementById('full-contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtnFull = document.getElementById('submit-btn-full');

  if (fullContactForm && formFeedback && submitBtnFull) {
    fullContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validation rapide
      const fullname = fullContactForm.querySelector('#contact-fullname').value.trim();
      const org = fullContactForm.querySelector('#contact-org').value.trim();
      const email = fullContactForm.querySelector('#contact-email').value.trim();
      const subject = fullContactForm.querySelector('#contact-subject').value;
      const message = fullContactForm.querySelector('#contact-description').value.trim();

      if (!fullname || !org || !email || !subject || !message) {
        formFeedback.className = 'form-feedback-message error';
        formFeedback.textContent = 'Veuillez remplir tous les champs obligatoires (*) pour soumettre votre demande.';
        formFeedback.removeAttribute('hidden');
        return;
      }

      // Simulation d'envoi API
      const originalText = submitBtnFull.innerHTML;
      submitBtnFull.disabled = true;
      submitBtnFull.innerHTML = '<span>Transmission de votre dossier en cours...</span>';

      setTimeout(() => {
        formFeedback.className = 'form-feedback-message success';
        formFeedback.innerHTML = `
          <strong>✓ Demande reçue avec succès !</strong><br>
          Merci ${fullname}. Notre équipe d'ingénieurs à Brazzaville étudie votre cas et vous contactera à l'adresse <em>${email}</em> sous 24 heures ouvrées.
        `;
        formFeedback.removeAttribute('hidden');
        fullContactForm.reset();
        submitBtnFull.disabled = false;
        submitBtnFull.innerHTML = originalText;
      }, 900);
    });
  }

  // =========================================================================
  // 8. MODALE MENTIONS LÉGALES & CONFIDENTIALITÉ
  // =========================================================================
  const legalModal = document.getElementById('legal-modal');
  const legalBackdrop = document.getElementById('legal-backdrop');
  const legalClose = document.getElementById('legal-modal-close');
  const openLegalBtn = document.getElementById('open-legal-btn');
  const openPrivacyBtn = document.getElementById('open-privacy-btn');

  const openLegal = () => {
    if (!legalModal) return;
    legalModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeLegal = () => {
    if (!legalModal) return;
    legalModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  if (openLegalBtn) openLegalBtn.addEventListener('click', openLegal);
  if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', openLegal);
  if (legalBackdrop) legalBackdrop.addEventListener('click', closeLegal);
  if (legalClose) legalClose.addEventListener('click', closeLegal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal && !legalModal.hasAttribute('hidden')) {
      closeLegal();
    }
  });

  // =========================================================================
  // 9. DÉFILEMENT FLUIDE POUR LES ANCRES INTERNES
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
