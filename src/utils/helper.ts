import { PaintFilter } from "../models/filter";
import { Paint } from "../models/paint";
import { commonTypes } from "../models/types";


export function findSearchOptions(inventory: Paint[]) {
  const brandOptions = findBrandOptions(inventory);
  const typeOptions = findTypeOptions(inventory);
  const tagOptions = findTagOptions(inventory);
  const nameOptions = findNameOptions(inventory);

  return brandOptions.concat(typeOptions).concat(tagOptions).concat(nameOptions).sort();
}

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
  return inventory
    .filter((x) => filter.showZeros || x.amount > 0)
    .filter((x, index, arr) => filter.showZeros || arr.findIndex((el) => el.name === x.name) === index)
    .filter((x) => !filter.search
      || x.name.toLowerCase().includes(filter.search.toLowerCase())
      || x.brand.toLowerCase().includes(filter.search.toLowerCase())
      || x.type.toLowerCase().includes(filter.search.toLowerCase())
      || x.tags.find((tag) => tag.toLowerCase().includes(filter.search.toLowerCase()))
    );
}
