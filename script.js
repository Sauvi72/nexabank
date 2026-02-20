/* ===================== NEXABANK SCRIPT.JS ===================== */

// ===================== APP STATE =====================
const state = {
  loggedIn: false,
  user: null,
  currentPage: 'login',
  sidebarOpen: false,
  sessionTime: 1800,
  sessionInterval: null,
  marketInterval: null,
  stockMarketTab: 'overview',
  watchlist: [],
  darkMode: false,
};

// ===================== SIMULATED DATA =====================
const users = { demo: { name: 'Rahul Sharma', accNo: '*', pin: '123456' } };

const accounts = [
  { type: 'Savings Account', name: 'Primary Savings', balance: 124350.75, acc: '****4521', ifsc: 'NEXA0001234', grad: 'linear-gradient(135deg,#4f46e5,#06b6d4)', icon: 'fa-piggy-bank' },
  { type: 'Current Account', name: 'Business Current', balance: 562000.00, acc: '****7890', ifsc: 'NEXA0001234', grad: 'linear-gradient(135deg,#8b5cf6,#4f46e5)', icon: 'fa-briefcase' },
  { type: 'Fixed Deposit', name: 'FD — 8.5% p.a.', balance: 200000.00, acc: 'FD****3421', ifsc: '—', grad: 'linear-gradient(135deg,#10b981,#059669)', icon: 'fa-lock' },
];

const transactions = [
  { id:'TXN001', date:'Feb 19, 2025', desc:'Salary Credit', cat:'Income', mode:'NEFT', amount:85000, type:'credit', balance:124350, status:'success' },
  { id:'TXN002', date:'Feb 18, 2025', desc:'Amazon Shopping', cat:'Shopping', mode:'Debit Card', amount:-3499, type:'debit', balance:39350, status:'success' },
  { id:'TXN003', date:'Feb 18, 2025', desc:'Swiggy Food Order', cat:'Food', mode:'UPI', amount:-650, type:'debit', balance:38700, status:'success' },
  { id:'TXN004', date:'Feb 17, 2025', desc:'Electricity Bill', cat:'Bills', mode:'Bill Pay', amount:-2100, type:'debit', balance:38050, status:'success' },
  { id:'TXN005', date:'Feb 16, 2025', desc:'Transfer from Priya', cat:'Transfer', mode:'IMPS', amount:5000, type:'credit', balance:43050, status:'success' },
  { id:'TXN006', date:'Feb 15, 2025', desc:'Jio Recharge', cat:'Recharge', mode:'UPI', amount:-299, type:'debit', balance:38051, status:'success' },
  { id:'TXN007', date:'Feb 15, 2025', desc:'Netflix Subscription', cat:'Entertainment', mode:'Debit Card', amount:-649, type:'debit', balance:37402, status:'success' },
  { id:'TXN008', date:'Feb 14, 2025', desc:'Dividend Credit', cat:'Investment', mode:'NACH', amount:1250, type:'credit', balance:38652, status:'success' },
  { id:'TXN009', date:'Feb 13, 2025', desc:'Petrol — HP Station', cat:'Transport', mode:'Debit Card', amount:-2800, type:'debit', balance:35852, status:'success' },
  { id:'TXN010', date:'Feb 12, 2025', desc:'SIP Investment', cat:'Investment', mode:'Auto-Debit', amount:-5000, type:'debit', balance:30852, status:'success' },
  { id:'TXN011', date:'Feb 11, 2025', desc:'Freelance Payment', cat:'Income', mode:'NEFT', amount:12000, type:'credit', balance:42852, status:'success' },
  { id:'TXN012', date:'Feb 10, 2025', desc:'Hospital Bill', cat:'Health', mode:'UPI', amount:-4200, type:'debit', balance:38652, status:'success' },
  { id:'TXN013', date:'Feb 10, 2025', desc:'Google Play Store', cat:'Entertainment', mode:'Debit Card', amount:-149, type:'debit', balance:38503, status:'pending' },
  { id:'TXN014', date:'Feb 09, 2025', desc:'Transfer — Failed', cat:'Transfer', mode:'IMPS', amount:-10000, type:'debit', balance:38503, status:'failed' },
  { id:'TXN015', date:'Feb 08, 2025', desc:'Grocery — BigBazaar', cat:'Shopping', mode:'UPI', amount:-1890, type:'debit', balance:36613, status:'success' },
];

const beneficiaries = [
  { name:'Priya Patel', acc:'****2233', bank:'HDFC Bank', initial:'P' },
  { name:'Amit Sharma', acc:'****5678', bank:'ICICI Bank', initial:'A' },
  { name:'Ravi Kumar', acc:'****9012', bank:'SBI', initial:'R' },
  { name:'Neha Joshi', acc:'****3456', bank:'Axis Bank', initial:'N' },
];

const cardData = [
  { type:'Debit Card', num:'**** **** **** 4521', holder:'Rahul Sharma', exp:'08/28', cvv:'***', grad:'linear-gradient(135deg,#4f46e5,#06b6d4)', network:'visa', frozen:false, limit:'₹1,00,000/day' },
  { type:'Credit Card', num:'**** **** **** 7892', holder:'Rahul Sharma', exp:'03/27', cvv:'***', grad:'linear-gradient(135deg,#8b5cf6,#ec4899)', network:'mastercard', frozen:false, limit:'₹2,00,000' },
];

const faqs = [
  { q:'How do I reset my banking PIN?', a:'Go to Settings > Security Settings > Reset PIN. You will receive an OTP on your registered mobile number to verify your identity before setting a new PIN.' },
  { q:'How long does an NEFT transfer take?', a:'NEFT transfers are processed in hourly batches between 8 AM to 7 PM on working days. Transfers initiated after hours are processed on the next working day.' },
  { q:'What is the daily UPI transaction limit?', a:'The daily UPI transaction limit is ₹1,00,000 per day per bank account as per NPCI guidelines. Some merchants may have higher limits with special approval.' },
  { q:'How do I report a fraudulent transaction?', a:'Immediately call 1800-XXX-NEXA or use the Chat support in the app. You can also block your card instantly from the Cards section. Report within 24 hours for zero liability.' },
  { q:'Can I have multiple accounts in NexaBank?', a:'Yes! You can link up to 5 bank accounts to your NexaBank profile. Use the "Add Account" option in the Accounts section or through the profile dropdown.' },
];

// ===================== MARKET DATA =====================
let marketData = {
  NIFTY: { val: 23450.25, chg: 0.42 },
  SENSEX: { val: 77120.50, chg: 0.38 },
  BANKNIFTY: { val: 48920.75, chg: -0.21 },
  MIDCAP: { val: 12340.60, chg: 0.95 },
};

const stocksData = [
  { ticker:'RELIANCE', name:'Reliance Industries', sector:'Energy', price:2850.40, chg:1.24, mktCap:'₹19.3L Cr' },
  { ticker:'TCS', name:'Tata Consultancy', sector:'IT', price:3920.15, chg:-0.42, mktCap:'₹14.2L Cr' },
  { ticker:'HDFCBANK', name:'HDFC Bank', sector:'Banking', price:1680.90, chg:0.87, mktCap:'₹12.7L Cr' },
  { ticker:'INFY', name:'Infosys Limited', sector:'IT', price:1542.30, chg:-0.63, mktCap:'₹6.4L Cr' },
  { ticker:'ICICIBANK', name:'ICICI Bank', sector:'Banking', price:1120.55, chg:1.45, mktCap:'₹7.9L Cr' },
  { ticker:'HINDUNILVR', name:'Hindustan Unilever', sector:'FMCG', price:2340.20, chg:-0.28, mktCap:'₹5.5L Cr' },
  { ticker:'ITC', name:'ITC Limited', sector:'FMCG', price:462.80, chg:0.95, mktCap:'₹5.8L Cr' },
  { ticker:'BHARTIARTL', name:'Bharti Airtel', sector:'Telecom', price:1640.70, chg:2.14, mktCap:'₹9.7L Cr' },
  { ticker:'BAJFINANCE', name:'Bajaj Finance', sector:'NBFC', price:7240.35, chg:-1.05, mktCap:'₹4.4L Cr' },
  { ticker:'WIPRO', name:'Wipro Limited', sector:'IT', price:498.60, chg:0.33, mktCap:'₹2.7L Cr' },
  { ticker:'SUNPHARMA', name:'Sun Pharma', sector:'Pharma', price:1820.45, chg:1.87, mktCap:'₹4.4L Cr' },
  { ticker:'TATASTEEL', name:'Tata Steel', sector:'Metal', price:142.30, chg:-0.74, mktCap:'₹1.8L Cr' },
  { ticker:'LTIM', name:'LTIMindtree', sector:'IT', price:5640.90, chg:3.21, mktCap:'₹1.7L Cr' },
  { ticker:'ADANIENT', name:'Adani Enterprises', sector:'Conglomerate', price:2940.60, chg:-1.42, mktCap:'₹3.4L Cr' },
  { ticker:'ASIANPAINT', name:'Asian Paints', sector:'Consumer', price:2780.15, chg:0.52, mktCap:'₹2.7L Cr' },
];

