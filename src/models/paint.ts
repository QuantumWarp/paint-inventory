export interface Paint {
  id: string;
  pinned: boolean;
  amount: number;

  colorHex: string;
  name: string;
  brand: string;
  type: string;
  tags: string[];
  notes: string;
}
