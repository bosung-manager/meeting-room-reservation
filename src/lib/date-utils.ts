export function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getEndOfWeek(date: Date): Date {
  const start = getStartOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

export function formatDateRange(date: Date): string {
  const start = getStartOfWeek(date);
  const end = getEndOfWeek(date);
  
  const startStr = start.toLocaleDateString("ko-KR", { month: 'long', day: 'numeric' });
  const endStr = end.toLocaleDateString("ko-KR", { month: 'long', day: 'numeric' });
  const year = start.getFullYear();
  
  return `${year}년 ${startStr} ~ ${endStr}`;
}

export function getDaysInWeek(date: Date): Date[] {
  const start = getStartOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}