const portfolioHoldings = [
  { ticker:'RELIANCE', qty:10, buyPrice:2600, ltp:2850.40 },
  { ticker:'TCS', qty:5, buyPrice:3800, ltp:3920.15 },
  { ticker:'HDFCBANK', qty:15, buyPrice:1550, ltp:1680.90 },
  { ticker:'INFY', qty:20, buyPrice:1600, ltp:1542.30 },
  { ticker:'ITC', qty:50, buyPrice:440, ltp:462.80 },
];

const globalIndices = [
  { name:'Dow Jones', val:38520.20, chg:0.32 },
  { name:'NASDAQ', val:16840.55, chg:0.87 },
  { name:'S&P 500', val:5120.40, chg:0.55 },
  { name:'FTSE 100', val:8240.80, chg:-0.22 },
  { name:'Nikkei 225', val:39480.70, chg:1.12 },
  { name:'Hang Seng', val:17240.30, chg:-0.85 },
];

const spendingData = [
  { cat:'Food & Dining', amt:8420, color:'#4f46e5' },
  { cat:'Shopping', amt:12350, color:'#06b6d4' },
  { cat:'Transport', amt:3200, color:'#8b5cf6' },
  { cat:'Bills & Utilities', amt:6800, color:'#10b981' },
  { cat:'Entertainment', amt:2100, color:'#f59e0b' },
  { cat:'Health', amt:4200, color:'#ef4444' },
];

const catColors = {
  Income:'rgba(16,185,129,0.12)', Shopping:'rgba(6,182,212,0.12)', Food:'rgba(245,158,11,0.12)',
  Bills:'rgba(79,70,229,0.12)', Transfer:'rgba(139,92,246,0.12)', Recharge:'rgba(16,185,129,0.12)',
  Entertainment:'rgba(239,68,68,0.12)', Investment:'rgba(79,70,229,0.12)', Transport:'rgba(245,158,11,0.12)',
  Health:'rgba(239,68,68,0.12)'
};

const notifications = [
  { icon:'fa-arrow-down', color:'rgba(16,185,129,0.15)', iconColor:'#10b981', title:'₹85,000 Salary Credited', time:'2 hours ago' },
  { icon:'fa-shield-halved', color:'rgba(79,70,229,0.15)', iconColor:'#4f46e5', title:'Login from new device detected', time:'Yesterday' },
  { icon:'fa-chart-line', color:'rgba(245,158,11,0.15)', iconColor:'#f59e0b', title:'NIFTY crossed 23,500!', time:'Just now' },
];

