<template>
  <div class="hello">
    <h2>Welcome!</h2>
    <p>Please enter your name</p>
    <input @keyup.enter="startQuiz" class="form-control" type="text" id="name" v-model="name">
    <br>
    <button :disabled="!name" class="btn btn-primary" @click="startQuiz">Start Quiz</button>
  </div>
</template>

<script>
import {useStore} from '../store/index';

export default {
  name: "HelloWorld",
  data() {
    return {
      name: null
    }
  },
  methods: {
    startQuiz() {
      const mainStore = useStore();

      mainStore.name = this.name;
    
      this.$router.push('/quiz');
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
