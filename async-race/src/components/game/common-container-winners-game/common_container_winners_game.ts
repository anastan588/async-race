import WinnersTableGame from '../winners-table-game/winners_table_game';

class CommonContainerWinnersGame {
    public winnersTableGame: WinnersTableGame;

    constructor() {
        this.winnersTableGame = new WinnersTableGame();
    }

    public addListenerToNextButtonWinner(): void {
        const nextButtonWinners = <HTMLButtonElement>document.querySelector('.next_button_winners');
        nextButtonWinners.addEventListener('click', (event) => {
            event.preventDefault();
            WinnersTableGame.pageNumber += 1;
            const winnerTableContainer = <HTMLDivElement>document.querySelector('.winners_table_container');
            winnerTableContainer.innerHTML = '';
            this.winnersTableGame.receiveAllWinnersFromServer('id', 'ASC');
            const winnersPageTitle = <HTMLDivElement>document.querySelector('.page_number_winners');
            winnersPageTitle.innerHTML = `Page #${WinnersTableGame.pageNumber}`;
            const prevButtonWinners = <HTMLButtonElement>document.querySelector('.prev_button_winners');
            if (WinnersTableGame.pageNumber > 1) {
                prevButtonWinners.disabled = false;
            }
            setTimeout(() => {
                if (WinnersTableGame.pageNumber * 10 >= WinnersTableGame.numberOfWinners) {
                    nextButtonWinners.disabled = true;
                }
            }, 100);
        });
    }

    public addListenerToPreviousButtonWinner(): void {
        const previousButtonWinners = <HTMLButtonElement>document.querySelector('.prev_button_winners');
        previousButtonWinners.addEventListener('click', () => {
            WinnersTableGame.pageNumber -= 1;
            const winnerTableContainer = <HTMLDivElement>document.querySelector('.winners_table_container');
            winnerTableContainer.innerHTML = '';
            this.winnersTableGame.receiveAllWinnersFromServer('id', 'ASC');
            const winnersPageTitle = <HTMLDivElement>document.querySelector('.page_number_winners');
            winnersPageTitle.innerHTML = `Page #${WinnersTableGame.pageNumber}`;
            const nextButtonWinners = <HTMLButtonElement>document.querySelector('.next_button_winners');
            if (WinnersTableGame.pageNumber === 1) {
                previousButtonWinners.disabled = true;
            }
            setTimeout(() => {
                if (
                    WinnersTableGame.pageNumber * 10 < WinnersTableGame.numberOfWinners ||
                    WinnersTableGame.pageNumber === 1
                ) {
                    nextButtonWinners.disabled = false;
                }
            }, 100);
        });
    }
}
export default CommonContainerWinnersGame;
