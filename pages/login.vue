<script setup>
import { useRouter } from "vue-router";

definePageMeta({
  layout: "custom",
});

const router = useRouter();
const toast = useToast();

const state = reactive({
  phone: undefined,
  password: undefined,
});

function onSubmit() {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", {
    method: "POST",
    body: JSON.stringify({
      phone_number: state.phone,
      password: state.password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((item) => {
      if (item?.success) {
        localStorage.setItem(
          "accessToken",
          item?.data?.tokens?.accessToken?.token
        );

        router.push("/");

        toast.add({
          title: item.message,
          icon: "i-heroicons-check-circle",
          timeout: 3000,
        });
      } else {
        toast.add({
          title: item.message,
          icon: "ph:warning-circle",
          timeout: 3000,
          color: "red",
        });
      }
      state.password = undefined;
      state.phone = undefined;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}
</script>

<template>
  <!-- <div class="w-full h-screen flex justify-center items-center"> -->
  <div class="p-8 border-2 border-primary">
    <UForm :state="state" class="space-y-4" @submit.prevent="onSubmit()">
      <UFormGroup label="Phone" name="phone">
        <UInput v-model="state.phone" type="text" required minlength="3" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="text" required minlength="3" />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </div>
  <!-- </div> -->
</template>
