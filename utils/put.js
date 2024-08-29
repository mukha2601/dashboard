import {
  useCategoryStore,
  useBrandsStore,
  useModelsStore,
  useCitiesStore,
} from "../store/index";

function updateCaregory() {
  const category = useCategoryStore();
  category.openModal = false; // Modalni yopish
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

function updateBrands() {
  const brands = useBrandsStore();
  brands.openModal = false; // Modalni yopish
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  formData.append(
    "title",
    brands.title || rowItem.find((p) => p.id === selectedId).title
  );

  // Agar yangi rasm tanlangan bo'lsa, uni formData'ga qo'shing, aks holda eski rasmni oling
  if (brands.images) {
    formData.append("images", brands.images); // yangi surat
  } else {
    formData.append("image_src", brands.oldImage); // eski suratni yuborish
  }

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${brands.selectedId}`,
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
        // toast.add({
        //   title: "Edited",
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
      }
      return response.json();
    })
    .then((data) => {
      // Ma'lumotni yangilash
      const updatedItem = brands.rowItem.find(
        (p) => p.id === brands.selectedId
      );
      updatedItem.title = data?.data.title;
      updatedItem.image = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data?.data.image_src}`;

      // Formani tozalash
      brands.title = "";
      brands.images = null;
      brands.oldImage = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateModels() {
  const models = useModelsStore();
  models.openModal = false;
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  // selectedItem.value = rowItem.value.find((p) => p.id === selectedId.value);
  formData.append("name", models.name || models.selectedItem.name);
  formData.append(
    "brand_id",
    models.brand_id ||
      models.brands.find((b) => b.title === models.selectedItem?.brand)?.id
  );

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/models/${models.selectedId}`,
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
        // toast.add({
        //   title: "Edited",
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
      }
      return response.json();
    })
    .then((data) => {
      const updatedItem = models.rowItem.find(
        (p) => p.id === models.selectedId
      );
      updatedItem.name = data?.data.name;
      updatedItem.brand =
        models.brands.find((b) => b.id === data.data.brand_id)?.title ||
        updatedItem.brand;

      models.name = "";
      models.brand_id = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateCities() {
  const cities = useCitiesStore();
  cities.openModal = false; // Modalni yopish
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  formData.append(
    "name",
    cities.name || cities.value.find((p) => p.id === cities.selectedId).name
  );
  formData.append(
    "text",
    cities.text || cities.value.find((p) => p.id === cities.selectedId).text
  );

  // Agar yangi rasm tanlangan bo'lsa, uni formData'ga qo'shing, aks holda eski rasmni oling
  if (cities.images) {
    formData.append("images", cities.images); // yangi surat
  } else {
    formData.append("image_src", cities.oldImage); // eski suratni yuborish
  }

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${cities.selectedId}`,
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
        // toast.add({
        //   title: "Edited",
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
      }
      return response.json();
    })
    .then((data) => {
      // Ma'lumotni yangilash
      const updatedItem = cities.rowItem.find(
        (p) => p.id === cities.selectedId
      );
      updatedItem.name = data?.data.name;
      updatedItem.text = data?.data.text;
      updatedItem.image = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data?.data.image_src}`;

      // Formani tozalash
      cities.name = "";
      cities.text = "";
      cities.images = null;
      cities.oldImage = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateCars() {
  const cars = useModelsStore();
  cars.openModal = false;
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  // selectedItem.value = rowItem.value.find((p) => p.id === selectedId.value);
  formData.append("name", cars.name || cars.selectedItem.name);
  formData.append(
    "brand_id",
    cars.brand_id ||
      cars.brands.find((b) => b.title === cars.selectedItem?.brand)?.id
  );

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${cars.selectedId}`,
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
        // toast.add({
        //   title: "Edited",
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
      }
      return response.json();
    })
    .then((data) => {
      const updatedItem = cars.rowItem.find(
        (p) => p.id === cars.selectedId
      );
      updatedItem.name = data?.data.name;
      updatedItem.brand =
        cars.brands.find((b) => b.id === data.data.brand_id)?.title ||
        updatedItem.brand;

      cars.name = "";
      cars.brand_id = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export { updateCaregory, updateBrands, updateModels, updateCities, updateCars };
