import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
const toast = useToast();

// toast funksiyasini komponentda ishlatish
toast.success("Muvaffaqiyatli saqlandi!", {
  icon: "i-heroicons-check-circle",
  timeout: 3000,
});
