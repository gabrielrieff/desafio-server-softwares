import { NewProduct } from "./components/newProduct/NewProduct";
import { TableListProducts } from "./components/TableProducts/TableListProducts";

function App() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-start gap-10 p-6 sm:p-2">
      <h1 className="text-5xl font-semibold md:text-3xl">
        Desafio Server Softwares
      </h1>
      <NewProduct />
      <TableListProducts />
    </section>
  );
}

export default App;
