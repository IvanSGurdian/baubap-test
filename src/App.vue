<template>
  <div class="container-fluid">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  text-align: center;
  place-content: center;
  place-items: center;
  background-color: #2c3e50;
  color: #FFF;
} 
#app {
  width: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
