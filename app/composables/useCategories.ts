// The 8 dilekçe categories. Mirrors design/index.html verbatim.
export type CategoryId =
  | 'is' | 'kira' | 'belediye' | 'okul'
  | 'tuketici' | 'izin' | 'itiraz' | 'diger'

export interface Category {
  id: CategoryId
  name: string
  icon: string
}

export const CATEGORIES: readonly Category[] = [
  { id: 'is',        name: 'İş ve İstifa',       icon: 'briefcase' },
  { id: 'kira',      name: 'Kira ve Ev Sahibi',  icon: 'home'      },
  { id: 'belediye',  name: 'Belediye',           icon: 'building'  },
  { id: 'okul',      name: 'Okul ve Üniversite', icon: 'cap'       },
  { id: 'tuketici',  name: 'Tüketici Şikayeti',  icon: 'cart'      },
  { id: 'izin',      name: 'İzin Talebi',        icon: 'calendar'  },
  { id: 'itiraz',    name: 'İtiraz',             icon: 'scale'     },
  { id: 'diger',     name: 'Diğer',              icon: 'dots'      }
] as const

export function catName(id: string | null | undefined): string {
  return CATEGORIES.find(c => c.id === id)?.name ?? 'Diğer'
}
export function catIcon(id: string | null | undefined): string {
  return CATEGORIES.find(c => c.id === id)?.icon ?? 'fileText'
}

export function useCategories() {
  return { CATEGORIES, catName, catIcon }
}
