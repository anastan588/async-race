import './winners_table.scss';

class WinnersTable {
    public winnersTable: HTMLDivElement;

    public winnersItem: HTMLDivElement;

    public tableTitleNumber: HTMLDivElement;

    public tableTitleCar: HTMLDivElement;

    public tableTitleName: HTMLDivElement;

    public tableTitleWins: HTMLDivElement;

    public tableTitleTime: HTMLDivElement;

    public winnersTableContainer: HTMLDivElement;

    constructor() {
        this.winnersTable = document.createElement('div');
        this.winnersItem = document.createElement('div');
        this.tableTitleNumber = document.createElement('div');
        this.tableTitleCar = document.createElement('div');
        this.tableTitleName = document.createElement('div');
        this.tableTitleWins = document.createElement('div');
        this.tableTitleTime = document.createElement('div');
        this.winnersTableContainer = document.createElement('div');
    }

    public makeWinnersTable(): void {
        this.winnersTable.classList.add('winners_table');
        this.winnersItem.classList.add('winners_item');
        this.winnersItem.classList.add('winners_table_title');
        this.tableTitleNumber.classList.add('title_number');
        this.tableTitleNumber.classList.add('item_part');
        this.tableTitleNumber.innerHTML = '№';
        this.winnersItem.append(this.tableTitleNumber);
        this.tableTitleCar.classList.add('title_car');
        this.tableTitleCar.classList.add('item_part');
        this.tableTitleCar.innerHTML = 'Snail';
        this.winnersItem.append(this.tableTitleCar);
        this.tableTitleName.classList.add('title_name');
        this.tableTitleName.classList.add('item_part');
        this.tableTitleName.innerHTML = 'Name';
        this.winnersItem.append(this.tableTitleName);
        this.tableTitleWins.classList.add('title_wins');
        this.tableTitleWins.classList.add('item_part');
        this.tableTitleWins.innerHTML = 'Wins';
        this.winnersItem.append(this.tableTitleWins);
        this.tableTitleTime.classList.add('title_time');
        this.tableTitleTime.classList.add('item_part');
        this.tableTitleTime.innerHTML = 'Best time(s)';
        this.winnersItem.append(this.tableTitleTime);
        this.winnersTable.append(this.winnersItem);
        this.winnersTableContainer.classList.add('winners_table_container');
        this.winnersTable.append(this.winnersTableContainer);
    }
}

export default WinnersTable;
