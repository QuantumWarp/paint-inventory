import { Paint } from "../models/paint";

const inventoryPrefix = "paint-inventory";

export const getInventory = (): Paint[] => {
  const inventory = localStorage.getItem(inventoryPrefix);
  if (!inventory) return [];
  return JSON.parse(inventory);
}

export const saveInventory = (inventory: Paint[]): void => {
  localStorage.setItem(inventoryPrefix, JSON.stringify(inventory));
}
