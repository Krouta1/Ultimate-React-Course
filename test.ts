// Vytáhnu z řádku "Kod", Slovnik.Loc(823805), "string", 1 a vytvořím pole ["Kod", "Slovnik.Loc(823805)", "string", 1]
const lines = [
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
  'new AttributeInfo("Kod", Slovnik.Loc(823805), "string", 1), // Kód',
];

const numArrays = lines.map((line) => {
  const firstParen = line.indexOf("(");
  const lastParen = line.lastIndexOf(")");
  const extracted = line.substring(firstParen + 1, lastParen);

  return extracted.split(",").map((item) => {
    item = item.trim();
    const locMatch = item.match(/Slovnik\.Loc\((\d+)\)/);
    return locMatch ? locMatch[1] : item;
  });
});
