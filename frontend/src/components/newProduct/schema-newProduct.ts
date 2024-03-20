import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useNewProductSchema = () => {
  const schema = z.object({
    codigo: z
      .string()
      .min(6, { message: "Por gentileza insira um código de pelo 6 digitos" }),
    descricao: z
      .string()
      .min(1, { message: "Por gentileza insira uma descrição" }),
    preco: z.string().min(1, { message: "Por gentileza insira um valor" }),
  });

  type formDataProps = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<formDataProps>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      codigo: "",
      descricao: "",
      preco: "",
    },
  });

  return { handleSubmit, register, errors, schema, reset };
};
