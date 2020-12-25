<template>
  <div class="nav-bar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Home' }">
        <!-- <router-link :to="{ name: Home }"> -->
          <span class="nav-title">Smoothies</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'AddSmoothie' }">
          <!-- <router-link :to="{ name: "AddSmoothie" }"> -->
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
.nav-title {
  padding-left: 10px !important;
}
</style>
