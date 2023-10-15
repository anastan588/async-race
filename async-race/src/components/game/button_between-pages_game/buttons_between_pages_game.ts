class ButtonsBetweenPagesGame {
    public addListenerToGarageButton(): void {
        const buttonGarage = <HTMLButtonElement>document.querySelector('.button_garage');
        buttonGarage.addEventListener('click', (event) => {
            const currentButton = <HTMLButtonElement>event.target;
            this.changePage(currentButton);
        });
    }

    public addListenerToWinnersButton(): void {
        const winnersButton = <HTMLButtonElement>document.querySelector('.button_winners');
        winnersButton.addEventListener('click', (event) => {
            const currentButton = <HTMLButtonElement>event.target;
            this.changePage(currentButton);
        });
    }

    public changePage(currentButton: HTMLButtonElement): void {
        const winnersPage = <HTMLDivElement>document.querySelector('.winners_container');
        const garagePage = <HTMLDivElement>document.querySelector('.garage_container');
        const winnersButton = <HTMLButtonElement>document.querySelector('.button_winners');
        const buttonGarage = <HTMLButtonElement>document.querySelector('.button_garage');
        if (currentButton.classList.contains('button_garage')) {
            winnersPage.classList.add('display_none');
            garagePage.classList.remove('display_none');
            const currentButtonConst = currentButton;
            currentButtonConst.disabled = true;
            winnersButton.disabled = false;
        }
        if (currentButton.classList.contains('button_winners')) {
            winnersPage.classList.remove('display_none');
            garagePage.classList.add('display_none');
            const currentButtonConst = currentButton;
            currentButtonConst.disabled = true;
            buttonGarage.disabled = false;
        }
    }
}

export default ButtonsBetweenPagesGame;
