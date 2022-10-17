import { defineStore } from "pinia";

export const useStore = defineStore('main', {
    state: () => ({
        name: null,
        score: 0,
        userAnswers: []
    }),
    getters: {
        mockData: (state) => {
            return [{
                    name: state.name,
                    correct: state.score,
                    wrong: state.userAnswers.filter(elem => !elem.isCorrect).length
                },
                {
                    name: "Eric",
                    correct: 3,
                    wrong: 2
                }, {
                    name: "Ana",
                    correct: 4,
                    wrong: 1
                },
                {
                    name: "Max",
                    correct: 2,
                    wrong: 3
                },
                {
                    name: "Vanessa",
                    correct: 1,
                    wrong: 4
                }
            ];
        }
    }
});
