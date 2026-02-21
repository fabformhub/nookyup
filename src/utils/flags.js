export function getFlagEmoji(countrySlug) {
  const map = {
    uk: "🇬🇧",
    ie: "🇮🇪",
    us: "🇺🇸",
    ca: "🇨🇦",
    au: "🇦🇺",
    nz: "🇳🇿"
  };

  return map[countrySlug] || "🏳️";
}

