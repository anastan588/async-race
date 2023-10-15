import { TWinner, TCars } from '../../types';
import carImageSvg from '../../user-interface/car_image/car_image';

class WinnersTableGame {
    static pageNumber: number;

    public limitWinnerForpage: number;

    static numberOfWinners: number;

    static sort: string;

    static order: string;

    public carsWinners: TWinner[];

    public winnerTableItem: number;

    public winnerCarObject: TCars[];

    static globalWinners: TWinner[];

    constructor() {
        WinnersTableGame.pageNumber = 1;
        this.limitWinnerForpage = 10;
        this.carsWinners = [];
        WinnersTableGame.sort = 'id';
        WinnersTableGame.order = 'ASC';
        this.winnerTableItem = 1;
        this.winnerCarObject = [];
    }

    public async getWinnerFromServer(winnerObject: TWinner) {
        const urlWinner: URL = new URL(`http://127.0.0.1:3000/winners/${winnerObject.id}`);
        const winner: TWinner = await fetch(urlWinner, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        console.log('Car is never win');
                    }
                }

                return response.json();
            })
            .catch((error) => {
                if (error.name === 'NOT FOUND') {
                    throw new Error('Car is never win');
                }
            });
        const existingWinner: TWinner = winner;
        if (existingWinner.id === undefined) {
            this.createWinner(winnerObject);
        } else {
            const winnerIbjectTime = winnerObject.time as number;
            const existingWinnerTime = existingWinner.time as number;
            const winnerObjectToNextFuncton = winnerObject;
            if (existingWinnerTime < winnerIbjectTime) {
                winnerObjectToNextFuncton.time = existingWinner.time;
            }
            this.updateWinner(existingWinner, winnerObjectToNextFuncton);
        }
    }

    public async createWinner(winnerObject: TWinner) {
        const urlWinners: URL = new URL('http://127.0.0.1:3000/winners');
        const newWinnerToSend: string = JSON.stringify(winnerObject);
        await fetch(urlWinners, {
            method: 'POST',
            body: newWinnerToSend,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of sending data');
            }
            const { sort } = WinnersTableGame;
            const { order } = WinnersTableGame;
            this.receiveAllWinnersFromServer(sort, order);
        });
    }

    public async removeWinner(winnerID: number) {
        const urlWinnersDelete: URL = new URL(`http://127.0.0.1:3000/winners/${winnerID}`);
        await fetch(urlWinnersDelete, {
            method: 'DELETE',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of sending data');
            }
            const { sort } = WinnersTableGame;
            const { order } = WinnersTableGame;
            const raceButton = <HTMLButtonElement>document.querySelector('.race_button');
            const resetButton = <HTMLButtonElement>document.querySelector('.reset_button');
            raceButton.disabled = false;
            resetButton.disabled = true;
            this.receiveAllWinnersFromServer(sort, order);
        });
    }

    public async updateWinner(existingWinner: TWinner, winnerObject: TWinner) {
        const urlWinners: URL = new URL(`http://127.0.0.1:3000/winners/${existingWinner.id}`);
        const existingWinnerForSend = existingWinner;
        existingWinnerForSend.wins += 1;
        const updateWinnerObject: TWinner = {
            wins: existingWinnerForSend.wins,
            time: winnerObject.time,
        };
        const updateWinnerToSend: string = JSON.stringify(updateWinnerObject);
        await fetch(urlWinners, {
            method: 'PUT',
            body: updateWinnerToSend,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of sending data');
            }
            const { sort } = WinnersTableGame;
            const { order } = WinnersTableGame;
            this.receiveAllWinnersFromServer(sort, order);
        });
    }

    public async receiveAllWinnersFromServer(sort: string, order: string) {
        const urlWinner: URL = new URL(
            `http://127.0.0.1:3000/winners?_page=${WinnersTableGame.pageNumber}&_limit=${this.limitWinnerForpage}&_sort=${sort}&_order=${order}`
        );
        const responseWinnersCars: TWinner[] = await fetch(urlWinner, {
            method: 'GET',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of receiving data');
            }
            WinnersTableGame.numberOfWinners = Number(response.headers.get('X-Total-Count'));
            return response.json();
        });
        this.carsWinners = responseWinnersCars;
        WinnersTableGame.globalWinners = this.carsWinners;
        this.fillTableWinners();
    }

    public fillTableWinners(): void {
        const winnersTitle = <HTMLDivElement>document.querySelector('.winners_amount_in_garage');
        winnersTitle.innerHTML = `Winners (${WinnersTableGame.numberOfWinners})`;
        const TableBlockToFill = <HTMLDivElement>document.querySelector('.winners_table_container');
        TableBlockToFill.innerHTML = '';
        for (let i = 0; i < this.carsWinners.length; i += 1) {
            const winnerCarID = this.carsWinners[i].id as number;
            const winnerCar = this.receiveWinnerCarFromGarageServer(winnerCarID);
            const winnerTableItem = <HTMLDivElement>document.createElement('div');
            winnerTableItem.classList.add('winner_table_item');
            winnerCar.then(() => {
                this.fillTableWinnerItem(winnerTableItem, this.winnerCarObject, i);
                TableBlockToFill.append(winnerTableItem);
                this.winnerCarObject = [];
            });
        }
        this.winnerTableItem = 1;
    }

    public async receiveWinnerCarFromGarageServer(winnerID: number) {
        const urlGarage: URL = new URL('http://127.0.0.1:3000/garage');
        urlGarage.searchParams.set('id', `${winnerID}`);
        const responseGarageUpdateCar: TCars[] = await fetch(urlGarage, {
            method: 'GET',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of receiving data');
            }
            return response.json();
        });
        this.winnerCarObject = responseGarageUpdateCar;
        return this.winnerCarObject;
    }

    public fillTableWinnerItem(winnerTableItem: HTMLDivElement, winnerCar: TCars[], i: number): void {
        const numberTableItem = <HTMLDivElement>document.createElement('div');
        numberTableItem.classList.add('winner_table_item_block');
        numberTableItem.innerHTML = `${this.winnerTableItem}`;
        this.winnerTableItem += 1;
        const carTableItem = <HTMLDivElement>document.createElement('div');
        carTableItem.classList.add('winner_table_item_block');
        carTableItem.classList.add('winner_image');
        carTableItem.innerHTML = carImageSvg(winnerCar[0].color);
        const nameTableItem = <HTMLDivElement>document.createElement('div');
        nameTableItem.classList.add('winner_table_item_block');
        nameTableItem.innerHTML = winnerCar[0].name;
        const winsTableItem = <HTMLDivElement>document.createElement('div');
        winsTableItem.classList.add('winner_table_item_block');
        winsTableItem.innerHTML = `${this.carsWinners[i].wins}`;
        const timeTableItem = <HTMLDivElement>document.createElement('div');
        timeTableItem.classList.add('winner_table_item_block');
        timeTableItem.innerHTML = `${this.carsWinners[i].time}`;
        winnerTableItem.append(numberTableItem);
        winnerTableItem.append(carTableItem);
        winnerTableItem.append(nameTableItem);
        winnerTableItem.append(winsTableItem);
        winnerTableItem.append(timeTableItem);
    }

    public addListenerToWinTableButtonSortByWinsNumber(): void {
        const buttonWinsNumber = <HTMLDivElement>document.querySelector('.title_wins');
        buttonWinsNumber.addEventListener('click', () => {
            WinnersTableGame.sort = 'wins';
            if (WinnersTableGame.order === 'ASC') {
                WinnersTableGame.order = 'DESC';
            } else {
                WinnersTableGame.order = 'ASC';
            }
            this.receiveAllWinnersFromServer(WinnersTableGame.sort, WinnersTableGame.order);
            WinnersTableGame.sort = 'id';
        });
    }

    public addListenerToWinTableButtonSortByTime(): void {
        const buttonBestTime = <HTMLDivElement>document.querySelector('.title_time');
        buttonBestTime.addEventListener('click', () => {
            WinnersTableGame.sort = 'time';
            if (WinnersTableGame.order === 'ASC') {
                WinnersTableGame.order = 'DESC';
            } else {
                WinnersTableGame.order = 'ASC';
            }
            this.receiveAllWinnersFromServer(WinnersTableGame.sort, WinnersTableGame.order);
            WinnersTableGame.sort = 'id';
        });
    }
}

export default WinnersTableGame;
