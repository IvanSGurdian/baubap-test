<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-10 col-lg-auto">
      <h3 class="mb-5">Hello {{mainStore.name}}, please answer the following questions.</h3>

      <template v-for="(item, index) in questions" :key="index">
        <keep-alive>
          <template v-if="questionIndex === index">
            <question v-bind="item" @select-answer="onAnswerSelect"></question>
          </template>
        </keep-alive>
      </template>

      <div class="d-flex justify-content-between justify-content-xl-around gap-3 mt-5">
        <button class="btn btn-primary" v-show="questionIndex > 0" @click="questionIndex--">Previous</button>
        <button class="btn btn-primary" v-show="questionIndex < questions.length - 1" @click="questionIndex++">Next</button>
        <button class="btn btn-success" v-show="questionIndex === questions.length - 1" @click="submitAnswers">Submit</button>
      </div>
    </div>
  </div>
</template>
<script>
  import questions from '../assets/data/questions.json';
  import Question from '../components/Question.vue';
  import { useStore } from '../store';

  export default {
    components: {
      Question
    },
    data() {
      return {
        questions: [],
        questionIndex: 0,
        mainStore: useStore()
      }
    },
    methods: {
      onAnswerSelect(questionId, answer) {
        const question = this.questions.find(q => q.id === questionId);
        const storedQuestion = this.mainStore.userAnswers.find(elem => elem.id === questionId);

        if (storedQuestion) {
          storedQuestion.selectedAnswer = answer;
          if (storedQuestion.selectedAnswer === question.answer) {
            storedQuestion.isCorrect = true;
          } else {
            storedQuestion.isCorrect = false;
          }

          this.mainStore.score = this.mainStore.userAnswers.filter(elem => elem.isCorrect).length;
          return;
        }
        this.mainStore.userAnswers.push({id: questionId, selectedAnswer: answer, isCorrect: false});

        if (question.answer === answer) {
          this.mainStore.userAnswers[this.mainStore.userAnswers.length - 1].isCorrect = true;
          this.mainStore.score++;
        }
      },
      submitAnswers() {
        this.$router.push({name: "Results"})
      }
    },
    mounted() {
      // Fisher-Yates algorithm
      const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      }
      this.questions = shuffleArray(questions.data);
    }
  }
</script>