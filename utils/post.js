// --------------------------------------- CATEGORY -----------------------------------------
function addCategory() {
  // Modalni yopish
  addModal.value = false;

  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("name_en", formState.name);
  formData.append("name_ru", formState.title);

  if (formState.images) {
    formData.append("images", formState.images);
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
        toast.add({
          title: response.statusText,
          icon: "i-heroicons-check-circle",
          timeout: 3000,
        });
      }
      return response.json();
    })
    .then((data) => {
      // Yangi kategoriya qo'shilgandan keyin ma'lumotlar yangilanadi
      people.value.push({
        id: data.data.id,
        name: data.data.name_en,
        title: data.data.name_ru,
        image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data.data.image_src}`,
      });

      // Formani tozalash
      formState.name = "";
      formState.title = "";
      formState.images = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// --------------------------------------- CATEGORY END -----------------------------------------

// --------------------------------------- BRANDS END -----------------------------------------
function addBrands() {
  addModal.value = false; // Modalni yopish
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("title", formState.title);

  if (formState.images) {
    formData.append("images", formState.images);
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
        toast.add({
          title: "Brand added",
          icon: "i-heroicons-check-circle",
          timeout: 3000,
        });
      }
      return response.json();
    })
    .then((data) => {
      // Yangi kategoriya qo'shilgandan keyin ma'lumotlar yangilanadi
      people.value.push({
        id: data.data.id,
        title: data.data.title,
        image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data.data.image_src}`,
      });

      // Formani tozalash
      formState.title = "";
      formState.images = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// --------------------------------------- BRANDS END -----------------------------------------

// --------------------------------------- MODELS -----------------------------------------
function addModel() {
  addModal.value = false;

  const token = localStorage.getItem("accessToken");
  // const formData = new FormData();
  // formData.append("name", formState.name);
  // formData.append("brand_id", formState.brand_id);

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
    method: "POST",
    // body: formData,
    body: JSON.stringify({
      name: formState.name,
      brand_id: formState.brand_id,
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
      rowItem.value.push({
        id: data.data.id,
        name: data.data.name,
        brand: brands.value.find((b) => b.id === data.data.brand_id)?.title,
      });

      // Forma ma'lumotlarini tozalash
      formState.name = "";
      formState.brand_id = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// --------------------------------------- MODELS END -----------------------------------------


// --------------------------------------- CITIES -----------------------------------------
function addCities() {
  addModal.value = false; // Modalni yopish
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("name", formState.name);
  formData.append("text", formState.text);

  if (formState.images) {
    formData.append("images", formState.images);
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
        toast.add({
          title: "City added",
          icon: "i-heroicons-check-circle",
          timeout: 3000,
        });
      }
      return response.json();
    })
    .then((data) => {
      // Yangi kategoriya qo'shilgandan keyin ma'lumotlar yangilanadi
      cities.value.push({
        id: data.data.id,
        name: data.data.name,
        text: data.data.text,
        image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data.data.image_src}`,
      });

      // Formani tozalash
      formState.name = "";
      formState.text = "";
      formState.images = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// --------------------------------------- CITIES END -----------------------------------------
