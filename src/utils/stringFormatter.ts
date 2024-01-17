export function formatDDMMYY(date: Date) {
  const date2 = new Date(date);
  const day = date2.getDate();
  const month = date2.getMonth() + 1; // Note: Month starts from 0, so add 1.
  const year = date2.getFullYear();
  const hours = date2.getHours();
  const minutes = date2.getMinutes();

  // Sử dụng padStart để đảm bảo rằng số có 2 chữ số
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${formattedMinutes}`;
}


export function formatCurrencyVietnamese(amount: number): string {
  if (isNaN(amount)) {
    return "Số tiền không hợp lệ";
  }
return Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
