import { Quiz } from "./quiz.js";

export class Settings {
    constructor() {
        this.categoryElement = document.getElementById("category");
        this.difficultyElements = document.getElementsByName("difficulty");
        this.numberElement = document.getElementById("number");
        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener("click", this.startPlay.bind(this));
    }

    async startPlay() {
        const category = this.categoryElement.value;
        const difficulty = Array.from(this.difficultyElements).filter(ele => ele.checked)[0].value;
        const amount = this.numberElement.value;
        if (amount > 0) {
            let questions = await this.fetchURL(category, difficulty, amount);
            $("#setting").fadeOut(500, function () {
                $("#quiz").fadeIn(500);
            });
            new Quiz(questions);
        }

    }

    async fetchURL(category, difficulty, amount) {
        let result = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`);
        result = await result.json();
        return result.results;
    }
}