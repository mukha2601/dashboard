import {
  useCategoryStore,
  useBrandsStore,
  useModelsStore,
  useCitiesStore,
} from "../store/index";

// --------------------------------------- CATEGORY -----------------------------------------
function createCategory() {
  const category = useCategoryStore();
  // Modalni yopish
  category.addModal = false;

  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("name_en", category.name);
  formData.append("name_ru", category.title);

  if (category.images) {
    formData.append("images", category.images);
  }

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        // toast.add({
        //   title: response.statusText,
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
      }
      return response.json();
    })
    .then((data) => {
      // Yangi kategoriya qo'shilgandan keyin ma'lumotlar yangilanadi\

      category.rowItem.push({
        id: data.data.id,
        name: data.data.name_en,
        title: data.data.name_ru,
        image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data.data.image_src}`,
      });

      // Formani tozalash

      category.name = "";
      category.title = "";
      category.images = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// --------------------------------------- CATEGORY END -----------------------------------------

// --------------------------------------- BRANDS END -----------------------------------------
function createBrands() {
  const brands = useBrandsStore();
  brands.addModal = false; // Modalni yopish
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("title", brands.title);

  if (brands.images) {
    formData.append("images", brands.images);
  }

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        // toast.add({
        //   title: "Brand added",
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
      }
      return response.json();
    })
    .then((data) => {
      // Yangi kategoriya qo'shilgandan keyin ma'lumotlar yangilanadi
      brands.rowItem.push({
        id: data.data.id,
        title: data.data.title,
        image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data.data.image_src}`,
      });

      // Formani tozalash
      brands.title = "";
      brands.images = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// --------------------------------------- BRANDS END -----------------------------------------

// --------------------------------------- MODELS -----------------------------------------
function createModel() {
  const models = useModelsStore();
  models.addModal = false;
  const token = localStorage.getItem("accessToken");

  // const formData = new FormData();
  // formData.append("name", brands.name);
  // formData.append("brand_id", formState.brand_id);

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
    method: "POST",
    // body: formData,
    body: JSON.stringify({
      name: models.name,
      brand_id: models.brand_id,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        toast.add({
          title: response.statusText,
          icon: "i-heroicons-check-circle",
          timeout: 3000,
        });
      }
      return response.json();
    })
    .then((data) => {
      // Yangi modelni jadvalga qo'shish
      models.rowItem.push({
        id: data.data.id,
        name: data.data.name,
        brand: models.brands.find((b) => b.id === data.data.brand_id)?.title,
      });

      // Forma ma'lumotlarini tozalash
      models.name = "";
      models.brand_id = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// --------------------------------------- MODELS END -----------------------------------------

// --------------------------------------- CITIES -----------------------------------------
function createCities() {
  const cities = useCitiesStore();
  cities.addModal = false; // Modalni yopish
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("name", cities.name);
  formData.append("text", cities.text);

  if (cities.images) {
    formData.append("images", cities.images);
  }

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        // toast.add({
        //   title: "City added",
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
      }
      return response.json();
    })
    .then((data) => {
      // Yangi kategoriya qo'shilgandan keyin ma'lumotlar yangilanadi
      cities.rowItem.push({
        id: data.data.id,
        name: data.data.name,
        text: data.data.text,
        image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data.data.image_src}`,
      });

      // Formani tozalash
      cities.name = "";
      cities.text = "";
      cities.images = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// --------------------------------------- CITIES END -----------------------------------------

export { createCategory, createBrands, createModel, createCities };
