import { create } from 'zustand'

interface MarketStore {
  search: string
  type: string
  region: string
  setSearch: (search: string) => void
  setType: (type: string) => void
  setRegion: (region: string) => void
}

export const useMarketStore = create<MarketStore>(set => ({
  search: '',
  type: '',
  region: '',
  setSearch: search => set({ search }),
  setType: type => set({ type }),
  setRegion: region => set({ region }),
}))
