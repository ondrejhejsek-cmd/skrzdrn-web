// 1. PŘEPÍNÁNÍ ZÁLOŽEK V SEKCI "ŽIVÝ OBSAH ZE SEZÓNY"
function switchTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabContents.forEach(content => {
        content.classList.remove('active');
        content.hidden = true;
    });

    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });

    const activeContent = document.getElementById(`tab-${tabName}`);
    const activeButton = document.getElementById(`tab-btn-${tabName}`);

    if (activeContent) {
        activeContent.classList.add('active');
        activeContent.hidden = false;
    }

    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-selected', 'true');
    }
}

// 2. FILTR V SEKCI "JEZDCI A STROJE"
function initRiderFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const riderCards = document.querySelectorAll('.rider-card');

    if (!filterButtons.length || !riderCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedFilter = button.getAttribute('data-filter');

            // Zvýraznění aktivního tlačítka
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Zobrazení / skrytí karet jezdců
            riderCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (selectedFilter === 'all' || category === selectedFilter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 3. HLÁŠKY Z DEPA A Z CEST
const depotQuotes = [
    '„To nemá vůli, to je tepelná dilatace pro vysoké otáčky!“',
    '„Když to nejde silou, vezmi větší kladivo nebo stahovací pásku.“',
    '„Brzdy jsou jen pro ty, co nevěří svému andělovi strážnému.“',
    '„Na Pionýru je každá rovinka dlouhá jako cesta do Chorvatska.“',
    '„Neřeš spotřebu, řeš poměr oleje v benzínu, ať to nezadřeš před cílem!“',
    '„V dešti se nepozná výkon motoru, ale odvaha v první zatáčce.“',
    '„Kdo nelehne v blátě, jako by na enduru ani nebyl.“'
    '„Kdo nepadá nezrychluje.“'
    '„Kdo brzdí, nevyhrává.“'
];

let currentQuoteIndex = 0;

function nextQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (!quoteDisplay) return;

    currentQuoteIndex = (currentQuoteIndex + 1) % depotQuotes.length;
    quoteDisplay.textContent = depotQuotes[currentQuoteIndex];
}

// 4. INTERAKTIVNÍ ZÁVODNÍ CHECKLIST (UKLÁDÁNÍ DO LOCALSTORAGE)
const CHECKLIST_STORAGE_KEY = 'skrzdrn_race_checklist_v1';

function initChecklist() {
    const checkboxes = document.querySelectorAll('#printableChecklist input[type="checkbox"]');
    if (!checkboxes.length) return;

    let savedState = {};
    try {
        savedState = JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY)) || {};
    } catch (e) {
        savedState = {};
    }

    checkboxes.forEach(box => {
        const key = box.getAttribute('data-item');
        if (key && savedState[key]) {
            box.checked = true;
        }

        box.addEventListener('change', () => {
            if (!key) return;
            savedState[key] = box.checked;
            localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(savedState));
        });
    });
}

function resetChecklist() {
    const checkboxes = document.querySelectorAll('#printableChecklist input[type="checkbox"]');
    checkboxes.forEach(box => {
        box.checked = false;
    });
    localStorage.removeItem(CHECKLIST_STORAGE_KEY);
}

// 5. MOBILNÍ HAMBURGER MENU
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Zavření menu po kliknutí na odkaz na mobilu
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// 6. KONTAKTNÍ FORMULÁŘ (Odeslání přes výchozí e-mailový klient / potvrzení)
function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (!form || !feedback) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const topicSelect = document.getElementById('contactTopic');
        const topic = topicSelect.options[topicSelect.selectedIndex].text;
        const message = document.getElementById('contactMessage').value.trim().replace(/\r?\n/g, '\r\n');

        const subject = encodeURIComponent(`[SKRZ DRN Web] ${topic} – ${name}`);
        const rawBody = [
            `Jméno: ${name}`,
            `E-mail: ${email}`,
            `Téma: ${topic}`,
            ``,
            `Zpráva:`,
            `${message}`
        ].join('\r\n');

        const body = encodeURIComponent(rawBody);

        feedback.textContent = 'Připravuji e-mailovou zprávu v tvém poštovním klientovi...';
        feedback.style.color = '#ef4444';

        window.location.href = `mailto:ondrej.hejsek@seznam.cz?subject=${subject}&body=${body}`;
    });
}

// INICIALIZACE PO NAČTENÍ STRÁNKY
document.addEventListener('DOMContentLoaded', () => {
    initRiderFilter();
    initChecklist();
    initMobileMenu();
    initContactForm();

    // Napojení tlačítek tabů přes data-tab atribut
    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.getAttribute('data-tab'));
        });
    });
});