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

    setgray(id: number) {
        let divek: HTMLElement | null = document.getElementById(`weapon${id}`)
        let cover = document.createElement("div")
        cover.classList.add("notPicked")
        divek?.appendChild(cover)
    }

    removeGray(id: number) {
        let divek: HTMLElement | null = document.getElementById(`weapon${id}`)
        for (let i = 1; i < divek!.childNodes.length; i++) {
            divek!.childNodes[i].remove()
        }
    }

    setActive(id: number) {
        let divek: HTMLElement | null = document.getElementById(`weapon${id}`)
        let border = document.createElement("div")
        border.classList.add("isActive")
        divek?.appendChild(border)
    }

    removeActive(id: number) {
        let divek: HTMLElement | null = document.getElementById(`weapon${id}`)
        for (let i = 1; i < divek!.childNodes.length; i++) {
            divek!.childNodes[i].remove()
        }
    }

    displayText(text: string) {
        let divToChange = document.getElementById("big-text")
        divToChange!.innerText = text
        divToChange!.style.display = "flex"
    }

    hideText() {
        let divToChange = document.getElementById("big-text")
        divToChange!.style.display = "none"
    }

}

