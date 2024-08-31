export default defineNuxtConfig({
  app: {
    head: {
      title: "DASH",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "dashboard",
          name: "dashboard",
          content:
            "Bu sayt uchun admin panel hisoblanadi va websayt uchun ma'lumotlar shu yerdan qoshiladi",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.ico" }],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxt/image"],
});
