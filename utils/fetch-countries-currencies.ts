export const fetchCountries = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,currencies');

  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }

  const data = await res.json();

  return data.map((c: any) => {
    const currencyCode = c.currencies ? Object.keys(c.currencies)[0] : null;

    return {
      name: c.name.common,
      countryCode: c.cca2,
      currencyCode,
      currencyName: currencyCode ? c.currencies[currencyCode].name : null,
      currencySymbol: currencyCode ? c.currencies[currencyCode].symbol : null,
    };
  });
};
