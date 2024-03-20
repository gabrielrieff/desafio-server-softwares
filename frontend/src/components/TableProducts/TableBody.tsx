import { useState } from "react";

interface ProductsProps {
  id: string;
  codigo: string;
  descricao: string;
  preco: number;
  data_cadastro: string;
}

interface TableBodyProps {
  details: string | null;
  editingIndex: string | null;
  products: ProductsProps[] | undefined;
  handleEdit: (id: string | null) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string) => void;
  handleDetails: (id: string | null) => void;
}

export function TableBody({
  details,
  editingIndex,
  products,
  handleEdit,
  deleteProduct,
  updateProduct,
  handleDetails,
}: TableBodyProps) {
  const [codigo, setCodigo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);

  return (
    <tbody>
      {products?.map((product, index) => (
        <tr
          className={`border-b ${
            index % 2 === 0 ? "bg-white" : "bg-zinc-100"
          } ${product.id === editingIndex && "bg-yellow-50"}`}
          key={product.id}
        >
          <td className="px-2 py-4 sm:px-1 font-medium text-gray-900 text-left">
            {product.id !== editingIndex ? (
              product.codigo
            ) : (
              <input
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Código"
                className="border border-zinc-200 text-slate-500 px-2 rounded-md w-40"
              />
            )}
          </td>

          <td className="px-2 py-4 sm:px-1 font-medium text-gray-900 text-left">
            {product.id !== editingIndex ? (
              product.descricao
            ) : (
              <input
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição"
                className="border border-zinc-200 text-slate-500 px-2 rounded-md w-full"
              />
            )}
          </td>
          <td className="px-2 py-4 sm:px-1 font-medium text-gray-900 whitespace-nowrap sm:whitespace-normal text-center">
            {product.id !== editingIndex ? (
              product.id !== details ? (
                "--"
              ) : (
                `R$ ${product.preco.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}`
              )
            ) : (
              <>
                R$
                <input
                  value={preco}
                  onChange={(e) => setPreco(e.target.valueAsNumber)}
                  placeholder="R$ 0"
                  className="border border-zinc-200 text-slate-500 px-2 rounded-md w-28"
                />
              </>
            )}
          </td>
          <td className="px-2 py-4 sm:px-1 font-medium text-gray-900 text-right">
            {product.id !== details
              ? "--"
              : new Date(product.data_cadastro).toLocaleDateString()}
          </td>
          <td className="px-2 py-4 font-medium text-sm xl:text-xs text-gray-900 flex justify-end gap-2 md:flex-col">
            {product.id !== editingIndex ? (
              <>
                <button
                  className="px-3 py-1 sm:px-1 rounded-md bg-orange-500 hover:bg-orange-800 transition-[.3s] text-white"
                  onClick={() => handleEdit(product.id)}
                >
                  Editar
                </button>
                <button
                  className="px-3 py-1 sm:px-1 rounded-md bg-red-700 hover:bg-red-900 transition-[.3s] text-white"
                  onClick={() => deleteProduct(product.id)}
                >
                  Deletar
                </button>

                <button
                  className="px-3 py-1 sm:px-1 rounded-md bg-slate-900 hover:bg-slate-600 transition-[.3s] text-white"
                  onClick={() =>
                    handleDetails(product.id !== details ? product.id : null)
                  }
                >
                  {product.id !== details
                    ? "Mostrar detalhes"
                    : "Ocultar detalhes"}
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-700 transition-[.3s] text-white"
                  onClick={() => handleEdit(null)}
                >
                  Cancelar
                </button>
                <button
                  className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-800 transition-[.3s] text-white"
                  onClick={() => updateProduct(product.id)}
                >
                  Salvar
                </button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
