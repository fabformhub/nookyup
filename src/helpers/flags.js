// src/helpers/flags.js

export function getCountryFlag(slug) {
  const flags = {
    ie: "🇮🇪",
    uk: "🇬🇧"
  };

  return flags[slug] || "🏳️";
}

