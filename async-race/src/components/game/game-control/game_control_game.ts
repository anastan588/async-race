import carsModels from '../cars-models-and-types';
import CreateAndChangeCarGame from '../create-and-change-car-game/create_and_change_car_game';
import { TCreateOneCar, TCars, TWinner } from '../../types';
import CarsBlock from '../../user-interface/cars_block/cars_block';
import CarsBlockGame from '../cars-block-game/cars_block_game';
import MainField from '../../user-interface/main-field/main_field';
import WinnersTableGame from '../winners-table-game/winners_table_game';

class GameControlGame {
    createAndChangeCarGame: CreateAndChangeCarGame;

    carsBlock: CarsBlock;

    carsBlockGame: CarsBlockGame;

    static winnerTableGame: WinnersTableGame;

    carForRaceArray: TCars[];

    static mainField: MainField;

    static winnerId: number;

    static winnerTime: string;

    static arrayWithAnimations: Animation[];

    static winnerObject: TWinner;

    constructor() {
        this.createAndChangeCarGame = new CreateAndChangeCarGame();
        this.carsBlock = new CarsBlock();
        this.carsBlockGame = new CarsBlockGame();
        GameControlGame.winnerTableGame = new WinnersTableGame();
        this.carForRaceArray = [];
        GameControlGame.mainField = new MainField();
        GameControlGame.winnerId = 0;
        GameControlGame.winnerTime = '';
        GameControlGame.arrayWithAnimations = [];
    }

    public addListenerToGenerateButton(): void {
        const generateCarsButton = <HTMLButtonElement>document.querySelector('.generate_cars_button');
        generateCarsButton.addEventListener('click', () => {
            this.generateRandomCar();
            setTimeout(() => {
                this.carsBlockGame.addListenerToSelectButton();
                this.carsBlockGame.addListenerToRemoveButton();
                this.carsBlockGame.addListenerToStartButton();
                this.carsBlockGame.addListenerToStopButton();
            }, 4500);
        });
    }

    public generateRandomCar(): void {
        const modelsOfCars = Object.keys(carsModels);
        const shuffleModelsOfcars = modelsOfCars.sort(() => Math.random() - 0.5);
        const keys = Object.keys(carsModels);
        for (let i = 0; i < shuffleModelsOfcars.length; i += 1) {
            for (let n = 0; n < keys.length; n += 1) {
                if (keys[n] === shuffleModelsOfcars[i]) {
                    const marksOfCar: string[] = carsModels[keys[n]];
                    const carMarksArray: string[] = marksOfCar.sort(() => Math.random() - 0.5);
                    for (let j = 0; j < carMarksArray.length; j += 1) {
                        const nameOfNewCar = `${shuffleModelsOfcars[i]}  ${carMarksArray[j]}`;
                        const colorsDigitsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
                        let colorOfNewCar = '#';
                        for (let k = 0; k < 6; k += 1) {
                            const indexOfDigit = Math.floor(Math.random() * colorsDigitsArray.length);
                            const digitForNewColor = colorsDigitsArray[indexOfDigit];
                            colorOfNewCar += digitForNewColor;
                        }
                        const newCarObject: TCreateOneCar = {
                            name: nameOfNewCar,
                            color: colorOfNewCar,
                        };
                        this.createAndChangeCarGame.sendNewCarToServer(newCarObject);
                    }
                }
            }
        }
    }

    public addListenerToRaceButton(): void {
        const raceButton = <HTMLButtonElement>document.querySelector('.race_button');
        raceButton.addEventListener('click', () => {
            this.receiveCarsFromServerParticipatingInRace();
            raceButton.disabled = true;
        });
    }

    public addListenerToResetButton(): void {
        const resetButton = <HTMLButtonElement>document.querySelector('.reset_button');
        const raceButton = <HTMLButtonElement>document.querySelector('.race_button');
        resetButton.addEventListener('click', () => {
            resetButton.disabled = true;
            raceButton.disabled = false;
            this.receivePremissionToStopRace();
        });
    }

