<template>
  <div class="row justify-content-center">
    <div class="col-6 col-md-4 col-lg-3 col-xl-2 text-center">
      <Welcome/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue";

export default {
  name: "Home",
  components: {
    Welcome,
  },
};
</script>
