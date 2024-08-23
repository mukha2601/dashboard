<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="w-full flex flex-col h-screen">
      <Header />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

onMounted(() => {
  const token = localStorage.getItem("accessToken");
  const lastPage = localStorage.getItem("lastPage");
  if (lastPage && route.fullPath !== lastPage) {
    router.push(lastPage);
  }

  if (token?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
    // Agar token mavjud bo'lsa, home sahifada qoladi yoki boshqa sahifaga yo'naltiradi
    // router.push("/");
    localStorage.setItem('lastPage', newPath);
  } else {
    // Agar token mavjud bo'lmasa, login sahifasiga yo'naltiradi
    router.push("/login");
  }
});
</script>
