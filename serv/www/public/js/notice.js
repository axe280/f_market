export default class Notice {
  constructor(name) {
    this.elem = document.createElement('div');
    this.elem.className = 'notice';
    
    if (name === 'success') {
      this.elem.innerHTML = randomSuccessGeneration();
      this.elem.classList.add('success');
    } else {
      this.elem.textContent = 'error';
      this.elem.classList.add('error');
    }

    document.body.prepend(this.elem);

    function randomSuccessGeneration() {
      const importantPhrase = '<span>Data has been saved!<span>';
      const phrases = [
        `You are awesome! ${importantPhrase}`,
        `"Trust me, you can dance" - Vodka ${importantPhrase}`,
        `"Тяв-тяв, фяв-тяв!" - Зип-зип пуля ${importantPhrase}`,
        `"Ваш інструмент - автомат, а мій - авторучка." - Акула бізнесу ${importantPhrase}`,
        `"Тема! Тема! Ты опоздал, котька уже облызуеться!" - НГ 2020 ${importantPhrase}`,
        `"Фітнес-блогерка та нутриціологіня ділиться лайфхаками, як мінімізувати споживання солодкого!" - The Village ${importantPhrase}`,
        `"Заряженный на мюслях врываешься в рабочий день" - Вика ${importantPhrase}`
      ];

      return randomArrElement(phrases);
    }
  }

  remove() {
    this.elem.remove();
  }
}