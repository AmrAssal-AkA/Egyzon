    "use client"
    import  React , {createContext , useState , useContext} from 'react'

    const CartContext = createContext();

    export default function CartProvider({children}) {
        const [cartItems ,setCartItem] = useState([]);
        const [isCartopen, setCartopen] = useState(false);

        const openCart = () => setCartopen(true);
        const closeCart = () => setCartopen(false);

        const addtocart = (product, quantity = 1) =>{
            setCartItem(prevItems => {
            const existingItem = prevItems.find(Item => Item.id === product.id );
            if(existingItem){
                return prevItems.map(item => item.id === product.id 
                    ? {...item , quantity : item.quantity + quantity} 
                    : item
                );
            }else {
                return [...prevItems, {...product, quantity}]
            }
            })
        }
        const removeFromCart = (productId) => {
            setCartItem(prevItems => prevItems.filter(item => item.id !== (productId)))
        };

        const clearCart = () => setCartItem([]);

        const value ={ cartItems, addtocart, openCart , closeCart , isCartopen ,removeFromCart , clearCart };

    return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
    )
    }

    export function useCart(){
        const context = useContext(CartContext);
        if(!context){
            throw new Error("useCart must be used within a CartProvider");
        }

        return context;
    }