    public async receivePremissionToStopRace() {
        Promise.all(
            this.carForRaceArray.map((element) => {
                return this.carsBlockGame.receivePermissionToStopCar(element.id, 'stopped');
            })
        ).then(() => this.carsBlockGame.controller.abort());
    }

    public async receiveCarsFromServerParticipatingInRace() {
        const urlGarage: URL = new URL('http://127.0.0.1:3000/garage');
        urlGarage.searchParams.set('_page', `${CarsBlock.pageNumber}`);
        urlGarage.searchParams.set('_limit', `${this.carsBlock.pageLimit}`);
        const responseGarageCars: TCars[] = await fetch(urlGarage, {
            method: 'GET',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of receiving data');
            }
            return response.json();
        });
        const carsForRace: TCars[] = responseGarageCars;
        this.carForRaceArray = carsForRace;
        const IDArrayForRace: number[] = [];
        for (let i = 0; i < carsForRace.length; i += 1) {
            IDArrayForRace.push(carsForRace[i].id);
        }
        this.startRace(carsForRace, IDArrayForRace);
    }

    public startRace(carsForRace: TCars[], IDArrayForRace: number[]): void {
        this.makeButtonsDisabledWhileRaceInProgress();
        CarsBlockGame.singleRace = 'plural';
        const promisesArray = Promise.all(
            carsForRace.map((element) => {
                return this.carsBlockGame.receivePermissionToStartCar(element.id, 'started');
            })
        );
        let timeForDistance: number[] = [];
        promisesArray.then((result) => {
            timeForDistance = result.map((element) => {
                const { distance } = element;
                const { velocity } = element;
                const timeOfMovingCar = Number(distance) / Number(velocity);
                return timeOfMovingCar;
            });
            this.moveCarsRace(IDArrayForRace, timeForDistance);
        });
    }

    public moveCarsRace(IDArrayForRace: number[], timeForDistance: number[]): void {
        const carContainerImage = <NodeListOf<HTMLImageElement>>document.querySelectorAll('.car_image_container');
        const carImage = <NodeListOf<HTMLImageElement>>document.querySelectorAll('.car_image');
        const ArrayElementsWithAnimation: Animation[] = [];
        for (let i = 0; i < carImage.length; i += 1) {
            const carImageId: number = Number(carImage[i].getAttribute('id'));
            if (carImageId === IDArrayForRace[i]) {
                const wholeLengthOfTrack = carContainerImage[i].clientWidth;
                const lengthEndOfTrack = wholeLengthOfTrack * 0.14;
                const lengthOfTrackForCar = wholeLengthOfTrack - lengthEndOfTrack;
                const elementWithAnimation = carImage[i].animate(
                    [{ transform: 'translateX(0)' }, { transform: `translateX(${lengthOfTrackForCar}px)` }],
                    {
                        duration: timeForDistance[i],
                    }
                );
                elementWithAnimation.id = carImage[i].getAttribute('id') as string;
                carImage[i].style.transform = `translateX(${lengthOfTrackForCar}px)`;
                ArrayElementsWithAnimation.push(elementWithAnimation);
            }
        }
        GameControlGame.arrayWithAnimations = ArrayElementsWithAnimation;
        this.addListenerToEachAnimationOfRace(ArrayElementsWithAnimation);
        for (let i = 0; i < carImage.length; i += 1) {
            this.carsBlockGame.receivePermissionToDriveCar(ArrayElementsWithAnimation[i], IDArrayForRace[i]);
        }
    }

    public addListenerToEachAnimationOfRace(ArrayElementsWithAnimation: Animation[]) {
        ArrayElementsWithAnimation.forEach((element) =>
            element.addEventListener('finish', GameControlGame.receiveWinner)
        );
    }

    static receiveWinner(event: Event) {
        const currentAnimation = event.currentTarget as Animation;
        GameControlGame.winnerId = Number(currentAnimation.id);
        GameControlGame.winnerTime = `${(Number(currentAnimation.currentTime) / 1000).toFixed(2)}s`;
        GameControlGame.openMakeWinWindow(GameControlGame.winnerId);
    }

    public makeButtonsDisabledWhileRaceInProgress(): void {
        const winnersButton = <HTMLButtonElement>document.querySelector('.button_winners');
        const generateCarsButton = <HTMLButtonElement>document.querySelector('.generate_cars_button');
        const nextButtonCars = <HTMLButtonElement>document.querySelector('.next_button_cars');
        const prevButtonCars = <HTMLButtonElement>document.querySelector('.prev_button_cars');
        prevButtonCars.disabled = true;
        nextButtonCars.disabled = true;
        winnersButton.disabled = true;
        generateCarsButton.disabled = true;
        const selectButton = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.select_button');
        selectButton.forEach((element) => {
            const button = element;
            button.disabled = true;
        });
        const removeButton = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.remove_button');
        removeButton.forEach((element) => {
            const button = element;
            button.disabled = true;
        });
        const startButton = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.start_button');
        startButton.forEach((element) => {
            const button = element;
            button.disabled = true;
        });
    }

    static makeButtonsEnabledAfterRaceInProgress(): void {
        const winnersButton = <HTMLButtonElement>document.querySelector('.button_winners');
        const generateCarsButton = <HTMLButtonElement>document.querySelector('.generate_cars_button');
        const nextButtonCars = <HTMLButtonElement>document.querySelector('.next_button_cars');
        const prevButtonCars = <HTMLButtonElement>document.querySelector('.prev_button_cars');
        prevButtonCars.disabled = false;
        nextButtonCars.disabled = false;
        winnersButton.disabled = false;
        generateCarsButton.disabled = false;
        const selectButton = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.select_button');
        selectButton.forEach((element) => {
            const button = element;
            button.disabled = false;
        });
        const removeButton = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.remove_button');
        removeButton.forEach((element) => {
            const button = element;
            button.disabled = false;
        });
        const startButton = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.start_button');
        startButton.forEach((element) => {
            const button = element;
            button.disabled = false;
        });
    }

    static async openMakeWinWindow(winnerId: number) {
        GameControlGame.arrayWithAnimations.forEach((element) =>
            element.removeEventListener('finish', this.receiveWinner)
        );
        const urlGarage: URL = new URL('http://127.0.0.1:3000/garage');
        urlGarage.searchParams.set('id', `${winnerId}`);
        const responseGarageUpdateCar: TCars[] = await fetch(urlGarage, {
            method: 'GET',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of receiving data');
            }
            return response.json();
        });
        const updateCarObject = responseGarageUpdateCar;
        setTimeout(() => {
            this.mainField.makeWinWindow(updateCarObject, this.winnerTime);
            const winnerObject: TWinner = {
                wins: 1,
                time: parseFloat(this.winnerTime),
                id: updateCarObject[0].id,
            };
            GameControlGame.winnerObject = winnerObject;
            this.addListenerToOKWinButton();
        }, 0);
    }

    static addListenerToOKWinButton(): void {
        const OKWinButton = <HTMLDivElement>document.querySelector('.window_win_ok');
        OKWinButton.addEventListener('click', GameControlGame.startToMakeNoteInWinnersTable);
    }

    static startToMakeNoteInWinnersTable(event: Event) {
        const windowWin = <HTMLDivElement>document.querySelector('.window_win');
        const resetButton = <HTMLButtonElement>document.querySelector('.reset_button');
        const { winnerObject } = GameControlGame;
        event.stopPropagation();
        const OKWinButton = <HTMLDivElement>document.querySelector('.window_win_ok');
        OKWinButton.removeEventListener('click', GameControlGame.startToMakeNoteInWinnersTable);
        windowWin.remove();
        resetButton.disabled = false;
        GameControlGame.winnerTableGame.getWinnerFromServer(winnerObject);
        GameControlGame.makeButtonsEnabledAfterRaceInProgress();
    }
}

export default GameControlGame;
