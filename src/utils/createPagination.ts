function createpaginationControl() {
  const paginationControl = document.getElementById('pagination-controls') as HTMLDivElement;
  const prevButton = document.getElementById('prevButton') as HTMLButtonElement;
  const nextButton = document.getElementById('nextButton') as HTMLButtonElement;

  if (transactionHistory.length > pageSize) {
    paginationControl.style.display = "block";
  } else {
    paginationControl.style.display = "none";
  }

  // Configura o botão "Anterior"
  prevButton.disabled = currentPage === 0;
  prevButton.onclick = () => {
    currentPage--;
    renderTransactions();
  };

  // Configura o botão "Próxima"
  nextButton.disabled = (currentPage + 1) * pageSize >= transactionHistory.length;
  nextButton.onclick = () => {
    currentPage++;
    renderTransactions();
  };
}
