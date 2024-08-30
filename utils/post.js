import {
  useCategoryStore,
  useBrandsStore,
  useModelsStore,
  useCitiesStore,
  useCarsStore,
} from "../store/index";

// --------------------------------------- CATEGORY -----------------------------------------
function createCategory() {
  const category = useCategoryStore();
  category.openModal = false;
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
  brands.openModal = false; // Modalni yopish
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
  models.openModal = false;
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
        // toast.add({
        //   title: response.statusText,
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
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
  cities.openModal = false; // Modalni yopish
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

// --------------------------------------- CARS -----------------------------------------
function createCars() {
  const cars = useCarsStore();
  cars.openModal = false;
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("category_id", cars.category_id);
  formData.append("brand_id", cars.brand_id);
  formData.append("model_id", cars.model_id);
  formData.append("location_id", cars.location_id);
  formData.append("city_id", cars.city_id);
  formData.append("color", cars.color);
  formData.append("year", cars.year);
  formData.append("seconds", cars.seconds);
  formData.append("max_speed", cars.max_speed);
  formData.append("max_people", cars.max_people);
  formData.append("transmission", cars.transmission);
  formData.append("motor", cars.motor);
  formData.append("drive_side", cars.drive_side);
  formData.append("petrol", cars.petrol);
  formData.append("limitperday", cars.limitperday);
  formData.append("deposit", cars.deposit);
  formData.append("premium_protection", cars.premium_protection);
  formData.append("price_in_aed", cars.price_in_aed);
  formData.append("price_in_usd", cars.price_in_usd);
  formData.append("price_in_aed_sale", cars.price_in_aed_sale);
  formData.append("price_in_usd_sale", cars.price_in_usd_sale);
  formData.append("inclusive", cars.inclusive);

  if (cars.images) {
    formData.append("images", cars.images);
  }
  if (cars.imagesMain) {
    formData.append("imagesMain", cars.imagesMain);
  }
  if (cars.cover) {
    formData.append("cover", cars.cover);
  }

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((item) => {
      console.log(item);

      // Safeguard against missing properties
      cars.rowItem.push({
        id: item.data.id,
        brand: cars.brands.find((b) => b.id === item.data.brand_id)?.title,
        category: cars.category.find((b) => b.id === item.data.category_id)
          ?.name,
        city: cars.cities.find((b) => b.id === item.data.city_id)?.name,
        model: cars.models.find((b) => b.id === item.data.model_id)?.name,
        location: cars.locations.find((b) => b.id === item.data.location_id)
          ?.name,
        color: item.data.color,
        car_images: item.data.car_images,
        deposit: item.data.deposit,
        drive_side: item.data.drive_side,
        limitperday: item.data.limitperday,
        max_people: item.data.max_people,
        max_speed: item.data.max_speed,
        motor: item.data.motor,
        petrol: item.data.petrol,
        premium_protection: item.data.premium_protection,
        price_in_aed: item.data.price_in_aed,
        price_in_aed_sale: item.data.price_in_aed_sale,
        price_in_usd: item.data.price_in_usd,
        price_in_usd_sale: item.data.price_in_usd_sale,
        seconds: item.data.seconds,
        three_days_price: item.data.three_days_price,
        transmission: item.data.transmission,
        two_days_price: item.data.two_days_price,
        year: item.data.year,
        image: item.data.image_src
          ? `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.data.image_src}`
          : "default-image.jpg", // Fallback image
      });

      // Clear form values
      // cars.clearForm(); // Assuming you have a clearForm method
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// --------------------------------------- CARS END -----------------------------------------

export { createCategory, createBrands, createModel, createCities, createCars };
