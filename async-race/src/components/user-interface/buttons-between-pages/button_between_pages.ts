import './buttons_between_pages.scss';
import MainField from '../main-field/main_field';

class ButtonsBetweenPages extends MainField {
    public buttonsContainer: HTMLDivElement;

    public buttonGarage: HTMLButtonElement;

    public buttonWinners: HTMLButtonElement;

    constructor() {
        super();
        this.buttonsContainer = document.createElement('div');
        this.buttonGarage = document.createElement('button');
        this.buttonWinners = document.createElement('button');
    }

    public makeButtonsBetweenPages(): void {
        this.buttonsContainer.classList.add('buttons_container_pages');
        this.buttonGarage.classList.add('button_garage');
        this.buttonGarage.innerHTML = 'Garage';
        this.buttonGarage.disabled = true;
        this.buttonWinners.classList.add('button_winners');
        this.buttonWinners.innerHTML = 'Winners';
        this.buttonsContainer.append(this.buttonGarage);
        this.buttonsContainer.append(this.buttonWinners);
    }
}

export default ButtonsBetweenPages;
