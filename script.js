// 1. Mobilní menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// 2. Přepínání záložek (Závodní tým vs. Cestovatelé)
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabName}`);
    const targetBtn = document.getElementById(`tab-btn-${tabName}`);

    if (targetTab) targetTab.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');
}

// 3. Filtrování karet jezdců
const filterButtons = document.querySelectorAll('.filter-btn');
const riderCards = document.querySelectorAll('.rider-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        riderCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 4. Generátor hlášek z depa
const quotes = [
    "„To nemá vůli, to je tepelná dilatace pro vysoké otáčky!“",
    "„Když to nejde silou, vezmi větší kladivo nebo stahovací pásku.“",
    "„Zatím to drží na čestné slovo a jednu osmičku šroub.“",
    "„Neprší, to jen chladič přírody optimalizuje teplotu válce.“",
    "„Ještě jedno kolo a pak už fakt jdeme spát... (řečeno ve 2:30 ráno v depu).“",
    "„Zkratka je sice horší cesta, ale o to víc si užijeme podvozek.“"
];

let currentQuoteIndex = 0;

function nextQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (!quoteDisplay) return;
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteDisplay.textContent = quotes[currentQuoteIndex];
}

// 5. Ukládání zaškrtnutých položek v Závodním checklistu (LocalStorage)
const checkboxes = document.querySelectorAll('#printableChecklist input[type="checkbox"]');

checkboxes.forEach(cb => {
    const key = `skrzdrn_check_${cb.dataset.item}`;
    if (localStorage.getItem(key) === 'true') {
        cb.checked = true;
    }

    cb.addEventListener('change', () => {
        localStorage.setItem(key, cb.checked);
    });
});

function resetChecklist() {
    checkboxes.forEach(cb => {
        cb.checked = false;
        localStorage.removeItem(`skrzdrn_check_${cb.dataset.item}`);
    });
}
