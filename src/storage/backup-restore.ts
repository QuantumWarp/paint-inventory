import { Paint } from "../models/paint";
import { getInventory, saveInventory } from "./paint.storage";

export function backup() {
  const inventory = getInventory();
  const backupStr = JSON.stringify(inventory, null, 2);
  const blob = new Blob([backupStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `paint-inventory-backup-${new Date().getTime()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function restore(file: File) {
  if (!file || file.type !== "application/json") return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const json: Paint[] = JSON.parse(e.target?.result as string);
    saveInventory(json);
  };
  reader.readAsText(file);
}
