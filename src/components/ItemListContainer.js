import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemCard } from "./ItemCard";
import PlaceholderLoading from 'react-placeholder-loading'
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const ItemListContainer = () => {

  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("Mis Productos");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTitle("Cargando productos...");

    const loadProducts = async () => {
      setLoading(true);
      const productsList = await getFirebaseProducts();
      setProducts(productsList);
      setTitle("Mis Productos");
      setLoading(false);
      
      // const response = await fetch('https://fakestoreapi.com/products')
      // const data = await response.json();
      // setProducts(data);
      // setTitle("Mis Productos");
      // setLoading(false);
      
    }
    
    const loadProductsByCategory = async () => {
      setLoading(true);
      const productsList = await getFirebaseProducts();
      const filteredProducts = productsList.filter(product => product.category === categoryId);
      setProducts(filteredProducts);
      setTitle(categoryId);
      setLoading(false);
      
      
      // const categoriesResponse = await fetch('https://fakestoreapi.com/products/categories')
      // const categoryArr = await categoriesResponse.json();
      // const response = await fetch(`https://fakestoreapi.com/products/category/${categoryArr[categoryId]}`)
      // const data = await response.json();
      // setProducts(data);
      // setTitle(categoryArr[categoryId]);
      // setLoading(false);
    }

    categoryId ? loadProductsByCategory() : loadProducts();

  }, [categoryId])
  
  const getFirebaseProducts = async ( ) => { 
    const db = getFirestore();
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    console.log(productsSnapshot);
    const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(productsList);
    return productsList;
   }

  // SCRIPT PARA AGREGAR PRODUCTOS A FIREBASE
  // useEffect(() => {
  //   pushProducts();
  // }, [])

  // const pushProducts = async () => {
  //   const response = await fetch('/products.json')
  //   const data = await response.json();
  //   console.table(data);

  //   const db = getFirestore();
  //   const productsCollection = collection(db, 'products');

  //   data.forEach(product => {
  //     addDoc(productsCollection, product).then((docRef) => {
  //       console.log("Document written with ID: ", docRef.id);
  //     }
  //     ).catch((error) => {
  //       console.error("Error adding document: ", error);
  //     }
  //     );
  //   });
    
  // }

  return (
    <div>
      {loading ? (
        <div className="flex flex-col w-full bg-gray-100 pb-12 items-center">
          <h1 className="text-center text-4xl font-bold py-20 px-4 bg-primary mb-8 shadow w-full capitalize rounded-b-2xl">{title}</h1>
          <ul className="flex flex-row flex-wrap gap-10 justify-center lg:w-4/5">
            <li className="flex flex-col items-center gap-4 card bg-white p-4 shadow-lg">
              <PlaceholderLoading shape='rect' width='300' height='300' />
              <PlaceholderLoading shape='rect' width='300' height='40' />
              <PlaceholderLoading shape='rect' width='300' height='20' />
            </li>
            <li className="flex flex-col items-center gap-4 card bg-white p-4 shadow-lg">
              <PlaceholderLoading shape='rect' width='300' height='300' />
              <PlaceholderLoading shape='rect' width='300' height='40' />
              <PlaceholderLoading shape='rect' width='300' height='20' />
            </li>
            <li className="flex flex-col items-center gap-4 card bg-white p-4 shadow-lg">
              <PlaceholderLoading shape='rect' width='300' height='300' />
              <PlaceholderLoading shape='rect' width='300' height='40' />
              <PlaceholderLoading shape='rect' width='300' height='20' />
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex flex-col w-full bg-gray-100 pb-12 items-center">
          <h1 className="text-center text-4xl font-bold py-20 px-4 bg-primary mb-8 shadow w-full capitalize rounded-b-2xl"> {title}</h1>
          <ul className="flex flex-row flex-wrap gap-10 justify-center lg:w-4/5 items-center">
            {products.map( product => (<ItemCard key={product.id} {...product} />))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default ItemListContainer