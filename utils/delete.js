import { useCategoryStore } from "../store/index";

function deleteCategory(row) {
  const category = useCategoryStore();
  const token = localStorage.getItem("accessToken");

  fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${row.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        toast.add({
          title: "Deleted",
          icon: "material-symbols:delete-outline",
          timeout: 2000,
          color: "red",
        });
        // Agar serverdan muvaffaqiyatli o‘chirilgan bo‘lsa

        category.rowItem = category.rowItem.filter((p) => p.id !== row.id);
      } else {
        console.error("Serverdan o‘chirishda xatolik:", response.status);
      }
    })
    .catch((error) => {
      console.error("DELETE so‘rovi bajarilmadi:", error);
    });
}

export { deleteCategory };
