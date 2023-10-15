import { TCars } from '../../types';

class MainField {
    public mainContainer: HTMLDivElement;

    public header: HTMLElement;

    public h1: HTMLHeadingElement;

    public main: HTMLElement;

    public footer: HTMLElement;

    public pFooter: HTMLElement;

    public githubImage: HTMLImageElement;

    public rsschoolImage: HTMLImageElement;

    public githubLink: HTMLAnchorElement;

    public rsschoolLink: HTMLAnchorElement;

    public body: HTMLBodyElement;

    public windowForWin: HTMLDivElement;

    public windowForWinTitle: HTMLParagraphElement;

    public windowForWinButtonOK: HTMLDivElement;

    constructor() {
        this.body = <HTMLBodyElement>document.querySelector('body');
        this.mainContainer = document.createElement('div');
        this.header = document.createElement('header');
        this.h1 = document.createElement('h1');
        this.main = document.createElement('main');
        this.footer = document.createElement('footer');
        this.pFooter = document.createElement('p');
        this.githubImage = document.createElement('img');
        this.rsschoolImage = document.createElement('img');
        this.githubLink = document.createElement('a');
        this.rsschoolLink = document.createElement('a');
        this.windowForWin = document.createElement('div');
        this.windowForWinTitle = document.createElement('p');
        this.windowForWinButtonOK = document.createElement('div');
    }

    public makeMainHtmlField(): void {
        this.mainContainer.classList.add('main_container');
        this.header.classList.add('header');
        this.h1.classList.add('title');
        this.h1.innerHTML = 'Async Race';
        this.main.classList.add('main');
        this.footer.classList.add('footer');
        this.pFooter.classList.add('footer_text');
        this.pFooter.innerHTML = '2023';
        this.githubLink.classList.add('github_link');
        this.githubLink.href = 'https://github.com/anastan588';
        this.githubLink.target = 'blank';
        this.githubImage.classList.add('github_image');
        this.githubImage.src = './assets/icons/github.svg';
        this.rsschoolLink.classList.add('rsschool_link');
        this.rsschoolLink.href = 'https://rs.school/js/';
        this.rsschoolLink.target = 'blank';
        this.rsschoolImage.classList.add('rsschool_image');
        this.rsschoolImage.src = './assets/icons/rs_school.svg';
        this.body.append(this.mainContainer);
        this.mainContainer.append(this.header);
        this.mainContainer.append(this.main);
        this.mainContainer.append(this.footer);
        this.header.append(this.h1);
        this.footer.append(this.githubLink);
        this.githubLink.append(this.githubImage);
        this.footer.append(this.pFooter);
        this.footer.append(this.rsschoolLink);
        this.rsschoolLink.append(this.rsschoolImage);
    }

    public makeWinWindow(updateCarObject: TCars[], winnerTime: string): void {
        this.windowForWin.classList.add('window_win');
        this.windowForWinTitle.classList.add('window_win_title');
        this.windowForWinTitle.innerHTML = `Winner is ${updateCarObject[0].name} (${winnerTime})`;
        this.windowForWinButtonOK.classList.add('window_win_ok');
        this.windowForWinButtonOK.innerHTML = `OK`;
        this.windowForWin.append(this.windowForWinTitle);
        this.windowForWin.append(this.windowForWinButtonOK);
        const main = <HTMLDivElement>document.querySelector('.main');
        main.append(this.windowForWin);
    }
}

export default MainField;
