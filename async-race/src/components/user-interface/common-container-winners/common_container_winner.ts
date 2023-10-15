import './common_container_winners.scss';
import MainField from '../main-field/main_field';
import WinnersTable from '../winners_table/winners_table';

class CommonContainerWinners extends MainField {
    public commonContainerWinners: HTMLDivElement;

    public winnersAmountTitle: HTMLHeadingElement;

    public winnersPageTitle: HTMLHeadingElement;

    public panginationButtonsBlockWinners: HTMLDivElement;

    public prevButtonWinners: HTMLButtonElement;

    public nextButtonWinners: HTMLButtonElement;

    public winnersTable: WinnersTable;

    constructor() {
        super();
        this.commonContainerWinners = document.createElement('div');
        this.winnersAmountTitle = document.createElement('h1');
        this.winnersPageTitle = document.createElement('h2');
        this.panginationButtonsBlockWinners = document.createElement('div');
        this.prevButtonWinners = document.createElement('button');
        this.nextButtonWinners = document.createElement('button');
        this.winnersTable = new WinnersTable();
    }

    public makeCommonContainerGarage(): void {
        this.commonContainerWinners.classList.add('winners_container');
        this.commonContainerWinners.classList.add('display_none');
        this.winnersAmountTitle.classList.add('winners_amount_in_garage');
        this.winnersAmountTitle.innerHTML = `Winners(0)`;
        this.commonContainerWinners.append(this.winnersAmountTitle);
        this.winnersPageTitle.classList.add('page_number_winners');
        this.winnersPageTitle.innerHTML = `Page #1`;
        this.commonContainerWinners.append(this.winnersPageTitle);
        this.winnersTable.makeWinnersTable();
        this.commonContainerWinners.append(this.winnersTable.winnersTable);
        this.panginationButtonsBlockWinners.classList.add('pangination_buttons_winners');
        this.commonContainerWinners.append(this.panginationButtonsBlockWinners);
        this.prevButtonWinners.classList.add('prev_button_winners');
        this.prevButtonWinners.innerHTML = 'Previous';
        this.prevButtonWinners.disabled = true;
        this.nextButtonWinners.classList.add('next_button_winners');
        this.nextButtonWinners.innerHTML = 'Next';
        this.panginationButtonsBlockWinners.append(this.prevButtonWinners);
        this.panginationButtonsBlockWinners.append(this.nextButtonWinners);
    }
}
export default CommonContainerWinners;
