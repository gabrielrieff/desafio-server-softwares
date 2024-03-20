import { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

interface ProductsProps {
  id: string;
  codigo: string;
  descricao: string;
  preco: number;
  data_cadastro: string;
}

type AuthContextData = {
  products: ProductsProps[] | undefined;
  newProducts: (codigo: string, descricao: string, preco: string) => void;
  fetchProducts: () => void;
  deleteProduct: (id: string) => void;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Array<ProductsProps>>();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await api.get("");
    setProducts(response.data);
  }

  async function newProducts(codigo: string, descricao: string, preco: string) {
    try {
      const regex = /^\d*\.?\d{0,2}$/;
      if (regex.test(preco) || preco === "") {
        await api.post("/product", {
          codigo: codigo,
          descricao: descricao,
          preco: Number(preco),
        });

        const newProd = {
          id: (Math.floor(Math.random() * (20 - 10 + 1)) + 10).toString(),
          codigo: codigo,
          descricao: descricao,
          preco: Number(preco),
          data_cadastro: new Date().toISOString(),
        };

        setProducts((prev) => [...prev!, newProd]);

        toast.success("Produto cadastrado com sucesso");
      }
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }

  async function deleteProduct(id: string) {
    try {
      await api.delete(`/product/${id}`);
      const newListProducts = products?.filter((item) => item.id !== id);
      setProducts(newListProducts);

      toast.success("Produto deletado com sucesso");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }

  return (
    <AuthContext.Provider
      value={{ newProducts, fetchProducts, products, deleteProduct }}
    >
      {children}
    </AuthContext.Provider>
  );
};
