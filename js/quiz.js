export class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQ = 0
        this.score = 0;
        this.amountQ = this.questions.length;

        this.showQ()
        this.nextBtn = document.getElementById("next");
        this.nextBtn.addEventListener("click", this.checkAns.bind(this))
    }

    showQ() {
        let question = this.questions[this.currentQ].question;
        document.getElementById("question").innerHTML = question;
        document.getElementById("current").innerHTML = this.currentQ + 1;
        document.getElementById("totalAmount").innerHTML = this.amountQ;
        this.getAns();
    }

    getAns() {
        let ans = [this.questions[this.currentQ].correct_answer, ...this.questions[this.currentQ].incorrect_answers];
        ans = this.shuffle(ans);
        let temp = ``;
        for (let i = 0; i < ans.length; i++) {
            temp += `
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="answer" id="a${i}" value="${ans[i]}" >
                    ${ans[i]}
                </label>
            </div>
            `
        }
        document.getElementById("rowAnswer").innerHTML = temp;

    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    checkAns() {
        let usrAns = [...document.getElementsByName("answer")].filter(ele => ele.checked);
        if(usrAns.length == 0)
        {
            $(".alert").fadeIn(500)
        }
        else
        {
            $(".alert").fadeOut(100)
            usrAns = usrAns[0].value;
            (this.correctAns(usrAns)) ? $("#Correct").fadeIn(500, () => $("#Correct").fadeOut(500)) : $("#inCorrect").fadeIn(500, () => $("#inCorrect").fadeOut(500));
            this.currentQ++;
            if (this.currentQ < this.amountQ) {
            this.showQ();
            }
            else{
                this.finish();
            }
        }
       
    }

    correctAns(userAns) {
       
            if (userAns == this.questions[this.currentQ].correct_answer) {
                this.score++;
                return true;
            }
            else {
                return false;
            }
        
       
        
    }

    finish()
    {
        $("#quiz").fadeOut(700, function () {
            $("#finish").fadeIn(500);
        });
        document.getElementById("score").innerHTML = this.score;

        let tryAgainBtn = document.getElementById("tryBtn");
        tryAgainBtn.addEventListener("click", this.tryAgain);
    }

    tryAgain()
    {
        $("#finish").fadeOut(500, function () {
            $("#setting").fadeIn(500);
        });
    }
}