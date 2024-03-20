import { z } from "zod";
import { useNewProductSchema } from "./schema-newProduct";
import { useContext } from "react";
import { AuthContext } from "../../context/context";

export function NewProduct() {
  const { newProducts } = useContext(AuthContext);

  const { handleSubmit, schema, errors, register, reset } =
    useNewProductSchema();
  type formDataProps = z.infer<typeof schema>;

  async function createProducts(data: formDataProps) {
    const { codigo, descricao, preco } = data;
    await newProducts(codigo, descricao, preco);

    reset();
  }
  return (
    <form
      onSubmit={handleSubmit(createProducts)}
      className="w-2/3 xl:w-full 2xl:w-4/5 p-4l flex flex-col gap-2"
    >
      <h1>Cadastrar novo produto</h1>
      <div className="flex gap-11 w-full lg:flex-col justify-around lg:gap-2 shadow-lg border border-zinc-200 rounded-lg py-7 px-4">
        <label className="w-full flex flex-col gap-2">
          <span>Código</span>
          <input
            {...register("codigo")}
            type="text"
            className="border border-zinc-300 rounded-md px-3 py-1"
          />
          {errors.codigo && (
            <span className="text-red-700 text-xs">
              {errors.codigo.message}
            </span>
          )}
        </label>
        <label className="w-full flex flex-col gap-2">
          <span>Descrição</span>
          <input
            {...register("descricao")}
            type="text"
            className="border border-zinc-300 rounded-md px-3 py-1"
          />
          {errors.descricao && (
            <span className="text-red-700 text-xs">
              {errors.descricao.message}
            </span>
          )}
        </label>
        <label className="w-full flex flex-col gap-2">
          <span>Preço</span>
          <input
            pattern="\d+(\.\d{1,2})?"
            {...register("preco")}
            type="text"
            className="border border-zinc-300 rounded-md px-3 py-1"
          />
          {errors.preco && (
            <span className="text-red-700 text-xs">{errors.preco.message}</span>
          )}
        </label>
        <label className="flex items-end">
          <button
            type="submit"
            className="px-5 py-[2px] rounded-md bg-emerald-500 hover:bg-emerald-800
             transition-[.3s] text-white lg:w-full"
          >
            Salvar
          </button>
        </label>
      </div>
    </form>
  );
}
