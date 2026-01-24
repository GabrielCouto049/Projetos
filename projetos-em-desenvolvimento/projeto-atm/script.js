const formularySection = document.getElementById('formulary');
const newAccountSection = document.getElementById('newAccount');
const actionSection = document.getElementById('action');
const withdrawSection = document.getElementById('withdraw');
const depositSection = document.getElementById('deposit');
const balanceSection = document.getElementById('balance');
const transferSection = document.getElementById('transfer');

let currentUser = null;

const successSections = document.querySelectorAll('.successPage');
const successWithdraw = successSections[0];
const successDeposit = successSections[1];
const successTransfer = successSections[2];

document.getElementById('login').addEventListener('click', () => {
    const holder = document.getElementById('holder').value;
    const password = document.getElementById('password').value;

    const user = users.find(
        u => u.usrName === holder && u.password === password
    );

    if (user) {
        currentUser = user;
        formularySection.classList.remove('active');
        actionSection.classList.add('active');
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.');
    }
});

document.getElementById('goToNewAccount').addEventListener('click', () => {
    formularySection.classList.remove('active');
    newAccountSection.classList.add('active');
});
document.getElementById('goToWithdraw').addEventListener('click', () => {
  actionSection.classList.remove('active');
  withdrawSection.classList.add('active');
});
document.getElementById('goToDeposit').addEventListener('click', () => {
  actionSection.classList.remove('active');
  depositSection.classList.add('active');
});

document.getElementById('goToBalance').addEventListener('click', () => {
    if (!currentUser) return;

    actionSection.classList.remove('active');
    balanceSection.classList.add('active');

    const balanceDisplay = document.getElementById('balanceDisplay');
    balanceDisplay.textContent = `${currentUser.balance.toFixed(2)} R$`;
});

document.getElementById('goToTransfer').addEventListener('click', () => {
  actionSection.classList.remove('active');
  transferSection.classList.add('active');
});

let users = [];
document.getElementById('createAccount').addEventListener('click', () => {
    const usrName = document.getElementById('usrName').value;
    const age = Number(document.getElementById('age').value);
    const password = document.getElementById('newPassword').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    if (!usrName || !age || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    } else if (password !== repeatPassword) {
        alert('As senhas não coincidem. Tente novamente.');
        return;
    } else if (age < 18) {
        alert('Você deve ser maior de 18 anos para criar uma conta.');
        return;
    } else {
        const newUser = {
            usrName,
            age,
            password,
            balance: 0
        };

        users.push(newUser);
        alert('Conta criada com sucesso!');
        newAccountSection.classList.remove('active');
        formularySection.classList.add('active');
    }});

    document.getElementById('confirmWithdraw').addEventListener('click', () => {
        const amount = Number(document.getElementById('amount').value);
        if (amount <= 0) {
            alert('Por favor, insira um valor válido para saque.');
            return;
        } else if (amount > currentUser.balance) {
            alert('Saldo insuficiente para saque.');
            return;
        } else {
            currentUser.balance -= amount;
            withdrawSection.classList.remove('active');
            successWithdraw.classList.add('active');
        }
    });

    document.getElementById('confirmDeposit').addEventListener('click', () => {
        const amount = Number(document.getElementById('amountDeposit').value);
        if (amount <= 0) {
            alert('Por favor, insira um valor válido para depósito.');
            return;
        } else {
            currentUser.balance += amount;
            depositSection.classList.remove('active');
            successDeposit.classList.add('active');
        }
    });

    document.getElementById('confirmTransfer').addEventListener('click', () => {
        const recipientName = document.getElementById('recipient').value;
        const amount = Number(document.getElementById('amountTransfer').value);

        const recipient = users.find(u => u.usrName === recipientName);

        if (!recipient) {
            alert('Usuário destinatário não encontrado.');
            return;
        } else if (amount <= 0) {
            alert('Por favor, insira um valor válido para transferência.');
            return;
        }   else if (amount > currentUser.balance) {
            alert('Saldo insuficiente para transferência.');
            return;
        } else {
            currentUser.balance -= amount;
            recipient.balance += amount;
            transferSection.classList.remove('active');
            successTransfer.classList.add('active');
        }});

    function goHome() {
    successWithdraw.classList.remove('active');
    successDeposit.classList.remove('active');
    successTransfer.classList.remove('active');
    balanceSection.classList.remove('active');
    withdrawSection.classList.remove('active');
    depositSection.classList.remove('active');
    transferSection.classList.remove('active');

    actionSection.classList.add('active');
}