// ===================== UTILITY FUNCTIONS =====================
function fmt(num) { return '₹' + Math.abs(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtNum(num) { return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function toast(msg, type = 'info') {
  const icons = { success:'fa-check-circle', error:'fa-circle-xmark', warn:'fa-triangle-exclamation', info:'fa-circle-info' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${msg}</span>`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => { el.classList.add('toast-out'); setTimeout(() => el.remove(), 300); }, 3000);
}

function showPage(page) {
  if (page !== 'login' && page !== 'landing' && !state.loggedIn) {
    showPage('login'); return;
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(`page-${page}`);
  if (el) el.classList.add('active');
  state.currentPage = page;
  document.querySelectorAll('.nav-item').forEach(i => {
    i.classList.toggle('active', i.dataset.page === page);
  });
  const nav = document.getElementById('topNav');
  if (page === 'landing') { nav.style.background = 'rgba(255,255,255,0.95)'; }
  // Init pages
  if (page === 'dashboard') initDashboard();
  if (page === 'accounts') initAccounts();
  if (page === 'transfer') initTransfer();
  if (page === 'cards') initCards();
  if (page === 'transactions') initTransactions();
  if (page === 'analytics') initAnalytics();
  if (page === 'investments') initInvestments();
  if (page === 'loans') initLoans();
  if (page === 'support') initSupport();
  if (page === 'stockmarket') initStockMarket();
  if (page === 'landing') initLandingMarket();
  // Close sidebar on mobile
  if (window.innerWidth < 900) closeSidebar();
  window.scrollTo(0,0);
}

function openModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

// ===================== AUTH =====================
function login() {
  const acc = document.getElementById('loginAcc').value.trim();
  const user = document.getElementById('loginUser').value.trim();
  const pins = [...document.querySelectorAll('.pin-digit')].map(i => i.value).join('');
  if (!acc || !user || pins.length < 6) { toast('Please fill all fields', 'error'); return; }
  if (user !== 'demo' || pins !== '123456') { toast('Invalid credentials! Use demo/123456', 'error'); return; }
  const btn = document.getElementById('loginBtn');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
  btn.disabled = true;
  setTimeout(() => {
    state.loggedIn = true;
    state.user = { name: 'Rahul Sharma', username: user, accNo: acc };
    localStorage.setItem('nexabank_session', JSON.stringify(state.user));
    document.getElementById('navUserName').textContent = 'Rahul S.';
    document.getElementById('dashUserName').textContent = 'Rahul';
    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Login Securely';
    btn.disabled = false;
    showPage('dashboard');
    startSession();
    toast('Welcome back, Rahul! 🎉', 'success');
  }, 1800);
}

function logout() {
  state.loggedIn = false;
  state.user = null;
  localStorage.removeItem('nexabank_session');
  clearInterval(state.sessionInterval);
  clearInterval(state.marketInterval);
  closeModal('logoutModal');
  showPage('login');
  document.querySelectorAll('.pin-digit').forEach(i => i.value = '');
  document.getElementById('loginAcc').value = '';
  document.getElementById('loginUser').value = '';
  toast('Logged out securely. Goodbye!', 'info');
}

// ===================== SESSION =====================
function startSession() {
  state.sessionTime = 1800;
  clearInterval(state.sessionInterval);
  state.sessionInterval = setInterval(() => {
    state.sessionTime--;
    const m = Math.floor(state.sessionTime / 60).toString().padStart(2,'0');
    const s = (state.sessionTime % 60).toString().padStart(2,'0');
    const el = document.getElementById('sessionTimer');
    if (el) el.textContent = `${m}:${s}`;
    if (state.sessionTime <= 60 && state.sessionTime > 0) {
      document.getElementById('sessionCountdown').textContent = state.sessionTime;
      openModal('sessionModal');
    }
    if (state.sessionTime <= 0) { clearInterval(state.sessionInterval); logout(); }
  }, 1000);
  document.addEventListener('mousemove', resetSession);
  document.addEventListener('keydown', resetSession);
}

function resetSession() {
  state.sessionTime = 1800;
  closeModal('sessionModal');
}

// ===================== SIDEBAR =====================
function toggleSidebar() {
  state.sidebarOpen = !state.sidebarOpen;
  document.getElementById('sidebar').classList.toggle('open', state.sidebarOpen);
  document.getElementById('sidebarOverlay').classList.toggle('show', state.sidebarOpen);
}
function closeSidebar() {
  state.sidebarOpen = false;
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}

// ===================== MARKET UPDATER =====================
function startMarketUpdates() {
  function update() {
    Object.keys(marketData).forEach(k => {
      const chg = rand(-0.3, 0.3);
      marketData[k].chg = parseFloat((marketData[k].chg + chg * 0.1).toFixed(2));
      marketData[k].val = parseFloat((marketData[k].val * (1 + chg / 1000)).toFixed(2));
    });
    stocksData.forEach(s => {
      const chg = rand(-0.5, 0.5);
      s.chg = parseFloat((s.chg + chg * 0.05).toFixed(2));
      s.price = parseFloat((s.price * (1 + chg / 1000)).toFixed(2));
    });
    globalIndices.forEach(g => {
      g.chg = parseFloat((g.chg + rand(-0.1, 0.1)).toFixed(2));
      g.val = parseFloat((g.val * (1 + rand(-0.001, 0.001))).toFixed(2));
    });
    updateNavMarket();
    if (state.currentPage === 'dashboard') updateDashMarket();
    if (state.currentPage === 'stockmarket') updateSMPage();
  }
  update();
  state.marketInterval = setInterval(update, 3000);
}

function updateNavMarket() {
  const nifty = marketData.NIFTY;
  const el = document.getElementById('navNifty');
  if (el) el.textContent = `NIFTY ${fmtNum(nifty.val)}`;
  const arr = document.querySelector('.mkt-arrow');
  if (arr) {
    arr.textContent = `${nifty.chg >= 0 ? '▲' : '▼'} ${Math.abs(nifty.chg).toFixed(2)}%`;
    arr.className = `mkt-arrow ${nifty.chg >= 0 ? 'up' : 'down'}`;
  }
}

// ===================== LANDING =====================
function initLandingMarket() {
  const container = document.getElementById('landingMarketCards');
  if (!container) return;
  const items = [
    { name:'NIFTY 50', key:'NIFTY' }, { name:'BSE SENSEX', key:'SENSEX' },
    { name:'BANK NIFTY', key:'BANKNIFTY' }, { name:'NIFTY MIDCAP', key:'MIDCAP' }
  ];
  container.innerHTML = items.map(i => {
    const d = marketData[i.key];
    return `<div class="mmc-card">
      <div class="mmc-name">${i.name}</div>
      <div class="mmc-val">${fmtNum(d.val)}</div>
      <div class="mmc-change ${d.chg >= 0 ? 'up' : 'down'}">${d.chg >= 0 ? '▲' : '▼'} ${Math.abs(d.chg).toFixed(2)}%</div>
    </div>`;
  }).join('');
}

// ===================== DASHBOARD =====================
function initDashboard() {
  renderBalanceCards();
  renderRecentTxns();
  renderDashMarket();
  renderSpendingDonut();
}

function renderBalanceCards() {
  const cards = [
    { label:'Total Balance', amount: accounts.reduce((s,a)=>s+a.balance,0), sub:'Across all accounts', grad:'linear-gradient(135deg,#4f46e5,#06b6d4)', icon:'fa-wallet' },
    { label:'Savings Account', amount:accounts[0].balance, sub:'****4521', grad:'linear-gradient(135deg,#8b5cf6,#6366f1)', icon:'fa-piggy-bank' },
    { label:'This Month Spent', amount:28458, sub:'vs ₹32,000 last month', grad:'linear-gradient(135deg,#06b6d4,#0891b2)', icon:'fa-arrow-trend-down' },
  ];
  const el = document.getElementById('balanceCards');
  if (!el) return;
  el.innerHTML = cards.map(c => `
    <div class="balance-card" style="background:${c.grad}">
      <i class="fa-solid ${c.icon} bc-icon"></i>
      <div class="bc-label">${c.label}</div>
      <div class="bc-amount" id="bc_${c.label.replace(/\s/g,'_')}">${fmt(c.amount)} <button class="eye-btn" onclick="toggleBalance(this,'${c.amount}')"><i class="fa-solid fa-eye"></i></button></div>
      <div class="bc-sub">${c.sub}</div>
    </div>`).join('');
}

function toggleBalance(btn, amount) {
  const amtEl = btn.parentElement;
  const icon = btn.querySelector('i');
  const shown = icon.classList.contains('fa-eye');
  icon.className = shown ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
  const txt = amtEl.childNodes[0];
  txt.textContent = shown ? '●●●●●● ' : fmt(parseFloat(amount)) + ' ';
}

function renderRecentTxns() {
  const el = document.getElementById('recentTxnList');
  if (!el) return;
  el.innerHTML = transactions.slice(0, 6).map(t => {
    const bg = catColors[t.cat] || 'rgba(79,70,229,0.1)';
    const icon = getCatIcon(t.cat);
    return `<div class="txn-item">
      <div class="txn-icon" style="background:${bg}"><i class="fa-solid ${icon}" style="color:var(--primary)"></i></div>
      <div class="txn-info"><div class="txn-name">${t.desc}</div><div class="txn-date">${t.date} • ${t.mode}</div></div>
      <div class="txn-amount ${t.type}">${t.type === 'credit' ? '+' : '-'}${fmt(Math.abs(t.amount))}</div>
    </div>`;
  }).join('');
}

function getCatIcon(cat) {
  const icons = { Income:'fa-arrow-down', Shopping:'fa-bag-shopping', Food:'fa-utensils', Bills:'fa-file-invoice', Transfer:'fa-paper-plane', Recharge:'fa-mobile-screen', Entertainment:'fa-film', Investment:'fa-chart-line', Transport:'fa-car', Health:'fa-heart-pulse' };
  return icons[cat] || 'fa-circle-dot';
}

function renderDashMarket() {
  const el = document.getElementById('dashMarketWidget');
  if (!el) return;
  const items = [
    { key:'NIFTY', name:'NIFTY 50' }, { key:'SENSEX', name:'SENSEX' }, { key:'BANKNIFTY', name:'BANK NIFTY' }
  ];
  el.innerHTML = `<h3><i class="fa-solid fa-chart-line" style="color:var(--primary)"></i> Live Markets</h3>
  ${items.map(i => {
    const d = marketData[i.key];
    return `<div class="mw-index">
      <div><div class="mw-name">${i.name}</div></div>
      <div><div class="mw-val" id="mw_val_${i.key}">${fmtNum(d.val)}</div>
      <div class="mw-chg ${d.chg >= 0 ? 'up' : 'down'}" id="mw_chg_${i.key}">${d.chg >= 0 ? '▲' : '▼'} ${Math.abs(d.chg).toFixed(2)}%</div></div>
    </div>`;
  }).join('')}
  <div class="mw-stocks" style="margin-top:16px"><h4>Trending Stocks</h4>
  ${stocksData.slice(0,5).map(s => `<div class="mw-stock"><span class="s-name">${s.ticker}</span><span class="s-val" style="color:${s.chg>=0?'var(--success)':'var(--danger)'}">${fmtNum(s.price)}</span><span style="font-size:12px;color:${s.chg>=0?'var(--success)':'var(--danger)'}">${s.chg>=0?'▲':'▼'}${Math.abs(s.chg).toFixed(2)}%</span></div>`).join('')}
  </div>
  <button class="btn-primary full" style="margin-top:16px;font-size:13px" onclick="showPage('stockmarket')"><i class="fa-solid fa-arrow-trend-up"></i> Open Stock Market</button>`;
}

function updateDashMarket() {
  Object.keys(marketData).forEach(k => {
    const vEl = document.getElementById(`mw_val_${k}`);
    const cEl = document.getElementById(`mw_chg_${k}`);
    if (vEl) vEl.textContent = fmtNum(marketData[k].val);
    if (cEl) { cEl.textContent = `${marketData[k].chg >= 0 ? '▲' : '▼'} ${Math.abs(marketData[k].chg).toFixed(2)}%`; cEl.className = `mw-chg ${marketData[k].chg >= 0 ? 'up' : 'down'}`; }
  });
}

function renderSpendingDonut() {
  const el = document.getElementById('spendingDonut');
  const leg = document.getElementById('spendingLegend');
  if (!el) return;
  const total = spendingData.reduce((s,i) => s + i.amt, 0);
  let cumulAngle = 0;
  const r = 64, cx = 80, cy = 80, sw = 22;
  let paths = '';
  spendingData.forEach(item => {
    const pct = item.amt / total;
    const angle = pct * 2 * Math.PI;
    const x1 = cx + r * Math.sin(cumulAngle);
    const y1 = cy - r * Math.cos(cumulAngle);
    cumulAngle += angle;
    const x2 = cx + r * Math.sin(cumulAngle);
    const y2 = cy - r * Math.cos(cumulAngle);
    const largeArc = pct > 0.5 ? 1 : 0;
    paths += `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${item.color}" opacity="0.85" />`;
  });
  el.innerHTML = `<svg viewBox="0 0 160 160">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="white"/>
    ${paths}
    <circle cx="${cx}" cy="${cy}" r="${r - sw}" fill="white"/>
    <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="14" font-weight="800" font-family="Sora">${fmt(total).replace('₹','')}</text>
    <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="9" fill="#64748b" font-family="DM Sans">Total Spent</text>
  </svg>`;
  if (leg) leg.innerHTML = spendingData.map(i => `<div class="sl-item"><div class="sl-left"><span class="sl-dot" style="background:${i.color}"></span>${i.cat}</div><span class="sl-amt">${fmt(i.amt)}</span></div>`).join('');
}

// ===================== ACCOUNTS =====================
function initAccounts() {
  const el = document.getElementById('accountCards');
  if (!el || el.dataset.init) return;
  el.dataset.init = '1';
  el.innerHTML = accounts.map((a, idx) => `
    <div class="acc-card" style="background:${a.grad}">
      <div class="acc-type">${a.type}</div>
      <div class="acc-name">${a.name}</div>
      <div class="acc-bal-label">Available Balance</div>
      <div class="acc-balance">${fmt(a.balance)}</div>
      <div class="acc-num">${a.acc}</div>
      <div class="acc-actions">
        <button class="acc-btn" onclick="toast('Transferring from ${a.name}...','info')"><i class="fa-solid fa-paper-plane"></i> Transfer</button>
        <button class="acc-btn" onclick="toast('Generating statement...','info')"><i class="fa-solid fa-file"></i> Statement</button>
        ${idx === 0 ? '<button class="acc-btn" onclick="toast(\'Primary account — cannot freeze\',\'warn\')"><i class=\"fa-solid fa-lock\"></i> Freeze</button>' : '<button class="acc-btn" onclick="toast(\'Account frozen temporarily!\',\'warn\')"><i class=\"fa-solid fa-lock\"></i> Freeze</button>'}
      </div>
    </div>`).join('');
}

// ===================== TRANSFER =====================
function initTransfer() {
  const el = document.getElementById('savedBeneficiaries');
  if (!el || el.dataset.init) return;
  el.dataset.init = '1';
  el.innerHTML = beneficiaries.map(b => `
    <div class="bene-item">
      <div class="bene-avatar">${b.initial}</div>
      <div class="bene-info" style="flex:1"><div class="bene-name">${b.name}</div><div class="bene-acc">${b.acc} • ${b.bank}</div></div>
      <button class="bene-send" onclick="quickSend('${b.name}')">Send</button>
    </div>`).join('');
  document.querySelectorAll('.tt').forEach(btn => {
    btn.addEventListener('click', () => { document.querySelectorAll('.tt').forEach(t => t.classList.remove('active')); btn.classList.add('active'); });
  });
}

function quickSend(name) {
  document.getElementById('beneName').value = name;
  document.getElementById('beneAcc').value = '****' + randInt(1000, 9999);
  document.getElementById('ifscCode').value = 'NEXA000' + randInt(100, 999);
  toast(`Beneficiary "${name}" loaded`, 'info');
}

function doTransfer() {
  const name = document.getElementById('beneName').value;
  const amt = document.getElementById('transferAmt').value;
  if (!name || !amt) { toast('Please fill beneficiary name and amount', 'error'); return; }
  if (parseFloat(amt) <= 0) { toast('Enter valid amount', 'error'); return; }
  const btn = document.getElementById('transferBtn');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Proceed to Transfer';
    btn.disabled = false;
    document.getElementById('transferModalMsg').textContent = `${fmt(parseFloat(amt))} transferred to ${name}`;
    document.getElementById('txnRef').textContent = randInt(1000000000, 9999999999);
    openModal('transferModal');
    accounts[0].balance -= parseFloat(amt);
    transactions.unshift({ id:'TXN_NEW', date:'Just now', desc:`Transfer to ${name}`, cat:'Transfer', mode:'NEFT', amount:-parseFloat(amt), type:'debit', balance:accounts[0].balance, status:'success' });
  }, 1500);
}

