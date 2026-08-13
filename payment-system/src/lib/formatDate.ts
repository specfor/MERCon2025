function parseLocal(input: string | Date | null | undefined): Date {
  if (!input) return new Date(NaN);
  if (input instanceof Date) {
    return new Date(
      input.getUTCFullYear(),
      input.getUTCMonth(),
      input.getUTCDate(),
      input.getUTCHours(),
      input.getUTCMinutes(),
      input.getUTCSeconds()
    );
  }
  const str = String(input).trim();
  const m = str.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})/);
  if (m) {
    const [, y, mo, d, h, mi, s] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s));
  }
  const dateOnlyMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnlyMatch) {
    const [, y, mo, d] = dateOnlyMatch;
    return new Date(Number(y), Number(mo) - 1, Number(d));
  }
  return new Date(input);
}

export function formatLocalTime(input: string | Date | null | undefined): string {
  if (!input) return "—";

  try {
    const d = parseLocal(input);
    if (isNaN(d.getTime())) return "Invalid Date";

    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(d);
  } catch {
    return String(input);
  }
}

export function formatLocalDateOnly(input: string | Date | null | undefined): string {
  if (!input) return "—";

  try {
    const d = parseLocal(input);
    if (isNaN(d.getTime())) return "Invalid Date";

    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  } catch {
    return String(input);
  }
}
