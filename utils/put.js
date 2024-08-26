import { useCategoryStore } from "../store/index";

function updateCaregory() {
  const category = useCategoryStore();
  category.editModal = false; // Modalni yopish
  const formData = new FormData();
  const token = localStorage.getItem("accessToken");
  formData.append(
    "name_en",
    category.name ||
      category.rowItem.find((p) => p.id === category.selectedId).name
  );
  formData.append(
    "name_ru",
    category.title ||
      category.rowItem.find((p) => p.id === category.selectedId).title
  );

  // Agar yangi rasm tanlangan bo'lsa, uni formData'ga qo'shing, aks holda eski rasmni oling
  if (category.images) {
    formData.append("images", category.images); // yangi surat
  } else {
    formData.append("image_src", category.oldImage); // eski suratni yuborish
  }

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${category.selectedId}`,
    {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        //   toast.add({
        //     title: "Edited",
        //     icon: "i-heroicons-check-circle",
        //     timeout: 3000,
        //   });
      }
      return response.json();
    })
    .then((data) => {
      // Ma'lumotni yangilash
      const updatedItem = category.rowItem.find(
        (p) => p.id === category.selectedId
      );
      updatedItem.name = data?.data.name_en;
      updatedItem.title = data?.data.name_ru;
      updatedItem.image = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data?.data.image_src}`;

      // Formani tozalash
      category.name = "";
      category.title = "";
      category.images = null;
      category.oldImage = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export { updateCaregory };