// ===================== CARDS =====================
function initCards() {
  const el = document.getElementById('cardsList');
  if (!el || el.dataset.init) return;
  el.dataset.init = '1';
  el.innerHTML = cardData.map((c, i) => `
    <div class="card-item">
      <div class="card-visual" style="background:${c.grad}">
        <div class="mc-chip"><i class="fa-solid fa-microchip"></i></div>
        <div class="mc-num">${c.num}</div>
        <div class="mc-bottom"><div><div class="mc-label">Card Holder</div><div>${c.holder}</div></div><div><div class="mc-label">Expires</div><div>${c.exp}</div></div></div>
        <div class="mc-logo"><i class="fa-brands fa-cc-${c.network}"></i></div>
        <div style="position:absolute;top:16px;right:16px;font-size:14px;opacity:0.8;background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:999px">${c.type}</div>
      </div>
      <div class="card-controls">
        <div class="cc-btn" onclick="toggleFreeze(this, ${i})"><i class="fa-solid fa-snowflake"></i><span>Freeze Card</span></div>
        <div class="cc-btn" onclick="toast('Card limit update requested','info')"><i class="fa-solid fa-sliders"></i><span>Set Limit</span></div>
        <div class="cc-btn" onclick="toast('PIN change OTP sent!','success')"><i class="fa-solid fa-key"></i><span>Change PIN</span></div>
        <div class="cc-btn" onclick="toast('International usage toggled!','success')"><i class="fa-solid fa-globe"></i><span>Intl. Use</span></div>
        <div class="cc-btn" onclick="toast('Contactless payments enabled!','success')"><i class="fa-solid fa-wifi"></i><span>Contactless</span></div>
        <div class="cc-btn" onclick="toast('Card reported! New card in 3-5 days.','warn')"><i class="fa-solid fa-circle-exclamation"></i><span>Report Card</span></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:16px;border-top:1px solid var(--border)">
        <span style="font-size:14px;color:var(--text-muted)">Daily Limit: <strong style="color:var(--text)">${c.limit}</strong></span>
        <span style="font-size:13px;background:rgba(16,185,129,0.12);color:var(--success);padding:4px 12px;border-radius:8px;font-weight:700">Active</span>
      </div>
    </div>`).join('');
}

function toggleFreeze(btn, idx) {
  cardData[idx].frozen = !cardData[idx].frozen;
  const frozen = cardData[idx].frozen;
  btn.style.background = frozen ? 'rgba(239,68,68,0.12)' : '';
  btn.querySelector('i').style.color = frozen ? 'var(--danger)' : '';
  btn.querySelector('span').textContent = frozen ? 'Unfreeze' : 'Freeze Card';
  toast(frozen ? '❄️ Card frozen successfully!' : '✅ Card unfrozen!', frozen ? 'warn' : 'success');
}

// ===================== TRANSACTIONS =====================
function initTransactions() {
  renderTxnTable(transactions);
}

function renderTxnTable(data) {
  const body = document.getElementById('txnTableBody');
  if (!body) return;
  body.innerHTML = data.map(t => {
    const catBg = catColors[t.cat] || 'rgba(79,70,229,0.1)';
    const catColor = t.cat === 'Income' ? 'var(--success)' : 'var(--primary)';
    return `<tr>
      <td>${t.date}</td>
      <td><strong>${t.desc}</strong></td>
      <td><span class="txn-cat" style="background:${catBg};color:${catColor}">${t.cat}</span></td>
      <td>${t.mode}</td>
      <td class="txn-amount ${t.type}" style="font-weight:700">${t.type === 'credit' ? '+' : '-'}${fmt(Math.abs(t.amount))}</td>
      <td>${fmt(t.balance)}</td>
      <td><span class="txn-status ${t.status}"><i class="fa-solid ${t.status === 'success' ? 'fa-check' : t.status === 'pending' ? 'fa-clock' : 'fa-xmark'}"></i>${t.status.charAt(0).toUpperCase()+t.status.slice(1)}</span></td>
    </tr>`;
  }).join('');
}

