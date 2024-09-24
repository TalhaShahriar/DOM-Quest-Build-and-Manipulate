let accountBalance = 5500;

function updateAccountBalance() {
  document.getElementById('balanceAmount').textContent = `${accountBalance} BDT`;
}

function addToHistory(donationName, amount) {
  const historyList = document.getElementById('historyList');
  const card = document.createElement('div');
  card.className = 'card bg-base-100 shadow-xl';
  card.innerHTML = `
    <div class="card-body">
      <h3 class="card-title">${donationName}</h3>
      <p>${new Date().toLocaleString()}</p>
      <p>Amount: ${amount} BDT</p>
    </div>
  `;
  historyList.prepend(card);
}

function toggleSection(showSection, hideSection, activeBtn, inactiveBtn) {
  showSection.classList.remove('hidden');
  hideSection.classList.add('hidden');
  activeBtn.classList.remove('btn-outline');
  activeBtn.classList.add('btn-custom');
  inactiveBtn.classList.add('btn-outline');
  inactiveBtn.classList.remove('btn-custom');
}

function donate(card) {
  const amountInput = card.querySelector('input');
  const amount = parseInt(amountInput.value);

  if (isNaN(amount) || amount <= 0 || amount > accountBalance) {
    alert(amount > accountBalance ? 'Insufficient balance for this donation.' : 'Please enter a valid donation amount.');
    return;
  }

  accountBalance -= amount;
  updateAccountBalance();

  const title = card.querySelector('.card-title').textContent;
  addToHistory(title, amount);

  const currentDonation = card.querySelector('.card-body span');
  const currentAmount = parseInt(currentDonation.textContent.split(' ')[0]);
  currentDonation.textContent = `${currentAmount + amount} BDT`;

  amountInput.value = '';
  document.getElementById('successModal').classList.add('modal-open');
}

document.addEventListener('DOMContentLoaded', () => {
  const donationBtn = document.getElementById('donationBtn');
  const historyBtn = document.getElementById('historyBtn');
  const donationSection = document.getElementById('donationSection');
  const historySection = document.getElementById('historySection');

  donationBtn.addEventListener('click', () => toggleSection(donationSection, historySection, donationBtn, historyBtn));
  historyBtn.addEventListener('click', () => toggleSection(historySection, donationSection, historyBtn, donationBtn));

  document.querySelectorAll('.card-actions .btn').forEach(button => {
    button.addEventListener('click', () => donate(button.closest('.card')));
  });

  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('successModal').classList.remove('modal-open');
  });
});

updateAccountBalance();
