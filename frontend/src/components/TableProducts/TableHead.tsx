export function TableHead() {
  return (
    <thead className="bg-neutral-200 sticky top-0 z-10">
      <tr>
        <th className="px-2 py-3 text-left">Código</th>
        <th className="px-2 py-3 text-left">Descrição</th>
        <th className="px-2 py-3 text-center">Preço</th>
        <th className="px-2 py-3 text-right">Data de cadastro</th>
        <th className="px-2 py-3"></th>
      </tr>
    </thead>
  );
}