function filterTxns() {
  const search = document.getElementById('txnSearch').value.toLowerCase();
  const type = document.getElementById('txnType').value;
  let data = transactions.filter(t => {
    const matchSearch = !search || t.desc.toLowerCase().includes(search) || t.cat.toLowerCase().includes(search);
    const matchType = !type || t.type === type;
    return matchSearch && matchType;
  });
  renderTxnTable(data);
}

// ===================== INVESTMENTS =====================
function initInvestments() { renderInvTab('sip'); }

function renderInvTab(tab) {
  const el = document.getElementById('invContent');
  if (!el) return;
  if (tab === 'sip') {
    el.innerHTML = `<div class="sip-calculator">
      <div class="sip-form">
        <h3>SIP Calculator</h3>
        <div class="form-group"><label>Monthly Investment</label><input type="range" id="sipAmt" min="500" max="100000" value="5000" step="500" oninput="calcSIP()"/><div class="range-val">₹<span id="sipAmtVal">5,000</span></div></div>
        <div class="form-group"><label>Duration (Years)</label><input type="range" id="sipYears" min="1" max="30" value="10" oninput="calcSIP()"/><div class="range-val"><span id="sipYearsVal">10</span> Years</div></div>
        <div class="form-group"><label>Expected Return (%)</label><input type="range" id="sipRate" min="6" max="24" value="12" step="0.5" oninput="calcSIP()"/><div class="range-val"><span id="sipRateVal">12</span>%</div></div>
      </div>
      <div class="sip-result">
        <h3>Expected Returns</h3>
        <div class="sip-result-card" id="sipResultCard"></div>
        <button class="btn-primary full" style="margin-top:20px" onclick="toast('SIP started! ₹5,000/month auto-debit set.','success')"><i class="fa-solid fa-chart-line"></i> Start SIP Now</button>
      </div>
    </div>`;
    calcSIP();
  } else if (tab === 'fd') {
    el.innerHTML = `<div class="fd-grid">${[
      { tenure:'6 Months', rate:'6.5%', minAmt:'₹10,000', penalty:'1%' },
      { tenure:'1 Year', rate:'7.0%', minAmt:'₹10,000', penalty:'1%' },
      { tenure:'2 Years', rate:'7.5%', minAmt:'₹25,000', penalty:'1.5%' },
      { tenure:'3 Years', rate:'8.0%', minAmt:'₹25,000', penalty:'2%' },
      { tenure:'5 Years', rate:'8.5%', minAmt:'₹50,000', penalty:'2%' },
      { tenure:'10 Years', rate:'8.5%', minAmt:'₹1,00,000', penalty:'2%' },
    ].map(f => `<div class="fd-card">
      <div class="fd-rate">${f.rate}</div>
      <div class="fd-label">per annum — ${f.tenure}</div>
      <div class="fd-details">
        <div class="fd-det-row"><span>Min. Amount</span><span>${f.minAmt}</span></div>
        <div class="fd-det-row"><span>Tenure</span><span>${f.tenure}</span></div>
        <div class="fd-det-row"><span>Pre-closure</span><span>${f.penalty}</span></div>
        <div class="fd-det-row"><span>Interest Payout</span><span>Monthly</span></div>
      </div>
      <button class="btn-primary full" onclick="toast('FD booking initiated!','success')"><i class="fa-solid fa-lock"></i> Book FD</button>
    </div>`).join('')}</div>`;
  } else if (tab === 'mf') {
    el.innerHTML = `<div class="mf-grid">${[
      { name:'Axis Bluechip Fund', cat:'Large Cap', ret:'18.4%', risk:'Low' },
      { name:'Mirae Asset Emerging Bluechip', cat:'Large & Mid Cap', ret:'24.2%', risk:'Moderate' },
      { name:'Parag Parikh Flexi Cap', cat:'Flexi Cap', ret:'21.8%', risk:'Moderate' },
      { name:'Nippon India Small Cap', cat:'Small Cap', ret:'38.6%', risk:'High' },
      { name:'HDFC Index Fund Nifty 50', cat:'Index Fund', ret:'16.9%', risk:'Low' },
      { name:'SBI Contra Fund', cat:'Contra', ret:'29.4%', risk:'Moderate' },
    ].map(f => `<div class="mf-card">
      <div class="mf-name">${f.name}</div>
      <div class="mf-cat">${f.cat} • Risk: <strong>${f.risk}</strong></div>
      <div class="mf-return"><div class="mf-val">+${f.ret}</div><div class="mf-period">3Y CAGR</div></div>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn-primary" style="font-size:13px;padding:10px 16px" onclick="toast('SIP started in ${f.name}!','success')"><i class="fa-solid fa-chart-line"></i> SIP</button>
        <button class="btn-outline" style="font-size:13px;padding:10px 16px" onclick="toast('Lumpsum invested in ${f.name}!','success')">Lumpsum</button>
      </div>
    </div>`).join('')}</div>`;
  }
}

