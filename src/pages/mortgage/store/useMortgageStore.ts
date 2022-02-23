import create from 'zustand'
import { configurePersist } from 'zustand-persist'
import type { IMortgage } from '../model/Mortgage'
import Mortgage from '../model/Mortgage'

interface MortgageState {
  mortgages: IMortgage[]
  mutations: {
    addMortgage: (mortgage: IMortgage) => void
    deleteMortgage: (mortgageId: string) => void
  }
  getters: {
    getMortgages: () => Mortgage[]
    getMortgage: (id: string) => Mortgage | null
  }
}

const { persist } = configurePersist({
  storage: localStorage,
})

const useMortgageStore = create<MortgageState>(
  persist(
    {
      key: 'mortgage',
      denylist: ['mutations', 'getters'],
    },
    (set, get) => ({
      mortgages: [],
      mutations: {
        addMortgage: (mortgage: IMortgage) => {
          set({
            mortgages: [...get().mortgages, mortgage],
          })
        },
        deleteMortgage: (mortgageId: string) => {
          set({
            mortgages: get().mortgages.filter(
              (mortgage) => mortgageId !== mortgage.id,
            ),
          })
        },
      },
      getters: {
        getMortgages: () =>
          get().mortgages.map((mortgage) => new Mortgage(mortgage)),
        getMortgage: (id: string) => {
          const mortgage = get().mortgages.find((m) => m.id === id)
          return mortgage ? new Mortgage(mortgage) : null
        },
      },
    }),
  ),
)

export default useMortgageStore
