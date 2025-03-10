import { PaintFilter } from "../models/filter";
import { Paint } from "../models/paint";
import { commonTypes } from "../models/types";

export function findBrandOptions(inventory: Paint[]) {
  return inventory
    .map((x) => x.brand)
    .filter((x) => Boolean(x))
    .filter((x, index, arr) => arr.indexOf(x) === index)
    .sort();
}

export function findTypeOptions(inventory: Paint[]) {
  return inventory
    .map((x) => x.type)
    .filter((x) => Boolean(x))
    .concat(Object.keys(commonTypes))
    .filter((x, index, arr) => arr.indexOf(x) === index)
    .sort();
}

export function findTagOptions(inventory: Paint[]) {
  return inventory
    .map((x) => x.tags)
    .reduce((arr, x) => arr.concat(x), [])
    .filter((x) => Boolean(x))
    .filter((x, index, arr) => arr.indexOf(x) === index)
    .sort();
}

export function findNameOptions(inventory: Paint[]) {
  return inventory
    .map((x) => x.name)
    .filter((x) => Boolean(x))
    .filter((x, index, arr) => arr.indexOf(x) === index)
    .sort();
}

export function applyFilter(inventory: Paint[], filter: PaintFilter) {
  const similarHex = inventory.find((x) => x.id === filter.similarId)?.colorHex;

  let filtered = inventory
    .filter((x) => filter.showZeros || x.amount > 0)
    .filter((x, index, arr) => filter.showZeros || arr.findIndex((el) => el.name === x.name) === index)
    .filter((x) => !filter.search
      || x.name.toLowerCase().includes(filter.search.toLowerCase())
      || x.brand.toLowerCase().includes(filter.search.toLowerCase())
      || x.type.toLowerCase().includes(filter.search.toLowerCase())
      || x.tags.find((tag) => tag.toLowerCase().includes(filter.search.toLowerCase()))
    );

  if (similarHex) {
    filtered = filtered.sort((a, b) =>
      calculateColorDistance(similarHex, a.colorHex) -
      calculateColorDistance(similarHex, b.colorHex)
    )
  }

  return filtered;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function calculateColorDistance(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
  );
}
