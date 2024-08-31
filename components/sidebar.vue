<template>
  <div class="w-1/4 bg-[#191A19] p-4 flex flex-col rounded-md relative">
    <div
      class="logo flex gap-4 items-center justify-start bg-[#292b29] w-full p-2 rounded-md"
    >
      <NuxtLink to="/">
        <NuxtImg src="/logo.png" width="35" />
      </NuxtLink>
      <p>Dashboard</p>
    </div>
    <div class="flex flex-col justify-center h-full">
      <UVerticalNavigation :links="links">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative ms-2 px-6 py-5">{{
            link.label
          }}</span>
        </template>
      </UVerticalNavigation>
    </div>
  </div>
</template>

<script setup>
const links = [
  // {
  //   label: "Dashboard",
  //   icon: "material-symbols:home",
  //   to: "/",
  // },
  {
    label: "Settings",
    icon: "ic:baseline-settings",
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
