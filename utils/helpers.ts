export function formatDate(date: string | number | Date | null | undefined): string | false {
  if (!date) {
    return false;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('en-US', options);
}

export function formatAmount(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Short labels for chart Y-axes (avoids repeating ".00" and keeps ticks readable).
 * Tooltips should still use {@link formatAmount} with currency.
 */
export function formatChartAxisTick(value: number): string {
  if (!Number.isFinite(value)) return "";
  const v = value;
  const abs = Math.abs(v);
  if (abs === 0) return "0";
  if (abs >= 1_000_000) {
    const n = v / 1_000_000;
    return `${n >= 10 ? n.toFixed(0) : n.toFixed(1)}M`;
  }
  if (abs >= 100_000) {
    return `${Math.round(v / 1_000)}K`;
  }
  if (abs >= 1_000) {
    const n = v / 1_000;
    return `${n >= 10 ? n.toFixed(0) : n.toFixed(1)}K`;
  }
  if (Number.isInteger(v)) {
    return v.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  return v.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function getMonthName(month: number, locale: string = 'en-US'): string {
  if (month < 0 || month > 11) {
    throw new Error('Month must be between 0 and 11');
  }

  return new Date(1970, month, 1).toLocaleString(locale, {
    month: 'long',
  });
}

type MonthOption = {
  label: string;
  value: string;
};

export function getMonthOptions(locale: string = 'en-US'): MonthOption[] {
  return Array.from({ length: 12 }, (_, month) => ({
    label: new Date(1970, month, 1).toLocaleString(locale, {
      month: 'long',
    }),
    value: `${month}`,
  }));
}

export function trimToLength(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - 3) + '...';
}

export function formatRelativeDateTime(date: Date): string {
  const now = new Date();

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const formatTime = (d: Date) => {
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${ampm}`;
  };

  const time = formatTime(date);

  if (isSameDay(date, now)) {
    return `Today at ${time}`;
  }

  if (isSameDay(date, yesterday)) {
    return `Yesterday at ${time}`;
  }

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `${formattedDate} at ${time}`;
}
