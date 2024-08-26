import { useCategoryStore, useBrandsStore,useModelsStore } from "../store/index";

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
        // toast.add({
        //   title: "Deleted",
        //   icon: "material-symbols:delete-outline",
        //   timeout: 2000,
        //   color: "red",
        // });
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

function deleteBrands(row) {
  const brands = useBrandsStore();
  const token = localStorage.getItem("accessToken");

  fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${row.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        // toast.add({
        //   title: "Deleted",
        //   icon: "material-symbols:delete-outline",
        //   timeout: 2000,
        //   color: "red",
        // });

        brands.rowItem = brands.rowItem.filter((p) => p.id !== row.id);
      } else {
        console.error("Serverdan o‘chirishda xatolik:", response.status);
      }
    })
    .catch((error) => {
      console.error("DELETE so‘rovi bajarilmadi:", error);
    });
}

function deleteModels(row) {
  const models = useModelsStore();
  const token = localStorage.getItem("accessToken");
  fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${row.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        // toast.add({
        //   title: "Deleted",
        //   icon: "material-symbols:delete-outline",
        //   timeout: 2000,
        //   color: "red",
        // });

        // Agar serverdan muvaffaqiyatli o‘chirilgan bo‘lsa
        models.rowItem = models.rowItem.filter((p) => p.id !== row.id);
      } else {
        // toast.add({
        //   title: response.statusText,
        //   icon: "carbon:close-filled",
        //   timeout: 2000,
        //   color: "red",
        // });
      }
    })
    .catch((error) => {
      console.error("DELETE so‘rovi bajarilmadi:", error);
    });
}

export { deleteCategory, deleteBrands, deleteModels };
