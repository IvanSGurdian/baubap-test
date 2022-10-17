<template>
    <div class="card bg-dark">
        <div class="card-body">
            <h5 class="card-title text-start">{{question}}</h5>
            <ul class="list-unstyled">
                <li v-for="(option, index) in options" :key="index">
                    <div class="row text-start">
                        <div class="col-auto">
                            <input class="form-check-input" type="radio" v-model="selectedAnswer" :id="option+id" :name="option+id" :value="option"/>
                        </div>
                        <div class="col">
                            <label class="ms-2 form-check-label" :for="option+id">{{option}}</label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        id: Number,
        question: String,
        options: Array,
        answer: String
    },
    emits: ['selectAnswer'],
    data() {
        return {
            selectedAnswer: null
        }
    },
    watch: {
        selectedAnswer: {
            handler() {
                this.$emit('selectAnswer', this.id, this.selectedAnswer)
            },
            immediate: true
        }
    }
}
</script>
<style lang="">
    
</style>