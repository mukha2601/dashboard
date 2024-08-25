<template>
  <div class="w-1/4 bg-[#191A19] p-4 flex flex-col justify-center rounded-md">
    <UVerticalNavigation :links="links">
      <template #default="{ link }">
        <span class="group-hover:text-primary relative ms-2 p-4">{{
          link.label
        }}</span>
      </template>
    </UVerticalNavigation>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const links = [
  // {
  //   label: "Dashboard",
  //   icon: "material-symbols:home",
  //   to: "/",
  // },
  {
    label: "Settings",
    icon: "material-symbols:settings",
    // to: `${
    //   route.path.startsWith("/dev") ? "/dev" : ""
    // }/components/vertical-navigation`,
    to: "/",
  },
  {
    label: "Brands",
    icon: "material-symbols:car-tag",
    to: "/brands",
  },
  {
    label: "Models",
    icon: "material-symbols:transportation",
    to: "/models",
  },
  // {
  //   label: "Locations",
  //   icon: "material-symbols:location-on",
  //   to: "/locations",
  // },
  {
    label: "Cities",
    icon: "material-symbols:emoji-transportation",
    to: "/cities",
  },
  {
    label: "Cars",
    icon: "material-symbols:local-taxi",
    to: "/cars",
  },
];
</script>
