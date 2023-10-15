import MainField from './user-interface/main-field/main_field';
import ButtonsBetweenPages from './user-interface/buttons-between-pages/button_between_pages';
import CommonContainerGarage from './user-interface/common-container-garage/common_container_garage';
import CommonContainerWinners from './user-interface/common-container-winners/common_container_winner';
import CarsBlock from './user-interface/cars_block/cars_block';
import CreateAndChangeCarGame from './game/create-and-change-car-game/create_and_change_car_game';
import CarsBlockGame from './game/cars-block-game/cars_block_game';
import CommonContainerCarsgame from './game/common_container_cars_game/common_container_cars_game';
import GameControlGame from './game/game-control/game_control_game';
import WinnersTableGame from './game/winners-table-game/winners_table_game';
import ButtonsBetweenPagesGame from './game/button_between-pages_game/buttons_between_pages_game';
import CommonContainerWinnersGame from './game/common-container-winners-game/common_container_winners_game';

class Application {
    public mainField: MainField;

    public buttonsBetweenPages: ButtonsBetweenPages;

    public commonContainerGaragePage: CommonContainerGarage;

    public commonContainerWinnersPage: CommonContainerWinners;

    public carsBlockToFill: CarsBlock;

    public createAndChangecarGame: CreateAndChangeCarGame;

    public carsBlockGame: CarsBlockGame;

    public commonContainerCarsGame: CommonContainerCarsgame;

    public gameControlGame: GameControlGame;

    public winnerTableGame: WinnersTableGame;

    public buttonsBetweenPagesGame: ButtonsBetweenPagesGame;

    public commonContainerWinnersGame: CommonContainerWinnersGame;

    constructor() {
        this.mainField = new MainField();
        this.buttonsBetweenPages = new ButtonsBetweenPages();
        this.commonContainerGaragePage = new CommonContainerGarage();
        this.commonContainerWinnersPage = new CommonContainerWinners();
        this.carsBlockToFill = new CarsBlock();
        this.createAndChangecarGame = new CreateAndChangeCarGame();
        this.carsBlockGame = new CarsBlockGame();
        this.commonContainerCarsGame = new CommonContainerCarsgame();
        this.gameControlGame = new GameControlGame();
        this.winnerTableGame = new WinnersTableGame();
        this.buttonsBetweenPagesGame = new ButtonsBetweenPagesGame();
        this.commonContainerWinnersGame = new CommonContainerWinnersGame();
    }

    public startGame(): void {
        this.mainField.makeMainHtmlField();
        this.buttonsBetweenPages.makeButtonsBetweenPages();
        this.mainField.main.append(this.buttonsBetweenPages.buttonsContainer);
        this.commonContainerGaragePage.makeCommonContainerGarage();
        this.mainField.main.append(this.commonContainerGaragePage.commonContainerGarage);
        this.commonContainerWinnersPage.makeCommonContainerGarage();
        this.mainField.main.append(this.commonContainerWinnersPage.commonContainerWinners);
        this.carsBlockToFill.receiveCarsFromServer();
        this.winnerTableGame.receiveAllWinnersFromServer('id', 'ASC');
    }

    public makeGame(): void {
        setTimeout(() => {
            this.carsBlockGame.addListenerToSelectButton();
            this.carsBlockGame.addListenerToRemoveButton();
            this.carsBlockGame.addListenerToStartButton();
            this.carsBlockGame.addListenerToStopButton();
        }, 2000);
        this.createAndChangecarGame.addListenerToCreateButton();
        this.createAndChangecarGame.addListenerToUpdateButton();
        this.createAndChangecarGame.addListenerToCreateInputName();
        this.commonContainerCarsGame.addListenerToNextButton();
        this.commonContainerCarsGame.addListenerToPreviousButton();
        this.commonContainerWinnersGame.addListenerToNextButtonWinner();
        this.commonContainerWinnersGame.addListenerToPreviousButtonWinner();
        this.gameControlGame.addListenerToGenerateButton();
        this.gameControlGame.addListenerToRaceButton();
        this.gameControlGame.addListenerToResetButton();
        this.buttonsBetweenPagesGame.addListenerToGarageButton();
        this.buttonsBetweenPagesGame.addListenerToWinnersButton();
        this.winnerTableGame.addListenerToWinTableButtonSortByWinsNumber();
        this.winnerTableGame.addListenerToWinTableButtonSortByTime();
    }
}

export default Application;
