export default class UIController {
    private static instance: UIController;

    hp: HTMLElement | null;
    fireModes: HTMLElement | null;
    points: HTMLElement | null;
    stageNum: HTMLElement | null;

    public static getInstance(): UIController {
        if (!UIController.instance) UIController.instance = new UIController();
        return UIController.instance;
    }

    private constructor() {
        this.hp = document.getElementById("hp")
        this.fireModes = document.getElementById("fireModes")
        this.points = document.getElementById("points")
        this.stageNum = document.getElementById("stageNumber")
    }

    updateHp(newHp: number): void {
        this.hp!.innerText = newHp.toString()
    }

    updateScore(add: number): void {
        let oldScore = +this.points!.innerText
        let newScore = oldScore + add
        console.log(add, oldScore, newScore)
        this.points!.innerText = newScore.toString()
    }
}

