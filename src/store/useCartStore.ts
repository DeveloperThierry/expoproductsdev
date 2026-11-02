import {create} from "zustand"
interface IProduct {
    id:string,
    title:string,
    description:string,
    category:string,
    price:number
  }

  interface ICartItem extends IProduct {
    quantity:number
  }

  interface ICartStore {
    cart:ICartItem[],
    addToCart:(product:IProduct) => void
    removeFromCart:(id:number) => void
    clearCart:() => void
  }
export const useCartStore = create<ICartStore>((set, get) => ({
    cart:[],
    addToCart:(product:IProduct) => {
        const existingItem = get().cart.find((p) => p.id === product.id)
        if(existingItem) {
            set((state) => ({
                cart: state.cart.map((i) => i.id === product.id ? {...i, quantity: i.quantity + 1} : i)
            }))
            return
        }
        set((state) => ({
        
        cart: [...state.cart, {...product, quantity:0}]
    }))},
    removeFromCart:(id:number) => {
        const existingItem = get().cart.find((i) => Number(i.id) === id)
        if(existingItem && existingItem.quantity > 1){
            set((state) => ({
                cart: state.cart.map((i) => Number(i.id) === id ? {...i, quantity: i.quantity -1 } : i)
            }))
            return
        }
        set((state) => ({
        cart:state.cart.filter((product) => Number(product.id) !== id)
    }))},
    clearCart:() => set((state) => ({
        cart: []
    }))
}))