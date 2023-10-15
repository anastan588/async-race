import './game_control.scss';

class GameControlBlock {
    public gameControlContainer: HTMLDivElement;

    public raceButton: HTMLButtonElement;

    public resetButton: HTMLButtonElement;

    public generateCarsButton: HTMLButtonElement;

    constructor() {
        this.gameControlContainer = document.createElement('div');
        this.raceButton = document.createElement('button');
        this.resetButton = document.createElement('button');
        this.generateCarsButton = document.createElement('button');
    }

    public makeGameControlContainer(): void {
        this.gameControlContainer.classList.add('game_control_container');
        this.raceButton.classList.add('race_button');
        this.raceButton.innerHTML = 'Race';
        this.resetButton.classList.add('reset_button');
        this.resetButton.innerHTML = 'Reset';
        this.resetButton.disabled = true;
        this.generateCarsButton.classList.add('generate_cars_button');
        this.generateCarsButton.innerHTML = 'Generate snails';
        this.gameControlContainer.append(this.raceButton);
        this.gameControlContainer.append(this.resetButton);
        this.gameControlContainer.append(this.generateCarsButton);
    }
}

export default GameControlBlock;
