const friends = {};
const friendsList = document.getElementById('friendsList');
const totalBalance = document.getElementById('totalBalance');

document.getElementById('expenseForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('friendName').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const paidBy = document.getElementById('paidBy').value;

  if (!name || isNaN(amount)) return;

  const splitAmount = amount / 2;
  if (!friends[name]) friends[name] = 0;

  if (paidBy === 'you') {
    friends[name] -= splitAmount;
  } else {
    friends[name] += splitAmount;
  }

  updateUI();
  this.reset();
});

function updateUI() {
  friendsList.innerHTML = '';
  let total = 0;

  for (const [name, balance] of Object.entries(friends)) {
    const li = document.createElement('li');
    li.textContent = `${name}: ${balance < 0 ? 'You owe ₹' + Math.abs(balance) : 'You are owed ₹' + balance}`;
    friendsList.appendChild(li);
    total += balance;
  }

  totalBalance.textContent = total < 0 ? `You owe ₹${Math.abs(total)}` : `You are owed ₹${total}`;
}