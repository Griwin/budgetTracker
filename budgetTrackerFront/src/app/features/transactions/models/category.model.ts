/**
 * Représente une catégorie renvoyée par l'API.
 */
export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense' | string; // tolérant si tu n'as pas encore d'enum côté back
}
