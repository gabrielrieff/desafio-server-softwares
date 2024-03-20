import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { AuthContext } from "../../context/context";

interface ProductsProps {
  id: string;
  codigo: string;
  descricao: string;
  preco: number;
  data_cadastro: string;
}

export function TableListProducts() {
  const { fetchProducts, products, deleteProduct } = useContext(AuthContext);

  const [listProducts] = useState<Array<ProductsProps>>(products!);
  const [details, setDetails] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  //Edit Product
  const [codigo, setCodigo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);

  async function deleteProd(id: string) {
    await deleteProduct(id);
  }

  async function updateProduct(id: string) {
    const data = {
      codigo: codigo,
      descricao: descricao,
      preco: preco,
    };
    await api.patch(`/product/${id}`, data);

    setCodigo("");
    setDescricao("");
    setPreco(0);
    handleEdit(null);

    fetchProducts();
  }

  function handleDetails(id: string | null) {
    setDetails(id);
  }

  function handleEdit(id: string | null) {
    setEditingIndex(id);
  }

  useEffect(() => {
    const product = listProducts?.filter((item) => item.id === editingIndex)[0];

    if (product === undefined) return;

    setCodigo(product.codigo);
    setDescricao(product.descricao);
    setPreco(product.preco);
  }, [editingIndex]);

  return (
    <div className="flex flex-col gap-2 w-2/3 2xl:w-4/5 xl:w-full">
      <h1>Lista de produtos</h1>
      <div className="shadow-lg overflow-hidden rounded-lg border border-zinc-200 max-h-[535px] overflow-y-auto scroll">
        <table className="w-full p-2 lg:text-xs">
          <TableHead />

          <TableBody
            deleteProduct={deleteProd}
            details={details}
            editingIndex={editingIndex}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            products={products}
            updateProduct={updateProduct}
          />
        </table>
      </div>
    </div>
  );
}
