import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <img
        src="/not-found.png"
        alt="Not Found Imagge"
        className="w-[450px] h-[400px] border-2 border-blue-300 rounded-lg object-fill"
      />
      <span className="text-lg text-app-gray-dark font-semibold">
        A página que você tentou acessar não existe
      </span>
      <Button onClick={() => navigate("/")} className="w-[400px]">
        Ir para o início
      </Button>
    </div>
  );
}
