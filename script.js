// DOM Elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addEntryButton = document.getElementById('add-entry');
const resetButton = document.getElementById('reset-fields');
const entriesList = document.getElementById('entries');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const netBalanceEl = document.getElementById('net-balance');
const filterRadios = document.getElementsByName('filter');

// Variables
let entries = [];

// Functions
function updateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;

  entries.forEach(entry => {
    if (entry.type === 'income') {
      totalIncome += entry.amount;
    } else {
      totalExpense += entry.amount;
    }
  });

  totalIncomeEl.textContent = totalIncome;
  totalExpenseEl.textContent = totalExpense;
  netBalanceEl.textContent = totalIncome - totalExpense;
}

function renderEntries(filter = 'all') {
  entriesList.innerHTML = '';

  const filteredEntries = filter === 'all'
    ? entries
    : entries.filter(entry => entry.type === filter);

  filteredEntries.forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${entry.description} - $${entry.amount} (${entry.type})
      <button onclick="editEntry(${index})">Edit</button>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;
    entriesList.appendChild(li);
  });
}

function addEntry() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if (!description || isNaN(amount)) {
    alert('Please fill in both fields correctly.');
    return;
  }

  entries.push({ description, amount, type });
  descriptionInput.value = '';
  amountInput.value = '';

  renderEntries();
  updateSummary();
}

function editEntry(index) {
  const entry = entries[index];
  descriptionInput.value = entry.description;
  amountInput.value = entry.amount;
  typeSelect.value = entry.type;

  deleteEntry(index);
}

function deleteEntry(index) {
  entries.splice(index, 1);
  renderEntries();
  updateSummary();
}

function resetFields() {
  descriptionInput.value = '';
  amountInput.value = '';
}

function applyFilter() {
  const filter = [...filterRadios].find(radio => radio.checked).value;
  renderEntries(filter);
}

// Event Listeners
addEntryButton.addEventListener('click', addEntry);
resetButton.addEventListener('click', resetFields);
filterRadios.forEach(radio => radio.addEventListener('change', applyFilter));

// Initialize
renderEntries();
updateSummary();