function switchInvTab(el, tab) {
  document.querySelectorAll('.inv-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderInvTab(tab);
}

function calcSIP() {
  const amt = parseFloat(document.getElementById('sipAmt').value);
  const years = parseFloat(document.getElementById('sipYears').value);
  const rate = parseFloat(document.getElementById('sipRate').value);
  document.getElementById('sipAmtVal').textContent = Math.round(amt).toLocaleString('en-IN');
  document.getElementById('sipYearsVal').textContent = years;
  document.getElementById('sipRateVal').textContent = rate;
  const n = years * 12;
  const r = rate / 12 / 100;
  const fv = amt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = amt * n;
  const gains = fv - invested;
  const el = document.getElementById('sipResultCard');
  if (el) el.innerHTML = `
    <h4>Maturity Amount</h4>
    <div class="sip-total">${fmt(fv)}</div>
    <div class="sip-breakdown">
      <div class="sip-breakdown-item"><div class="label">Amount Invested</div><div class="value">${fmt(invested)}</div></div>
      <div class="sip-breakdown-item"><div class="label">Estimated Gains</div><div class="value">${fmt(gains)}</div></div>
    </div>`;
}

// ===================== LOANS =====================
function initLoans() { calcEMI(); }

function showLoanEMI(type, rate) {
  document.getElementById('loanTypeLabel').textContent = type;
  const r = parseFloat(rate.replace('%',''));
  document.getElementById('loanRate').value = r;
  document.getElementById('loanRateVal').textContent = r;
  calcEMI();
  document.getElementById('emiCalculator').scrollIntoView({ behavior:'smooth', block:'center' });
}

function calcEMI() {
  const P = parseFloat(document.getElementById('loanAmt').value);
  const years = parseFloat(document.getElementById('loanTenure').value);
  const rAnnual = parseFloat(document.getElementById('loanRate').value);
  document.getElementById('loanAmtVal').textContent = Math.round(P).toLocaleString('en-IN');
  document.getElementById('loanTenureVal').textContent = years;
  document.getElementById('loanRateVal').textContent = rAnnual;
  const r = rAnnual / 12 / 100;
  const n = years * 12;
  const emi = P * r * Math.pow(1+r,n) / (Math.pow(1+r,n) - 1);
  const totalAmt = emi * n;
  const totalInt = totalAmt - P;
  const el = document.getElementById('emiResult');
  if (el) el.innerHTML = `
    <div class="er-item"><h4>Monthly EMI</h4><div class="er-val">${fmt(emi)}</div></div>
    <div class="er-item"><h4>Total Amount</h4><div class="er-val">${fmt(totalAmt)}</div></div>
    <div class="er-item"><h4>Total Interest</h4><div class="er-val">${fmt(totalInt)}</div></div>
    <div class="er-item"><h4>Principal</h4><div class="er-val">${fmt(P)}</div></div>
    <div class="er-item" style="grid-column:1/-1;margin-top:16px;display:flex;justify-content:center">
      <button class="btn-outline full" onclick="toast('Loan application submitted! ID: LOAN${randInt(100000,999999)}','success')" style="max-width:300px;border-color:rgba(255,255,255,0.5);color:white;background:rgba(255,255,255,0.15)" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'"><i class="fa-solid fa-paper-plane"></i> Apply for Loan</button>
    </div>`;
}

// ===================== ANALYTICS =====================
function initAnalytics() {
  const el = document.getElementById('analyticsGrid');
  if (!el || el.dataset.init) return;
  el.dataset.init = '1';
  const months = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
  const incomes = [65000,72000,68000,85000,92000,88000,97000];
  const expenses = [42000,38000,45000,52000,48000,55000,48000];
  el.innerHTML = `
    <div class="analytics-card">
      <h3>Income vs Expenses (Last 7 Months)</h3>
      <div style="display:flex;gap:16px;margin-bottom:16px;font-size:13px">
        <span style="display:flex;align-items:center;gap:6px"><span style="width:12px;height:12px;border-radius:4px;background:var(--primary);display:inline-block"></span>Income</span>
        <span style="display:flex;align-items:center;gap:6px"><span style="width:12px;height:12px;border-radius:4px;background:var(--secondary);display:inline-block"></span>Expenses</span>
      </div>
      <div style="display:flex;gap:12px;align-items:flex-end;height:200px">
        ${months.map((m,i) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end">
          <div style="width:100%;display:flex;gap:3px;align-items:flex-end">
            <div style="flex:1;border-radius:6px 6px 0 0;background:var(--grad1);height:${(incomes[i]/100000)*180}px;transition:all 0.5s"></div>
            <div style="flex:1;border-radius:6px 6px 0 0;background:var(--grad3);height:${(expenses[i]/100000)*180}px;transition:all 0.5s"></div>
          </div>
          <div style="font-size:11px;font-weight:600;color:var(--text-muted)">${m}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="analytics-card">
      <h3>Spending Categories</h3>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:8px">
        ${spendingData.map(s => `<div>
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;font-weight:600"><span>${s.cat}</span><span>${fmt(s.amt)}</span></div>
          <div style="background:var(--bg);border-radius:8px;height:8px;overflow:hidden">
            <div style="height:100%;background:${s.color};border-radius:8px;width:${(s.amt/12350*100).toFixed(0)}%;transition:width 1s"></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="analytics-card">
      <h3>Financial Health Score</h3>
      <div style="text-align:center;padding:20px">
        <div style="position:relative;display:inline-flex;align-items:center;justify-content:center;width:160px;height:160px">
          <svg width="160" height="160" style="transform:rotate(-90deg)">
            <circle cx="80" cy="80" r="70" fill="none" stroke="var(--bg)" stroke-width="16"/>
            <circle cx="80" cy="80" r="70" fill="none" stroke="url(#g1)" stroke-width="16" stroke-dasharray="${Math.PI*2*70}" stroke-dashoffset="${Math.PI*2*70 * (1 - 0.78)}" stroke-linecap="round"/>
            <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#4f46e5"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs>
          </svg>
          <div style="position:absolute;text-align:center"><div style="font-family:Sora;font-size:32px;font-weight:800;color:var(--text)">78</div><div style="font-size:12px;color:var(--text-muted)">out of 100</div></div>
        </div>
        <div style="margin-top:20px;font-size:18px;font-weight:700;color:var(--primary)">Good Financial Health!</div>
        <p style="color:var(--text-muted);font-size:14px;margin-top:8px">Improve savings rate to reach Excellent status</p>
      </div>
    </div>
    <div class="analytics-card">
      <h3>Key Insights</h3>
      <div class="insight-cards">
        <div class="insight-card"><div class="ic-val">32%</div><div class="ic-label">Savings Rate</div></div>
        <div class="insight-card"><div class="ic-val">₹28,458</div><div class="ic-label">Avg Monthly Spend</div></div>
        <div class="insight-card"><div class="ic-val">3.4x</div><div class="ic-label">Emergency Fund</div></div>
        <div class="insight-card"><div class="ic-val">₹6,250</div><div class="ic-label">Monthly Investments</div></div>
      </div>
    </div>`;
}

// ===================== SUPPORT =====================
function initSupport() {
  const el = document.getElementById('faqList');
  if (!el || el.dataset.init) return;
  el.dataset.init = '1';
  el.innerHTML = faqs.map((f, i) => `
    <div class="faq-item">
      <div class="faq-question" onclick="toggleFAQ(this, ${i})">
        <span>${f.q}</span>
        <i class="fa-solid fa-plus faq-icon" id="faqIcon${i}"></i>
      </div>
      <div class="faq-answer" id="faqAns${i}">${f.a}</div>
    </div>`).join('');
}

function toggleFAQ(el, i) {
  const ans = document.getElementById(`faqAns${i}`);
  const icon = document.getElementById(`faqIcon${i}`);
  ans.classList.toggle('open');
  icon.classList.toggle('open');
}

// ===================== PAYMENTS =====================
function selectPlan(el, price) {
  document.querySelectorAll('.rp-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
  toast(`Plan ${price} selected!`, 'info');
}

function generateQR() {
  const amt = document.getElementById('qrAmount').value;
  if (!amt) { toast('Enter amount first', 'error'); return; }
  const box = document.getElementById('qrBox');
  box.innerHTML = `<div style="background:white;padding:16px;border-radius:12px">
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;width:140px;height:140px">
      ${Array.from({length:49},(_,i)=>`<div style="background:${Math.random()<0.5?'#1e293b':'transparent'};border-radius:2px"></div>`).join('')}
    </div>
    <div style="text-align:center;font-size:13px;font-weight:700;margin-top:8px;color:var(--primary)">₹${parseFloat(amt).toLocaleString('en-IN')}</div>
  </div>`;
  toast(`QR generated for ₹${parseFloat(amt).toLocaleString('en-IN')}`, 'success');
}

// ===================== STOCK MARKET PAGE =====================
function initStockMarket() {
  updateMarketTime();
  setInterval(updateMarketTime, 1000);
  renderIndexBanner();
  renderSMTab('overview');
  setInterval(() => { if (state.currentPage === 'stockmarket') { renderIndexBanner(); } }, 3000);
}

function updateMarketTime() {
  const el = document.getElementById('marketTime');
  if (el) el.textContent = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' }) + ' IST';
}

function renderIndexBanner() {
  const el = document.getElementById('indexBanner');
  if (!el) return;
  const items = [
    { name:'NIFTY 50', key:'NIFTY' }, { name:'BSE SENSEX', key:'SENSEX' },
    { name:'BANK NIFTY', key:'BANKNIFTY' }, { name:'NIFTY MIDCAP', key:'MIDCAP' }
  ];
  el.innerHTML = items.map(item => {
    const d = marketData[item.key];
    const up = d.chg >= 0;
    const points = (d.val * Math.abs(d.chg) / 100).toFixed(2);
    return `<div class="ib-card">
      <div class="ib-left">
        <div class="ib-name">${item.name}</div>
        <div class="ib-val">${fmtNum(d.val)}</div>
      </div>
      <div class="ib-right">
        <div class="ib-chg ${up ? 'up' : 'down'}">${up ? '▲' : '▼'} ${Math.abs(d.chg).toFixed(2)}%</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${up ? '+' : '-'}${points} pts</div>
        <div class="ib-sparkline">${renderSparklineSVG(d.chg >= 0)}</div>
      </div>
    </div>`;
  }).join('');
}

function renderSparklineSVG(up) {
  const pts = Array.from({length:20}, () => rand(20, 70));
  const w = 80; const h = 40;
  const max = Math.max(...pts); const min = Math.min(...pts);
  const normalize = v => h - ((v - min) / (max - min)) * (h - 8) - 4;
  const path = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i/(pts.length-1))*w} ${normalize(v)}`).join(' ');
  const color = up ? '#10b981' : '#ef4444';
  return `<svg viewBox="0 0 80 40" preserveAspectRatio="none" style="width:80px;height:40px">
    <path d="${path}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

function updateSMPage() {
  renderIndexBanner();
  if (state.stockMarketTab === 'overview') renderSMOverview();
}

function switchSMTab(el, tab) {
  document.querySelectorAll('.sm-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  state.stockMarketTab = tab;
  renderSMTab(tab);
}

function renderSMTab(tab) {
  const el = document.getElementById('smContent');
  if (!el) return;
  if (tab === 'overview') renderSMOverview();
  else if (tab === 'indices') renderSMIndices();
  else if (tab === 'gainers') renderSMGainersLosers('gainers');
  else if (tab === 'losers') renderSMGainersLosers('losers');
  else if (tab === 'watchlist') renderWatchlist();
  else if (tab === 'portfolio') renderPortfolio();
}

function renderSMOverview() {
  const el = document.getElementById('smContent');
  if (!el) return;
  const topStocks = [...stocksData].sort((a,b) => Math.abs(b.chg) - Math.abs(a.chg)).slice(0, 10);
  const gainers = [...stocksData].filter(s => s.chg > 0).sort((a,b) => b.chg - a.chg).slice(0,5);
  const losers = [...stocksData].filter(s => s.chg < 0).sort((a,b) => a.chg - b.chg).slice(0,5);
  el.innerHTML = `<div class="sm-overview">
    <div class="smo-card">
      <h3><i class="fa-solid fa-fire" style="color:#ef4444"></i> Most Active</h3>
      <table class="stocks-table">
        <thead><tr><th>Stock</th><th>Price</th><th>Change</th><th>Volume</th><th></th></tr></thead>
        <tbody>${topStocks.map(s => stockRow(s)).join('')}</tbody>
      </table>
    </div>
    <div class="smo-card">
      <h3><i class="fa-solid fa-th" style="color:var(--primary)"></i> Market Heatmap</h3>
      <div class="market-heatmap" id="smHeatmap">
        ${stocksData.slice(0,15).map(s => {
          const intensity = Math.min(Math.abs(s.chg) / 3, 1);
          const bg = s.chg >= 0 ? `rgba(16,185,129,${0.3 + intensity * 0.6})` : `rgba(239,68,68,${0.3 + intensity * 0.6})`;
          return `<div class="hm-cell" style="background:${bg}" title="${s.name}">
            <div class="hm-ticker">${s.ticker}</div>
            <div class="hm-pct">${s.chg >= 0 ? '+' : ''}${s.chg.toFixed(2)}%</div>
          </div>`;
        }).join('')}
      </div>
    </div>
    <div class="smo-card">
      <h3><i class="fa-solid fa-arrow-trend-up" style="color:var(--success)"></i> Top Gainers</h3>
      <table class="stocks-table">
        <thead><tr><th>Stock</th><th>Price</th><th>Change</th></tr></thead>
        <tbody>${gainers.map(s => stockRow(s, true)).join('')}</tbody>
      </table>
    </div>
    <div class="smo-card">
      <h3><i class="fa-solid fa-arrow-trend-down" style="color:var(--danger)"></i> Top Losers</h3>
      <table class="stocks-table">
        <thead><tr><th>Stock</th><th>Price</th><th>Change</th></tr></thead>
        <tbody>${losers.map(s => stockRow(s, true)).join('')}</tbody>
      </table>
    </div>
    <div class="smo-card" style="grid-column:1/-1">
      <h3><i class="fa-solid fa-globe" style="color:var(--secondary)"></i> Global Markets</h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        ${globalIndices.map(g => `<div style="background:var(--bg);border-radius:14px;padding:16px;display:flex;justify-content:space-between;align-items:center">
          <div><div style="font-weight:700;font-size:14px">${g.name}</div><div style="font-size:20px;font-weight:800;margin-top:4px">${fmtNum(g.val)}</div></div>
          <div style="text-align:right"><div style="font-size:14px;font-weight:700;color:${g.chg>=0?'var(--success)':'var(--danger)'}">${g.chg>=0?'▲':'▼'} ${Math.abs(g.chg).toFixed(2)}%</div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function stockRow(s, simple = false) {
  const watched = state.watchlist.includes(s.ticker);
  const vol = (randInt(100,9999)/100).toFixed(2) + 'M';
  if (simple) {
    return `<tr>
      <td><div class="stock-name">${s.ticker}</div><div class="stock-sector">${s.sector}</div></td>
      <td class="stock-price">${fmtNum(s.price)}</td>
      <td class="stock-change ${s.chg>=0?'up':'down'}">${s.chg>=0?'▲':'▼'} ${Math.abs(s.chg).toFixed(2)}%</td>
    </tr>`;
  }
  return `<tr>
    <td><div class="stock-name">${s.ticker}</div><div class="stock-sector">${s.sector}</div></td>
    <td class="stock-price">₹${fmtNum(s.price)}</td>
    <td class="stock-change ${s.chg>=0?'up':'down'}">${s.chg>=0?'+':''}${s.chg.toFixed(2)}%</td>
    <td style="font-size:12px;color:var(--text-muted)">${vol}</td>
    <td><button class="add-watch-btn ${watched?'added':''}" onclick="toggleWatch('${s.ticker}',this)">${watched?'✓ Watching':'+ Watch'}</button></td>
  </tr>`;
}

function renderSMIndices() {
  const el = document.getElementById('smContent');
  if (!el) return;
  const allIndices = [
    ...Object.entries(marketData).map(([k,v]) => ({ name: k, val: v.val, chg: v.chg })),
    ...globalIndices
  ];
  el.innerHTML = `<div class="indices-full-grid">
    ${allIndices.map(idx => `<div class="indices-card">
      <div class="ic-header">
        <div class="ic-name">${idx.name}</div>
        <div class="ib-chg ${idx.chg>=0?'up':'down'}" style="font-size:14px;font-weight:700;color:${idx.chg>=0?'var(--success)':'var(--danger)'}">${idx.chg>=0?'▲':'▼'} ${Math.abs(idx.chg).toFixed(2)}%</div>
      </div>
      <div class="ic-val">${fmtNum(idx.val)}</div>
      <div class="mini-graph">${renderSparklineSVG(idx.chg>=0)}</div>
    </div>`).join('')}
  </div>`;
}

function renderSMGainersLosers(type) {
  const el = document.getElementById('smContent');
  if (!el) return;
  const sorted = [...stocksData].sort((a,b) => type==='gainers' ? b.chg - a.chg : a.chg - b.chg);
  el.innerHTML = `<div class="watchlist-table-wrap">
    <table class="stocks-table" style="width:100%">
      <thead><tr><th>Stock</th><th>Sector</th><th>LTP (₹)</th><th>Change %</th><th>Mkt Cap</th><th>Watch</th></tr></thead>
      <tbody>${sorted.map(s => `<tr>
        <td><div class="stock-name">${s.ticker}</div><div style="font-size:11px;color:var(--text-muted)">${s.name}</div></td>
        <td style="font-size:13px">${s.sector}</td>
        <td class="stock-price">₹${fmtNum(s.price)}</td>
        <td class="stock-change ${s.chg>=0?'up':'down'}" style="font-size:15px;font-weight:800">${s.chg>=0?'▲':'▼'} ${Math.abs(s.chg).toFixed(2)}%</td>
        <td style="font-size:13px;color:var(--text-muted)">${s.mktCap}</td>
        <td><button class="add-watch-btn ${state.watchlist.includes(s.ticker)?'added':''}" onclick="toggleWatch('${s.ticker}',this)">${state.watchlist.includes(s.ticker)?'✓ Watching':'+ Watch'}</button></td>
      </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function toggleWatch(ticker, btn) {
  const idx = state.watchlist.indexOf(ticker);
  if (idx === -1) {
    state.watchlist.push(ticker);
    btn.textContent = '✓ Watching';
    btn.classList.add('added');
    toast(`${ticker} added to watchlist!`, 'success');
  } else {
    state.watchlist.splice(idx, 1);
    btn.textContent = '+ Watch';
    btn.classList.remove('added');
    toast(`${ticker} removed from watchlist`, 'info');
  }
}

function renderWatchlist() {
  const el = document.getElementById('smContent');
  if (!el) return;
  if (state.watchlist.length === 0) {
    el.innerHTML = `<div style="text-align:center;padding:80px 20px;background:white;border-radius:20px;border:1px solid var(--border)">
      <i class="fa-solid fa-star" style="font-size:56px;color:var(--border);margin-bottom:20px;display:block"></i>
      <h3 style="font-family:Sora;font-size:20px;margin-bottom:10px">Your Watchlist is Empty</h3>
      <p style="color:var(--text-muted);margin-bottom:24px">Add stocks from the Top Gainers, Losers, or Overview tab to track them here.</p>
      <button class="btn-primary" onclick="switchSMTab(document.querySelector('.sm-tab'),'overview')">Browse Stocks</button>
    </div>`; return;
  }
  const watched = stocksData.filter(s => state.watchlist.includes(s.ticker));
  el.innerHTML = `<div class="watchlist-table-wrap">
    <table class="stocks-table" style="width:100%">
      <thead><tr><th>Stock</th><th>LTP (₹)</th><th>Change</th><th>Mkt Cap</th><th>Action</th></tr></thead>
      <tbody>${watched.map(s => `<tr>
        <td><div class="stock-name">${s.ticker}</div><div class="stock-sector">${s.name}</div></td>
        <td class="stock-price">₹${fmtNum(s.price)}</td>
        <td class="stock-change ${s.chg>=0?'up':'down'}">${s.chg>=0?'▲':'▼'} ${Math.abs(s.chg).toFixed(2)}%</td>
        <td style="font-size:13px;color:var(--text-muted)">${s.mktCap}</td>
        <td style="display:flex;gap:8px">
          <button class="btn-sm" onclick="toast('Buy order for ${s.ticker} placed!','success')">Buy</button>
          <button class="btn-sm outline" onclick="toggleWatch('${s.ticker}',this)">Remove</button>
        </td>
      </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderPortfolio() {
  const el = document.getElementById('smContent');
  if (!el) return;
  let totalInvested = 0, currentVal = 0;
  portfolioHoldings.forEach(h => { totalInvested += h.qty * h.buyPrice; currentVal += h.qty * h.ltp; });
  const pnl = currentVal - totalInvested;
  const pnlPct = (pnl / totalInvested * 100).toFixed(2);
  el.innerHTML = `
    <div class="portfolio-summary">
      <div class="ps-card"><h4>Current Value</h4><div class="ps-val">${fmt(currentVal)}</div></div>
      <div class="ps-card alt"><h4>Total P&L</h4><div class="ps-val">${pnl>=0?'+':''}${fmt(pnl)} (${pnlPct}%)</div></div>
      <div class="ps-card alt2"><h4>Invested</h4><div class="ps-val">${fmt(totalInvested)}</div></div>
    </div>
    <div class="watchlist-table-wrap">
      <table class="stocks-table" style="width:100%">
        <thead><tr><th>Stock</th><th>Qty</th><th>Avg Buy Price</th><th>LTP</th><th>Current Value</th><th>P&L</th><th>Action</th></tr></thead>
        <tbody>${portfolioHoldings.map(h => {
          const cv = h.qty * h.ltp;
          const pl = cv - (h.qty * h.buyPrice);
          const plPct = (pl / (h.qty * h.buyPrice) * 100).toFixed(2);
          return `<tr>
            <td><div class="stock-name">${h.ticker}</div></td>
            <td>${h.qty}</td>
            <td>₹${fmtNum(h.buyPrice)}</td>
            <td class="stock-price">₹${fmtNum(h.ltp)}</td>
            <td style="font-weight:600">₹${fmtNum(cv)}</td>
            <td class="stock-change ${pl>=0?'up':'down'}">${pl>=0?'+':''}₹${fmtNum(Math.abs(pl))} (${plPct}%)</td>
            <td><button class="btn-sm" onclick="toast('${h.ticker} sold at ₹${fmtNum(h.ltp)}!','success')">Sell</button></td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>
    </div>
    <div style="text-align:center;margin-top:24px">
      <button class="btn-primary" onclick="toast('Adding new stock to portfolio...','info')"><i class="fa-solid fa-plus"></i> Add Stock to Portfolio</button>
    </div>`;
}

// ===================== NOTIFICATIONS =====================
function initNotifications() {
  const list = document.getElementById('notifList');
  if (!list) return;
  list.innerHTML = notifications.map(n => `
    <div class="notif-item">
      <div class="notif-icon" style="background:${n.color}"><i class="fa-solid ${n.icon}" style="color:${n.iconColor}"></i></div>
      <div class="notif-text"><b>${n.title}</b><span>${n.time}</span></div>
    </div>`).join('');
}

// ===================== SETTINGS =====================
function toggleSetting(el) {
  el.classList.toggle('on');
}

// ===================== EVENT LISTENERS =====================
document.addEventListener('DOMContentLoaded', () => {
  // Check for existing session
  const savedSession = localStorage.getItem('nexabank_session');
  if (savedSession) {
    try {
      state.user = JSON.parse(savedSession);
      state.loggedIn = true;
    } catch(e) {}
  }

  // Initial page
  showPage('landing');

  // Start market data
  startMarketUpdates();

  // Init notifications
  initNotifications();

  // Hamburger
  document.getElementById('hamburgerBtn').addEventListener('click', toggleSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

  // Sidebar nav
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(item.dataset.page);
    });
  });

  // Profile dropdown
  document.getElementById('profileBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('profileDropdown').classList.toggle('open');
    document.getElementById('notifPanel').classList.remove('open');
  });

  // Notification panel
  document.getElementById('notifBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('notifPanel').classList.toggle('open');
    document.getElementById('profileDropdown').classList.remove('open');
  });

  document.getElementById('clearNotif').addEventListener('click', () => {
    document.getElementById('notifList').innerHTML = '<div style="padding:32px;text-align:center;color:var(--text-muted)">No new notifications</div>';
    document.getElementById('notifBadge').style.display = 'none';
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    document.getElementById('profileDropdown').classList.remove('open');
    document.getElementById('notifPanel').classList.remove('open');
  });

  document.getElementById('profileDropdown').addEventListener('click', e => e.stopPropagation());
  document.getElementById('notifPanel').addEventListener('click', e => e.stopPropagation());

  // Profile dropdown items
  document.querySelectorAll('.pd-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(item.dataset.page);
      document.getElementById('profileDropdown').classList.remove('open');
    });
  });

  // Sign out
  document.getElementById('signoutBtn').addEventListener('click', () => {
    document.getElementById('profileDropdown').classList.remove('open');
    openModal('logoutModal');
  });
  document.getElementById('signoutBtn').addEventListener('click', () => openModal('logoutModal'));

  // Login button
  document.getElementById('loginBtn').addEventListener('click', login);

  // PIN input auto-advance
  document.querySelectorAll('.pin-digit').forEach((input, i, all) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1 && i < all.length - 1) all[i + 1].focus();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && i > 0) all[i - 1].focus();
    });
  });

  // Enter key for login
  document.getElementById('loginUser').addEventListener('keydown', e => { if (e.key === 'Enter') document.querySelectorAll('.pin-digit')[0].focus(); });

  // Transfer button
  document.getElementById('transferBtn').addEventListener('click', doTransfer);

  // Session modal buttons
  document.getElementById('extendSession').addEventListener('click', () => { resetSession(); closeModal('sessionModal'); toast('Session extended by 30 minutes', 'success'); });
  document.getElementById('logoutNow').addEventListener('click', () => { closeModal('sessionModal'); logout(); });
  document.getElementById('confirmLogout').addEventListener('click', logout);

  // Logo click → landing
  document.querySelector('.logo').addEventListener('click', () => showPage(state.loggedIn ? 'dashboard' : 'landing'));

  // Operator selection
  document.querySelectorAll('.op-item').forEach(op => {
    op.addEventListener('click', () => { document.querySelectorAll('.op-item').forEach(o => o.classList.remove('active')); op.classList.add('active'); });
  });

  // Transfer tabs
  document.querySelectorAll('.tt').forEach(btn => {
    btn.addEventListener('click', () => { document.querySelectorAll('.tt').forEach(t => t.classList.remove('active')); btn.classList.add('active'); });
  });
});