import CarsBlock from '../../user-interface/cars_block/cars_block';
import CreateAndChangeCarGame from '../create-and-change-car-game/create_and_change_car_game';
import CarsBlockGame from '../cars-block-game/cars_block_game';

class CommonContainerCarsgame {
    public createAndChangeCarGame: CreateAndChangeCarGame;

    public carsBlock: CarsBlock;

    public carsBlockGame: CarsBlockGame;

    constructor() {
        this.carsBlock = new CarsBlock();
        this.createAndChangeCarGame = new CreateAndChangeCarGame();
        this.carsBlockGame = new CarsBlockGame();
    }

    public addListenerToNextButton(): void {
        const nextButtonCars = <HTMLButtonElement>document.querySelector('.next_button_cars');
        nextButtonCars.addEventListener('click', (event) => {
            event.preventDefault();
            CarsBlock.pageNumber += 1;
            const carsBlock = <HTMLDivElement>document.querySelector('.cars_block');
            carsBlock.innerHTML = '';
            this.carsBlock.receiveCarsFromServer();
            setTimeout(() => {
                this.carsBlockGame.addListenerToSelectButton();
                this.carsBlockGame.addListenerToRemoveButton();
                this.carsBlockGame.addListenerToStartButton();
                this.carsBlockGame.addListenerToStopButton();
            }, 1000);
            const carsPageTitle = <HTMLDivElement>document.querySelector('.page_number');
            carsPageTitle.innerHTML = `Page #${CarsBlock.pageNumber}`;
            const prevButtonCars = <HTMLButtonElement>document.querySelector('.prev_button_cars');
            if (CarsBlock.pageNumber > 1) {
                prevButtonCars.disabled = false;
            }
            setTimeout(() => {
                if (CarsBlock.pageNumber * 7 >= CarsBlock.numberOfCars) {
                    nextButtonCars.disabled = true;
                }
            }, 100);
        });
    }

    public addListenerToPreviousButton(): void {
        const prevButtonCars = <HTMLButtonElement>document.querySelector('.prev_button_cars');
        prevButtonCars.addEventListener('click', () => {
            CarsBlock.pageNumber -= 1;
            const carsBlock = <HTMLDivElement>document.querySelector('.cars_block');
            carsBlock.innerHTML = '';
            this.carsBlock.receiveCarsFromServer();
            setTimeout(() => {
                this.carsBlockGame.addListenerToSelectButton();
                this.carsBlockGame.addListenerToRemoveButton();
                this.carsBlockGame.addListenerToStartButton();
                this.carsBlockGame.addListenerToStopButton();
            }, 1000);
            const carsPageTitle = <HTMLDivElement>document.querySelector('.page_number');
            carsPageTitle.innerHTML = `Page #${CarsBlock.pageNumber}`;
            const nextButtonCars = <HTMLButtonElement>document.querySelector('.next_button_cars');

            if (CarsBlock.pageNumber === 1) {
                prevButtonCars.disabled = true;
            }
            setTimeout(() => {
                if (CarsBlock.pageNumber * 7 < CarsBlock.numberOfCars || CarsBlock.pageNumber === 1) {
                    nextButtonCars.disabled = false;
                }
            }, 100);
        });
    }
}

export default CommonContainerCarsgame;
