import './common_container_garage.scss';
import MainField from '../main-field/main_field';
import CreateAndChangeCarField from '../create-and-change-car/create_and_change_car';
import GameControlBlock from '../game_control/game_control';
import CommonContainerCars from '../common_container_cars/common_container_cars';

class CommonContainerGarage extends MainField {
    public commonContainerGarage: HTMLDivElement;

    public createAndChangeCarField: CreateAndChangeCarField;

    public gameControlBlock: GameControlBlock;

    public carsCommonContainer: CommonContainerCars;

    public panginationButtonsBlockWinners: HTMLDivElement;

    public prevButtonWinners: HTMLDivElement;

    public nextButtonWinners: HTMLDivElement;

    constructor() {
        super();
        this.commonContainerGarage = document.createElement('div');
        this.createAndChangeCarField = new CreateAndChangeCarField();
        this.gameControlBlock = new GameControlBlock();
        this.carsCommonContainer = new CommonContainerCars();
        this.panginationButtonsBlockWinners = document.createElement('div');
        this.prevButtonWinners = document.createElement('div');
        this.nextButtonWinners = document.createElement('div');
    }

    public makeCommonContainerGarage(): void {
        this.commonContainerGarage.classList.add('garage_container');
        this.createAndChangeCarField.makeCreateAndChangeCarField();
        this.commonContainerGarage.append(this.createAndChangeCarField.createAndChangeCarContainer);
        this.gameControlBlock.makeGameControlContainer();
        this.commonContainerGarage.append(this.gameControlBlock.gameControlContainer);
        this.carsCommonContainer.makeCommonContainerForCars();
        this.commonContainerGarage.append(this.carsCommonContainer.carsContainer);
    }
}
export default CommonContainerGarage;
